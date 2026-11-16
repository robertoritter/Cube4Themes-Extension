/*
 * Gera as pastas prontas para carregar em cada navegador:
 *   build/chrome   (Chrome, Brave, Edge)
 *   build/firefox
 *
 * Uso:
 *   node build.mjs                          monta com os arquivos que já estão em src/lib
 *   node build.mjs ../Cube4Themes           atualiza src/lib a partir de um clone do Cube4Themes e monta
 *
 * Sem dependências: só Node 18+.
 */
import { cpSync, rmSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const here = resolve('.');
const src = join(here, 'src');
const lib = join(src, 'lib');

const c4 = process.argv[2];
if (c4) {
  const from = resolve(c4);
  const files = [
    ['src/index.js', 'index.js'],
    ['src/palettes.js', 'palettes.js'],
    ['dist/themes.css', 'themes.css'],
    ['LICENSE', '../licenses/Cube4Themes.txt'],
  ];
  for (const [a, b] of files) {
    const p = join(from, a);
    if (!existsSync(p)) throw new Error('Não encontrei ' + p + '. Rode "npm run build" no Cube4Themes antes.');
    cpSync(p, join(lib, b));
  }
  console.log('src/lib atualizado a partir de', from);
}

const base = JSON.parse(readFileSync(join(here, 'manifest.base.json'), 'utf8'));

const targets = {
  chrome: base,
  firefox: {
    ...base,
    browser_specific_settings: {
      gecko: {
        id: 'cube4themes@cube4code.com',
        strict_min_version: '140.0',
        // A extensão não coleta nem transmite dados pessoais (exigido pela AMO para extensões novas).
        data_collection_permissions: { required: ['none'] },
      },
      // No Android, a chave de dados só existe a partir do Firefox 142.
      gecko_android: { strict_min_version: '142.0' },
    },
  },
};

for (const [name, manifest] of Object.entries(targets)) {
  const out = join(here, 'build', name);
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  cpSync(src, out, { recursive: true });
  writeFileSync(join(out, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log('build/' + name);
}
