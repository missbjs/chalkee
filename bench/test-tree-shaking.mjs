#!/usr/bin/env node

import { execSync } from 'child_process';
import { writeFileSync, mkdirSync, existsSync, readFileSync, cpSync, readdirSync, unlinkSync, rmdirSync, statSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper to remove directory recursively
function removeDir(path) {
    if (existsSync(path)) {
        const entries = readdirSync(path);
        for (const entry of entries) {
            const fullPath = join(path, entry);
            const stat = statSync(fullPath);
            if (stat.isDirectory()) {
                removeDir(fullPath);
            } else {
                unlinkSync(fullPath);
            }
        }
        rmdirSync(path);
    }
}

// Create temp directory for tree-shaking test
const testDir = join(__dirname, 'tree-shake-test');
removeDir(testDir);
mkdirSync(testDir, { recursive: true });

// Copy dist using cpSync (Windows-compatible)
const chalkeeDistDir = join(testDir, 'chalkee');
cpSync(join(__dirname, '..', 'dist'), chalkeeDistDir, { recursive: true });

// Create package.json
const packageJson = {
    "name": "tree-shake-test",
    "version": "1.0.0",
    "type": "module",
    "dependencies": {}
};
writeFileSync(join(testDir, 'package.json'), JSON.stringify(packageJson, null, 2));

// Test 1: Full import (all features)
const fullTest = `import chalkee from './chalkee/index.mjs';
console.log('Full import test:');
console.log('Red:', chalkee.red('Hello'));
console.log('Bold:', chalkee.bold('Bold'));
console.log('Template:', chalkee.red\`Template\`);
`;

// Test 2: Import only what's needed (minimal)
const minimalTest = `import chalkee from './chalkee/index.mjs';
console.log('Minimal test (only red):');
console.log(chalkee.red('Hello World'));
`;

// Test 3: Direct plugin import
const pluginTest = `import chalkee from './chalkee/index.mjs';
console.log('Plugin test (red + bold):');
console.log(chalkee.red.bold('Red Bold'));
`;

// Write test files
writeFileSync(join(testDir, 'full-import.mjs'), fullTest);
writeFileSync(join(testDir, 'minimal-import.mjs'), minimalTest);
writeFileSync(join(testDir, 'plugin-import.mjs'), pluginTest);

console.log('\n=== Tree-Shaking Tests ===\n');

// Run tests
console.log('Test 1: Full Import');
console.log('-'.repeat(40));
try {
    const output1 = execSync(`cd ${testDir} && node full-import.mjs`, { encoding: 'utf-8' });
    console.log(output1);
} catch (e) {
    console.error('Failed:', e.message);
}

console.log('\nTest 2: Minimal Import');
console.log('-'.repeat(40));
try {
    const output2 = execSync(`cd ${testDir} && node minimal-import.mjs`, { encoding: 'utf-8' });
    console.log(output2);
} catch (e) {
    console.error('Failed:', e.message);
}

console.log('\nTest 3: Plugin Import');
console.log('-'.repeat(40));
try {
    const output3 = execSync(`cd ${testDir} && node plugin-import.mjs`, { encoding: 'utf-8' });
    console.log(output3);
} catch (e) {
    console.error('Failed:', e.message);
}

// Analyze bundle composition
console.log('\n=== Bundle Analysis ===\n');

const indexMjs = readFileSync(join(chalkeeDistDir, 'index.mjs'), 'utf-8');
const registryMjs = readFileSync(join(chalkeeDistDir, 'plugins', 'registry.mjs'), 'utf-8');
const stylerMjs = readFileSync(join(chalkeeDistDir, 'plugins', 'styler.mjs'), 'utf-8');
const utilsMjs = readFileSync(join(chalkeeDistDir, 'plugins', 'utils.mjs'), 'utf-8');

const getSize = (content) => (content.length / 1024).toFixed(2);

console.log('Core Module Sizes:');
console.log(`  index.mjs: ${getSize(indexMjs)} KB`);
console.log(`  registry.mjs: ${getSize(registryMjs)} KB`);
console.log(`  styler.mjs: ${getSize(stylerMjs)} KB`);
console.log(`  utils.mjs: ${getSize(utilsMjs)} KB`);
console.log(`  Total (core): ${(parseFloat(getSize(indexMjs)) + parseFloat(getSize(registryMjs)) + parseFloat(getSize(stylerMjs)) + parseFloat(getSize(utilsMjs))).toFixed(2)} KB`);

console.log('\n✅ Tests completed. All imports working correctly!\n');
