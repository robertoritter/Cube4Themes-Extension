# Cube4Themes: textos para as lojas

Tudo aqui é para copiar e colar nos formulários. Versão: 0.1.0.

Arquivos desta pasta:

| Arquivo | Onde usar |
| --- | --- |
| `cube4themes-chrome-0.1.0.zip` | Chrome Web Store (Chrome, Brave, Opera, Vivaldi) e Edge Add-ons |
| `cube4themes-firefox-0.1.0.zip` | addons.mozilla.org (Firefox) |
| `images/store-icon-128.png` | Ícone da loja (Chrome) |
| `images/screenshot-*.png` | Screenshots, 1280x800, na ordem do número |
| `images/promo-small-440x280.png` | Chrome: "Small promo tile" |
| `images/promo-marquee-1400x560.png` | Chrome: "Marquee promo tile" (opcional) |
| `../PRIVACY.md` | Publicar em `https://cube4code.com/privacy` |

---

## 1. Chrome Web Store

Painel: https://chrome.google.com/webstore/devconsole

### Aba "Store listing"

**Language:** English (padrão). Depois adicione **Portuguese (Brazil)** e cole as versões em português.

**Name:** vem do pacote (`Cube4Themes`).

**Summary:** vem do pacote, em cada idioma.

**Description (English):**

```
Many websites still have no dark mode, and the ones that do rarely match your taste. Cube4Themes applies a full color theme to any website, so pages look the way you want to read them.

It ships 53 themes adapted from popular terminal color schemes, such as Tokyo Night, Nord, Catppuccin and Solarized, in dark and light versions. Each theme maps its palette to the roles a page actually uses: background, text, headings, bold and italic text, links, quotes, code, tables and form fields. Every reading color is adjusted to reach a minimum WCAG contrast over the background, so text stays readable in any theme.

How it works
• Click the toolbar button and pick a theme.
• Apply it to the current site only, or to all sites at once.
• Turn it off on sites that already look good, or go back to your default theme.
• Changes show up instantly, without reloading the page.

Privacy
Cube4Themes does not collect or send any data. Your theme choices are stored locally in your browser. No analytics, no network requests, no remote code.

Open source under the MIT license. The color schemes belong to their original authors; credits and licenses are included in the extension.

Made by Cube4Code: https://cube4code.com
```

**Description (Português):**

```
Muitos sites ainda não têm modo escuro, e os que têm raramente combinam com o seu gosto. O Cube4Themes aplica um tema de cores completo em qualquer site, para você ler as páginas do jeito que prefere.

São 53 temas adaptados de esquemas de cores de terminal conhecidos, como Tokyo Night, Nord, Catppuccin e Solarized, em versões escuras e claras. Cada tema distribui sua paleta pelos papéis que uma página realmente usa: fundo, texto, títulos, negrito e itálico, links, citações, código, tabelas e campos de formulário. Cada cor de leitura é ajustada até atingir um contraste mínimo (WCAG) sobre o fundo, então o texto continua legível em qualquer tema.

Como funciona
• Clique no botão da barra e escolha um tema.
• Aplique só no site atual ou em todos os sites de uma vez.
• Desligue nos sites que já estão bons, ou volte para o seu tema padrão.
• A mudança aparece na hora, sem recarregar a página.

Privacidade
O Cube4Themes não coleta nem envia dados. Suas escolhas de tema ficam guardadas no próprio navegador. Sem análise de uso, sem requisições de rede, sem código remoto.

Código aberto sob a licença MIT. Os esquemas de cores pertencem aos seus autores originais; créditos e licenças vêm junto com a extensão.

Feito por Cube4Code: https://cube4code.com
```

**Category:** a mais próxima de "aparência/interface" que o painel oferecer (por exemplo "Functionality & UI"; "Accessibility" também serve). Confira os nomes na hora, porque o Google muda as categorias de tempos em tempos.

**Store icon:** `images/store-icon-128.png`

**Screenshots:** os cinco `images/screenshot-*.png`, na ordem.

**Small promo tile:** `images/promo-small-440x280.png`. **Marquee:** `images/promo-marquee-1400x560.png`.

**Official URL / Homepage URL:** `https://cube4code.com`

**Support URL:** `https://cube4code.com` (ou a página de issues do repositório, quando ele for público)

### Aba "Privacy practices"

**Single purpose description:**

```
Cube4Themes applies a color theme chosen by the user to the websites they visit, either to one site or to all sites, so pages are easier to read (for example, a dark theme on sites without a dark mode).
```

**Permission justification: storage**

```
Saves the user's theme choice: one theme for all sites and, optionally, a theme per site name. Stored locally with chrome.storage.local; nothing leaves the browser.
```

**Permission justification: host permissions (content script on all URLs)**

```
The theme has to be applied to whatever site the user is reading, so a content script and two style sheets run on all pages. The script only sets a data attribute on the <html> element (the chosen theme) and marks fixed headers so they keep an opaque background. It does not read, store or send page content.
```

**Are you using remote code?** No, I am not using remote code.

**Data usage:** não marque nenhum tipo de dado. A extensão não coleta nada.

Marque as três declarações:
- I do not sell or transfer user data to third parties, outside of the approved use cases.
- I do not use or transfer user data for purposes that are unrelated to my item's single purpose.
- I do not use or transfer user data to determine creditworthiness or for lending purposes.

**Privacy policy URL:** `https://cube4code.com/privacy` (publique o conteúdo de `PRIVACY.md` antes de enviar).

### Antes de enviar

- [ ] Verificação em duas etapas ativa na conta Google.
- [ ] Taxa de 5 dólares paga.
- [ ] Política de privacidade publicada em `cube4code.com/privacy`.
- [ ] (Opcional) Domínio `cube4code.com` verificado no Google Search Console, para aparecer como site verificado.

---

## 2. Firefox (addons.mozilla.org)

Painel: https://addons.mozilla.org/developers/

**Upload:** `cube4themes-firefox-0.1.0.zip`. Escolha **"On this site"** (listada na AMO). Validado com `web-ext lint` 10.8.0: 0 erros, 0 avisos.

**Source code:** responda **No**. O código enviado é o mesmo que foi escrito, sem minificação, bundler nem transpilação. Os arquivos de `lib/` são cópias literais do Cube4Themes.

**Name:** Cube4Themes

**Add-on URL:** `cube4themes`

**Summary (English, até 250 caracteres):**

```
Apply 53 terminal color themes to any website, with guaranteed text contrast. Pick a dark or light theme for one site or for all sites. No data collection, no network requests.
```

**Summary (Português):**

```
Aplica 53 temas de cores de terminal em qualquer site, com contraste de texto garantido. Escolha um tema escuro ou claro para um site ou para todos. Sem coleta de dados, sem requisições de rede.
```

**Description:** use as mesmas descrições da Chrome Web Store (a AMO aceita o texto como está). Para o português, adicione a tradução em "Manage Localizations" ou equivalente.

**Categories:** Appearance (e, se quiser, Accessibility).

**Tags:** dark mode, themes, color, readability, accessibility

**Support website:** `https://cube4code.com`

**License:** MIT License

**Privacy policy:** cole o texto de `PRIVACY.md` (a AMO aceita o texto direto, sem precisar de URL).

**Notes to reviewer:**

```
No build step is needed for review: the submitted files are the source, not minified or bundled. lib/ contains unmodified files from the MIT-licensed Cube4Themes project (https://github.com/robertoritter/Cube4Themes).

How to test: open any website, click the toolbar button and choose a theme. "This site only" applies it to the current site; "All sites" applies it everywhere. "No theme" turns it off.

The content script only toggles a data-c4-theme attribute on <html> and a data-c4-raised attribute on fixed/sticky elements that had their own background. It makes no network requests and stores only the theme choices in storage.local.
```

---

## 3. Edge Add-ons (opcional, gratuito)

Painel: https://partner.microsoft.com/dashboard/microsoftedge/overview

Use o mesmo `cube4themes-chrome-0.1.0.zip` e os mesmos textos e imagens da Chrome Web Store.
