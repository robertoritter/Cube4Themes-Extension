/*
 * Cube4Themes Extension: popup.
 * Lista os temas do Cube4Themes e grava a escolha em storage.local:
 *   { global: 'id' | null, sites: { 'dominio': 'id' | 'off' } }
 * O content script de cada aba escuta o storage e aplica na hora.
 */
import { themes, swatches, applyTheme, findTheme } from './lib/index.js';

const api = globalThis.browser ?? globalThis.chrome;
const $ = id => document.getElementById(id);
const t = (key, sub) => api.i18n.getMessage(key, sub) || key;

/** Preenche os textos marcados com data-i18n no idioma do navegador. */
function localize() {
  document.documentElement.lang = api.i18n.getUILanguage();
  for (const el of document.querySelectorAll('[data-i18n]')) el.textContent = t(el.dataset.i18n);
  for (const el of document.querySelectorAll('[data-i18n-title]')) el.title = t(el.dataset.i18nTitle);
  for (const el of document.querySelectorAll('[data-i18n-aria]')) el.setAttribute('aria-label', t(el.dataset.i18nAria));
}

let host = null;
let cfg = { global: null, sites: {} };
let scope = 'site';

/** Pergunta o domínio ao content script da aba ativa (só o frame principal). */
async function askHost() {
  const [tab] = await api.tabs.query({ active: true, currentWindow: true });
  try {
    const r = await api.tabs.sendMessage(tab.id, { type: 'c4-host' }, { frameId: 0 });
    return r?.host || null;
  } catch {
    return null; // páginas internas do navegador, loja de extensões, aba aberta antes da instalação...
  }
}

function effective() {
  const site = host ? cfg.sites[host] : undefined;
  if (site === 'off') return null;
  return site ?? cfg.global ?? null;
}

/** Tema marcado na lista, conforme o escopo que o usuário está editando. */
function selectedInScope() {
  if (scope === 'global') return cfg.global ?? null;
  const site = cfg.sites[host];
  return site === 'off' ? null : (site ?? null);
}

async function save() {
  await api.storage.local.set({ global: cfg.global ?? null, sites: cfg.sites });
  render();
}

function choose(id) {
  if (scope === 'global') cfg.global = id;
  else if (host) cfg.sites[host] = id ?? 'off';
  save();
}

function item(t) {
  const li = document.createElement('li');
  li.dataset.id = t.id;
  li.title = t.name;
  const sw = document.createElement('span');
  sw.className = 'sw';
  for (const c of swatches(t)) { const s = document.createElement('span'); s.style.background = c; sw.append(s); }
  const name = document.createElement('span');
  name.className = 'name';
  name.textContent = t.name;
  li.append(sw, name);
  li.addEventListener('click', () => choose(t.id));
  return li;
}

function buildLists() {
  for (const t of themes) $(t.kind === 'light' ? 'light' : 'dark').append(item(t));
}

function render() {
  const sel = selectedInScope();
  for (const li of document.querySelectorAll('.list li')) li.classList.toggle('active', li.dataset.id === sel);

  const eff = effective();
  const shown = findTheme(eff ?? cfg.global ?? 'tokyo-night');
  applyTheme(shown);
  document.body.classList.toggle('on-dark', shown.kind === 'dark');

  const siteChoice = host ? cfg.sites[host] : undefined;
  $('inherit').disabled = scope !== 'site' || siteChoice === undefined;
  $('none').disabled = scope === 'site' && !host;

  const name = id => findTheme(id)?.name ?? id;
  let msg;
  if (!host) msg = t('statusUnavailable', cfg.global ? name(cfg.global) : t('none'));
  else if (siteChoice === 'off') msg = t('statusOff');
  else if (siteChoice) msg = t('statusSite', name(siteChoice));
  else msg = cfg.global ? t('statusDefault', name(cfg.global)) : t('statusNone');
  $('status').textContent = msg;
}

async function init() {
  localize();
  buildLists();
  const stored = await api.storage.local.get(['global', 'sites']);
  cfg = { global: stored.global ?? null, sites: stored.sites ?? {} };
  host = await askHost();
  $('host').textContent = host ?? t('browserPage');
  if (!host) {
    scope = 'global';
    document.querySelector('input[value="global"]').checked = true;
    document.querySelector('input[value="site"]').disabled = true;
  }

  for (const r of document.querySelectorAll('input[name="scope"]')) {
    r.addEventListener('change', () => { scope = r.value; render(); });
  }
  $('none').addEventListener('click', () => choose(null));
  $('inherit').addEventListener('click', () => { delete cfg.sites[host]; save(); });

  render();
  document.querySelector('.list li.active')?.scrollIntoView({ block: 'center' });
}

init();
