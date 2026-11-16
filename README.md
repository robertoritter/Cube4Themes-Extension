**English** | [Português](README.pt-BR.md)

![Cube4Themes: 53 color themes for any website](store/images/promo-marquee-1400x560.png)

# Cube4Themes Extension

Many websites still have no dark mode, and the ones that do rarely match your taste. Cube4Themes applies a full color theme to any website, for one site or for all of them, so every page looks the way you want to read it. Works in Chrome, Brave, Edge, Opera, Vivaldi and Firefox.

![Original page and the same page with a Cube4Themes theme](store/images/screenshot-2-before-after-1280x800.png)

## Features

- **53 themes, dark and light**, adapted from well-known terminal color schemes such as Tokyo Night, Nord, Catppuccin and Solarized.
- **Readable by design:** every text color is checked against the background for a minimum WCAG contrast.
- **Per site or everywhere:** pick a theme for the current site only, or one theme for all sites. Turn it off where a site already looks good.
- **Instant:** changes apply without reloading the page.
- **English and Portuguese**, following your browser language.

## Install

Cube4Themes is on its way to the Chrome Web Store and to Firefox Add-ons. Until it is listed there, you can install it manually; see [Development](#development) for the steps.

## Privacy

Cube4Themes does not collect or send any data. Your theme choices stay in your browser. There are no network requests, no analytics and no remote code. Full policy: [PRIVACY.md](PRIVACY.md).

## Known limitations

- Sites with a very designed layout can lose some outlines on cards and buttons.
- Dark icons can be hard to see on a dark theme.
- Sites that are already dark get the theme on top; use **No theme** with **This site only** there.
- A page can show its original colors for a moment while loading.
- Tabs opened before installing the extension need a reload.

Found a site that looks wrong? [Open an issue](https://github.com/robertoritter/Cube4Themes-Extension/issues) with its address.

## Development

The extension is plain JavaScript and CSS (Manifest V3), with no dependencies and no bundler. Node 18 or later is only needed for the build script.

```bash
node build.mjs                 # creates build/chrome and build/firefox
node build.mjs ../Cube4Themes  # optional: first refresh src/lib from a Cube4Themes clone
```

**Load in Chrome, Brave, Edge, Opera or Vivaldi:** open `chrome://extensions`, turn on **Developer mode**, click **Load unpacked** and choose `build/chrome`.

**Load in Firefox 140 or later:** open `about:debugging#/runtime/this-firefox`, click **Load Temporary Add-on** and choose `build/firefox/manifest.json`. Then, in `about:addons`, open Cube4Themes, go to **Permissions** and allow access to all sites. A temporary add-on is removed when Firefox closes.

**How it works**

- `src/lib/themes.css` (from [Cube4Themes](https://github.com/robertoritter/Cube4Themes)) defines the `--c4-*` variables of each theme, scoped to `<html data-c4-theme="...">`.
- `src/skin.css` maps any page element to those variables, leaving images, video and SVG alone. It lives in a cascade layer (`@layer c4skin`), so its `!important` rules win over a site's own `!important` rules regardless of specificity.
- `src/content.js` sets or removes `data-c4-theme` from the saved choice, and marks fixed and sticky headers that had their own background so content does not show through them.
- `src/popup.*` lists the themes and saves the choice in `storage.local`. The only permission is `storage`, and there is no background script.

**Store material:** `store/` holds the screenshots, promotional images and [STORE_LISTING.md](store/STORE_LISTING.md) with the store form texts. Upload packages are the contents of `build/chrome` and `build/firefox`, zipped with `manifest.json` at the root.

## Credits and license

The extension code is released under the [MIT License](LICENSE). Each color scheme belongs to its original author; see the credits in [Cube4Themes](https://github.com/robertoritter/Cube4Themes#credits). Cube4Themes and the four palette collections (iTerm2-Color-Schemes, Gogh, lucario, vim-deus) are MIT licensed, and the Manrope font is under the SIL Open Font License 1.1. Full texts are in `src/licenses/` and a summary in `src/THIRD_PARTY_NOTICES.txt`. The Cube4Code name and symbol are not covered by the MIT License.

Developed by **Roberto RITTER** at [Cube4Code](https://cube4code.com).
