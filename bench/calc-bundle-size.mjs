import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const distPath = './dist';
let mjs = 0, cjs = 0, map = 0, dts = 0;

function walkDir(dir) {
    const files = readdirSync(dir);
    files.forEach(file => {
        const fullPath = join(dir, file);
        const stat = statSync(fullPath);
        if (stat.isFile()) {
            if (file.endsWith('.mjs')) mjs += stat.size;
            else if (file.endsWith('.cjs')) cjs += stat.size;
            else if (file.endsWith('.map')) map += stat.size;
            else if (file.endsWith('.d.ts')) dts += stat.size;
        } else if (stat.isDirectory()) {
            walkDir(fullPath);
        }
    });
}

walkDir(distPath);

const kb = (b) => (b / 1024).toFixed(2);

console.log('\n=== Chalkee Bundle Size ===\n');
console.log(`Production Bundles: ${kb(mjs + cjs)} KB`);
console.log(`  - ES Module (.mjs): ${kb(mjs)} KB`);
console.log(`  - CommonJS (.cjs): ${kb(cjs)} KB`);
console.log(`Source Maps (.map): ${kb(map)} KB`);
console.log(`Type Definitions (.d.ts): ${kb(dts)} KB`);
console.log(`\nTotal: ${kb(mjs + cjs + map + dts)} KB`);
console.log(`\nProduction only (for npm): ${kb(mjs + cjs)} KB`);
