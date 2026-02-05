#!/usr/bin/env node

const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

/**
 * CONFIG
 */
const SRC_GLOB = path.join(__dirname, '../src/**/*.{vue,ts,js}');
const LOCALES_DIR = path.join(__dirname, '../src/locales/langs');

/**
 * 1. detect languages
 */
if (!fs.existsSync(LOCALES_DIR)) {
  console.error(`❌ Locales dir not found: ${LOCALES_DIR}`);
  process.exit(1);
}

const LANGS = fs
  .readdirSync(LOCALES_DIR)
  .filter((d) => fs.statSync(path.join(LOCALES_DIR, d)).isDirectory());

if (LANGS.length === 0) {
  console.error('❌ No language folders found');
  process.exit(1);
}

/**
 * 2. run vue-i18n-extract (report mode)
 */
let output = '';
try {
  output = execSync(
    `vue-i18n-extract report ` +
    `--vueFiles "${SRC_GLOB}" ` +
    `--languageFiles "${LOCALES_DIR}/**/*.json"`,
    { encoding: 'utf8' },
  );
} catch (error) {
  // vue-i18n-extract exits with code 1 when missing keys exist
  output = error.stdout?.toString() || '';
}

console.log(output);
/**
 * 3. parse missing keys
 */
const missingKeys = Array.from(
  output.split('Unused Keys')[0].matchAll(/│\s*'([^']+)'\s*│/g),
  (m) => m[1],
).filter((key) => !key.includes('${'));

if (missingKeys.length === 0) {
  console.log('✅ No missing i18n keys');
  process.exit(0);
}

/**
 * 4. apply keys
 */
for (const key of missingKeys) {
  const [namespace] = key.split('.');
  const newKey = key.split('.').slice(1).join('.');

  for (const lang of LANGS) {
    const langDir = path.join(LOCALES_DIR, lang);
    const filePath = path.join(langDir, `${namespace}.json`);

    const json = !fs.existsSync(filePath) ? {} : JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (newKey) {
      setDeep(json, newKey, humanize(key));
      if (Object.keys(json).length > 0) {
        fs.writeFileSync(filePath, `${JSON.stringify(json, null, 2)}\n`);
      }
    }
  }
}

console.log(`✨ Added ${missingKeys.length} i18n keys`);

/**
 * helpers
 */
function setDeep(obj, key, value) {
  try {
    const parts = key.split('.');
    let cur = obj;

    for (let i = 0; i < parts.length - 1; i++) {
      cur[parts[i]] ??= {};
      cur = cur[parts[i]];
    }

    cur[parts.at(-1)] ??= value;
  } catch {
    console.log({ obj, key, value });
    // throw error;
  }
}

function humanize(key) {
  let last = key.split('.').at(-1);

  if (last.startsWith('OpWork')) {
    last = last.replace('OpWork', '');
  }

  if (last.startsWith('Auth')) {
    last = last.replace('Auth', '');
  }

  return (
    last
      // authUser → auth User
      // AuthUser → Auth User
      .replaceAll(/([a-z0-9])([A-Z])/g, '$1 $2')
      // auth_user / auth-user → auth user
      .replaceAll(/[_-]+/g, ' ')
      // capitalize first letter
      .replace(/^./, (c) => c.toUpperCase())
  )
}
