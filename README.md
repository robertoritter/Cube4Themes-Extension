# Cube4Themes Extension (modelo para teste local)

Extensão para Chrome, Brave, Edge e Firefox que aplica os temas do [Cube4Themes](https://github.com/robertoritter/Cube4Themes) em qualquer site. A escolha pode valer só para o site atual ou para todos.

## Como funciona

- `src/lib/themes.css` (do Cube4Themes) define as variáveis `--c4-*` de cada tema, presas a `<html data-c4-theme="...">`.
- `src/skin.css` liga os elementos comuns de qualquer site a essas variáveis (fundo, texto, títulos, negrito, links, código, citações, tabelas, formulários). Imagens, vídeos e SVG não são tocados.
- `src/content.js` lê a escolha salva e coloca ou tira o atributo `data-c4-theme`. Sem o atributo, os dois CSS não fazem nada. Ele também marca cabeçalhos e barras fixas (`position: fixed/sticky`) que tinham fundo próprio, para não ficarem transparentes com o conteúdo passando por trás.
- `src/popup.*` lista os 53 temas (escuros e claros, com amostras de cor) e grava a escolha em `storage.local` (nada sai do navegador; veja `PRIVACY.md`). A aba muda na hora.

O nome, a descrição e a dica do botão ficam em `src/_locales/en` e `src/_locales/pt_BR`. O navegador escolhe pelo idioma dele, e inglês é o padrão para os outros idiomas.

A única permissão pedida é `storage`. Não há background script, então o mesmo código serve para todos os navegadores; só o manifest do Firefox ganha um ID.

## Montar

```bash
node build.mjs                 # gera build/chrome e build/firefox
node build.mjs ../Cube4Themes  # opcional: antes atualiza src/lib a partir do seu clone do Cube4Themes
```

## Carregar

**Chrome / Brave / Edge**

1. Abra `chrome://extensions` (no Brave, `brave://extensions`; no Edge, `edge://extensions`).
2. Ligue o **Modo do desenvolvedor**.
3. **Carregar sem compactação** e escolha a pasta `build/chrome`.
4. Fixe o ícone na barra e abra qualquer site.

**Firefox**

1. Abra `about:debugging#/runtime/this-firefox`.
2. **Carregar extensão temporária** e escolha o arquivo `build/firefox/manifest.json`.
3. No Firefox, a permissão de acesso aos sites vem desligada em extensões MV3. Abra `about:addons`, entre na Cube4Themes, aba **Permissões**, e ligue o acesso a todos os sites.
4. A extensão temporária some quando o Firefox fecha. Para ficar permanente, ela precisa ser assinada pela Mozilla (gratuito, pode ser como "não listada").

Depois de alterar o código, use o botão de recarregar da extensão e recarregue a aba.

## Limites conhecidos deste modelo

- Sites que usam `!important` com seletores fortes são cobertos porque a pele fica dentro de `@layer`. Só estilos `!important` escritos direto no atributo `style` do elemento ainda vencem.
- A pele cobre qualquer elemento, inclusive os criados pelo próprio site (como `<ytd-app>` no YouTube), e deixa os fundos transparentes para o fundo do tema aparecer. Em sites com layout muito desenhado, cartões e botões feitos com `div` podem perder o contorno.
- Ícones em SVG ou fontes de ícone escuros podem sumir num tema escuro. Ícones feitos com `mask-image` e cor de fundo também somem.
- Conteúdo dentro de Shadow DOM não é alcançado pelo CSS da página.
- Sites que já são escuros recebem o tema por cima. Use "Sem tema" com "Só este site" para desligar neles.
- A escolha é lida de forma assíncrona, então um site pode piscar com as cores originais por um instante ao carregar.
- Abas abertas antes de instalar a extensão precisam ser recarregadas.

## Próximos passos possíveis

- Peles por site (`skins/<dominio>.css`) para os sites mais usados.
- Detectar se o site já é escuro e não aplicar sozinho.
- Remapear as cores originais do site para a paleta do tema (abordagem do Dark Reader), usando `mix`, `contrast` e `legible` do Cube4Themes.

## Créditos e licença

Cada esquema de cores pertence ao seu autor original; veja os créditos no [Cube4Themes](https://github.com/robertoritter/Cube4Themes#credits). A extensão é MIT (`LICENSE`). O Cube4Themes e as quatro coleções de paletas (iTerm2-Color-Schemes, Gogh, lucario, vim-deus) também são MIT; os textos completos estão em `src/licenses/` e o resumo em `src/THIRD_PARTY_NOTICES.txt`, que acompanha o pacote e abre pelo link "Licenças" no popup.

Desenvolvido por **Roberto Ritter** na [Cube4Code](https://cube4code.com).

## Publicação

A pasta `store/` tem o pacote de envio: os zips de cada loja, as imagens (screenshots 1280x800, ícone 128 e imagens promocionais) e `STORE_LISTING.md` com todos os textos dos formulários em inglês e português. Para refazer os zips depois de mudar o código, rode `node build.mjs` e compacte o conteúdo de `build/chrome` e `build/firefox` (o `manifest.json` precisa ficar na raiz do zip).
