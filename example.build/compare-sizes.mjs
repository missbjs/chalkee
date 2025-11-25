#!/usr/bin/env node

import { readdirSync, statSync } from 'fs';
import { join } from 'path';

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
    return `${bytes} bytes (${size} ${sizes[i]})`;
}

console.log('Crayon Build Size Comparison');
console.log('============================\n');

const builds = ['core', 'color-utilities', 'modifiers', 'mixed', 'minimal'];

builds.forEach(build => {
    const distPath = join(build, 'dist');
    try {
        const files = readdirSync(distPath);
        const mjsFile = files.find(f => f.endsWith('.mjs'));
        if (mjsFile) {
            const stats = statSync(join(distPath, mjsFile));
            console.log(`${build}: ${formatBytes(stats.size)}`);
        } else {
            console.log(`${build}: Not built yet`);
        }
    } catch (err) {
        console.log(`${build}: Not built yet`);
    }
});

console.log('\nNote: Smaller sizes indicate better tree shaking and smaller bundle sizes.');
console.log('The selective import approach shows significant size reduction:');
console.log('- core: Only core colors plugin');
console.log('- color-utilities: Only color utilities plugin');
console.log('- modifiers: Only modifiers plugin');
console.log('- mixed: Multiple plugins (core, util, modifiers)');
console.log('- minimal: Truly minimal build with no plugins');