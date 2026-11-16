/*
 * Cube4Themes Extension: content script.
 * Lê a escolha salva (por site ou global) e marca <html data-c4-theme="...">.
 * As cores vêm de lib/themes.css e a ligação com os elementos da página vem de skin.css,
 * ambos injetados pelo manifest. Sem o atributo, nenhum dos dois tem efeito.
 */
const api = globalThis.browser ?? globalThis.chrome;
const root = document.documentElement;
const host = location.hostname;
let current = null;

/** Tema efetivo deste site: escolha do site, senão a global. 'off' desliga só neste site. */
function pick(cfg) {
  const site = cfg.sites?.[host];
  if (site === 'off') return null;
  return site ?? cfg.global ?? null;
}

function apply(id) {
  const was = current;
  current = id;
  if (id) root.setAttribute('data-c4-theme', id);
  else root.removeAttribute('data-c4-theme');
  if (id && !was) scanAll();
}

async function load() {
  const cfg = await api.storage.local.get(['global', 'sites']);
  apply(pick(cfg));
}

load();

// O popup só grava no storage; aqui a página reage na hora.
api.storage.onChanged.addListener((_changes, area) => { if (area === 'local') load(); });

// Alguns sites (SPAs) reescrevem os atributos do <html>; recoloca o tema se sumir.
new MutationObserver(() => {
  if (current && root.getAttribute('data-c4-theme') !== current) root.setAttribute('data-c4-theme', current);
}).observe(root, { attributes: true, attributeFilter: ['data-c4-theme'] });

/*
 * Elementos fixos ou grudados (position fixed/sticky): cabeçalhos, barras laterais, menus.
 * A pele deixa todo fundo transparente, e nesses elementos o conteúdo apareceria por trás.
 * Quem tinha fundo próprio recebe data-c4-raised e a pele dá a ele o fundo do tema.
 * Quando o elemento fixo é transparente e o fundo está num filho (caso do cabeçalho do YouTube),
 * marca os filhos grandes (30% ou mais da área) que tinham fundo.
 * Para ler o fundo original, o elemento ganha data-c4-probe por um instante (a pele ignora quem
 * tem esse atributo). Tudo acontece na mesma tarefa, então nada pisca na tela.
 */
const SKIP = new Set(['IMG', 'VIDEO', 'CANVAS', 'PICTURE', 'IFRAME', 'SCRIPT', 'STYLE', 'LINK', 'META', 'TEMPLATE', 'BR']);
const skip = el => SKIP.has(el.tagName) || el instanceof SVGElement || el.hasAttribute('data-c4-raised');
const area = el => { const r = el.getBoundingClientRect(); return r.width * r.height; };

function opaqueOriginal(el) {
  el.setAttribute('data-c4-probe', '');
  const bg = getComputedStyle(el).backgroundColor;
  el.removeAttribute('data-c4-probe');
  const m = bg.match(/[\d.]+/g);
  return !!m && (m.length < 4 || Number(m[3]) > 0.5);
}

function check(el) {
  if (skip(el)) return;
  const pos = getComputedStyle(el).position;
  if (pos !== 'fixed' && pos !== 'sticky') return;
  if (opaqueOriginal(el)) { el.setAttribute('data-c4-raised', ''); return; }
  const a = area(el);
  if (!a) return;
  for (const d of el.querySelectorAll('*')) {
    if (!skip(d) && area(d) >= 0.3 * a && opaqueOriginal(d)) d.setAttribute('data-c4-raised', '');
  }
}

function scan(node) {
  if (node.nodeType !== 1 || !current) return;
  check(node);
  for (const el of node.querySelectorAll('*')) check(el);
}

function scanAll() { if (current && document.body) scan(document.body); }

// Nós novos: só eles são verificados, em lote.
let pending = [];
let timer = 0;
new MutationObserver(records => {
  if (!current) return;
  for (const r of records) for (const n of r.addedNodes) if (n.nodeType === 1) pending.push(n);
  if (pending.length && !timer) timer = setTimeout(() => {
    timer = 0;
    const nodes = pending;
    pending = [];
    for (const n of nodes) if (n.isConnected) scan(n);
  }, 300);
}).observe(root, { childList: true, subtree: true });

// Menus e gavetas que já existiam escondidos só ganham tamanho quando abrem: revê após cliques.
let clickTimer = 0;
addEventListener('click', () => {
  clearTimeout(clickTimer);
  clickTimer = setTimeout(scanAll, 400);
}, true);

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scanAll);
else scanAll();
addEventListener('load', scanAll);

// O popup pergunta o domínio da aba por aqui, sem precisar da permissão "tabs".
api.runtime.onMessage.addListener((msg, _sender, reply) => {
  if (msg?.type === 'c4-host') reply({ host, theme: current });
});
