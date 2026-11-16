![Cube4Themes: 53 temas de cores para qualquer site](store/images/promo-marquee-1400x560.png)

# Cube4Themes Extension

Extensão para Chrome, Brave, Edge, Opera, Vivaldi e Firefox que aplica os 53 temas do [Cube4Themes](https://github.com/robertoritter/Cube4Themes) em qualquer site, só no site atual ou em todos. Muitos sites ainda não têm modo escuro; com ela, cada página fica com as cores em que você prefere ler.

English version: [README.md](README.md).

![Página original e a mesma página com um tema do Cube4Themes](store/images/screenshot-2-before-after-1280x800.png)

## Recursos

- 53 temas escuros e claros adaptados de esquemas de cores de terminal conhecidos, com contraste WCAG conferido em cada cor de leitura.
- Escolha um tema só para o site atual ou um tema para todos os sites. Desligue nos sites que já estão bons.
- A mudança aparece na hora, sem recarregar a página.
- Interface em inglês e português do Brasil, seguindo o idioma do navegador.
- Sem coleta de dados: as escolhas ficam guardadas no próprio navegador, sem requisições de rede, análise de uso ou código remoto. Veja [PRIVACY.md](PRIVACY.md).

## Instalar

A extensão ainda não está na Chrome Web Store nem na addons.mozilla.org. Até lá, monte e carregue a partir do código.

```bash
node build.mjs                 # gera build/chrome e build/firefox (Node 18+, sem dependências)
node build.mjs ../Cube4Themes  # opcional: antes atualiza src/lib a partir de um clone do Cube4Themes
```

**Chrome, Brave, Edge, Opera, Vivaldi**

1. Abra `chrome://extensions` (`brave://extensions`, `edge://extensions`...).
2. Ligue o **Modo do desenvolvedor**.
3. Clique em **Carregar sem compactação** e escolha a pasta `build/chrome`.
4. Fixe o botão na barra e abra qualquer site.

**Firefox 140 ou mais novo**

1. Abra `about:debugging#/runtime/this-firefox`.
2. Clique em **Carregar extensão temporária** e escolha `build/firefox/manifest.json`.
3. O Firefox deixa o acesso aos sites desligado em extensões MV3: abra `about:addons`, entre na Cube4Themes, aba **Permissões**, e libere o acesso a todos os sites.
4. A extensão temporária some quando o Firefox fecha.

Depois de alterar o código, recarregue a extensão e a aba.

## Como funciona

- `src/lib/themes.css` (do Cube4Themes) define as variáveis `--c4-*` de cada tema, presas a `<html data-c4-theme="...">`.
- `src/skin.css` liga qualquer elemento da página a essas variáveis: fundo, texto, títulos, negrito, links, código, citações, tabelas e campos de formulário. Imagens, vídeos e SVG não são tocados. A pele fica numa cascade layer (`@layer c4skin`), então os `!important` dela vencem os `!important` do site, independente da especificidade.
- `src/content.js` lê a escolha salva e coloca ou tira o atributo `data-c4-theme`. Sem ele, as folhas de estilo não fazem nada. Ele também marca cabeçalhos fixos e grudados que tinham fundo próprio, para o conteúdo não aparecer por trás deles.
- `src/popup.*` lista os temas com amostras de cor e grava a escolha em `storage.local`.

A única permissão é `storage`. Não há background script, então o mesmo código roda em todos os navegadores; só o manifest do Firefox ganha um ID e a declaração de coleta de dados.

## Limites conhecidos

- Estilos com `!important` escritos direto no atributo `style` do elemento ainda vencem a pele.
- Em sites com layout muito desenhado, cartões e botões feitos com `div` podem perder o contorno.
- Ícones escuros (SVG, fontes de ícone ou `mask-image`) podem sumir num tema escuro.
- Conteúdo dentro de Shadow DOM não é alcançado pelo CSS da página.
- Sites que já são escuros recebem o tema por cima; neles, use "Sem tema" com "Só este site".
- A escolha é lida de forma assíncrona, então a página pode piscar com as cores originais por um instante ao carregar.
- Abas abertas antes de instalar a extensão precisam ser recarregadas.

## Material das lojas

`store/` guarda o material das lojas: screenshots 1280x800, ícone da loja, imagens promocionais e o [STORE_LISTING.md](store/STORE_LISTING.md) com os textos dos formulários em inglês e português. Para montar os pacotes de envio, rode `node build.mjs` e compacte o conteúdo de `build/chrome` e `build/firefox` (com o `manifest.json` na raiz de cada zip).

## Créditos e licença

O código da extensão é distribuído sob a [licença MIT](LICENSE). Cada esquema de cores pertence ao seu autor original; veja os créditos no [Cube4Themes](https://github.com/robertoritter/Cube4Themes#credits). O Cube4Themes e as quatro coleções de paletas (iTerm2-Color-Schemes, Gogh, lucario, vim-deus) são MIT, e a fonte Manrope está sob a SIL Open Font License 1.1. Os textos completos estão em `src/licenses/` e o resumo em `src/THIRD_PARTY_NOTICES.txt`. O nome e o símbolo da Cube4Code não estão cobertos pela licença MIT.

Desenvolvido por **Roberto RITTER** na [Cube4Code](https://cube4code.com).
