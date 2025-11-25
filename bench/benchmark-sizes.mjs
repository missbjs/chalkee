#!/usr/bin/env node

import { execSync } from 'child_process';
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

console.log('Crayon Benchmark - Build Sizes');
console.log('==============================\n');

// Build all examples
const examples = ['core', 'color-utilities', 'modifiers', 'mixed', 'minimal'];
const buildDir = '..\\example.build';

console.log('Building all examples...\n');

examples.forEach(example => {
    try {
        console.log(`Building ${example}...`);
        execSync(`cd ${buildDir}\\${example} && npm run build`, { stdio: 'inherit' });
        console.log(`${example} built successfully.\n`);
    } catch (error) {
        console.error(`Failed to build ${example}:`, error.message);
    }
});

console.log('\nBuild Size Comparison:');
console.log('=====================\n');

examples.forEach(example => {
    const distPath = join(buildDir, example, 'dist');
    try {
        const files = readdirSync(distPath);
        const mjsFile = files.find(f => f.endsWith('.mjs'));
        if (mjsFile) {
            const stats = statSync(join(distPath, mjsFile));
            console.log(`${example}: ${formatBytes(stats.size)}`);
        } else {
            console.log(`${example}: Not built yet`);
        }
    } catch (err) {
        console.log(`${example}: Not built yet`);
    }
});

console.log('\nSummary:');
console.log('- minimal: Truly minimal build with no plugins');
console.log('- core: Only core colors plugin');
console.log('- modifiers: Only modifiers plugin');
console.log('- color-utilities: Only color utilities plugin');
console.log('- mixed: Multiple plugins (core, util, modifiers)');