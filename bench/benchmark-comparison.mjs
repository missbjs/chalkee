#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { writeFileSync, mkdirSync, existsSync, cpSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create temporary directory for benchmark
const tempDir = join(__dirname, '..', 'temp-benchmark');

// Clean up previous runs
if (existsSync(tempDir)) {
    execSync(`rm -rf ${tempDir}`, { stdio: 'inherit' });
}

mkdirSync(tempDir, { recursive: true });

// Create package.json for temp directory
const packageJson = {
    "name": "chalkee-benchmark",
    "version": "1.0.0",
    "type": "module",
    "dependencies": {
        "chalk": "^5.0.0",
        "ansi-colors": "^4.1.3",
        "picocolors": "^1.0.0",
        "cli-color": "^2.0.3",
        "colors": "^1.4.0"
    }
};

writeFileSync(join(tempDir, 'package.json'), JSON.stringify(packageJson, null, 2));

console.log('Installing dependencies...');

try {
    execSync(`cd ${tempDir} && npm install`, { stdio: 'inherit' });
    console.log('\nDependencies installed successfully.\n');
} catch (error) {
    console.error('Failed to install dependencies:', error.message);
    process.exit(1);
}

// Copy dist directory to temp-benchmark
console.log('Copying Chalkee dist directory...');
cpSync(join(__dirname, '..', 'dist'), join(tempDir, 'chalkee'), { recursive: true });

// Create benchmark test files
const testFiles = {
    'chalk-test.mjs': `import chalk from 'chalk';

// Simple color test
console.time('chalk-simple');
for (let i = 0; i < 10000; i++) {
    chalk.red('Hello World');
}
console.timeEnd('chalk-simple');

// Chained colors test
console.time('chalk-chained');
for (let i = 0; i < 10000; i++) {
    chalk.red.bold('Hello World');
}
console.timeEnd('chalk-chained');

// Complex chaining test
console.time('chalk-complex');
for (let i = 0; i < 10000; i++) {
    chalk.red.bold.underline('Hello World');
}
console.timeEnd('chalk-complex');`,

    'chalkee-test.mjs': `import chalkee from './chalkee/index.mjs';

// Simple color test
console.time('chalkee-simple');
for (let i = 0; i < 10000; i++) {
    chalkee.red('Hello World');
}
console.timeEnd('chalkee-simple');

// Chained colors test
console.time('chalkee-chained');
for (let i = 0; i < 10000; i++) {
    chalkee.red.bold('Hello World');
}
console.timeEnd('chalkee-chained');

// Complex chaining test
console.time('chalkee-complex');
for (let i = 0; i < 10000; i++) {
    chalkee.red.bold.underline('Hello World');
}
console.timeEnd('chalkee-complex');

// Template literal test
console.time('chalkee-template');
for (let i = 0; i < 10000; i++) {
    chalkee.red\`Hello World\`;
}
console.timeEnd('chalkee-template');`,

    'ansi-colors-test.mjs': `import ansi from 'ansi-colors';

// Simple color test
console.time('ansi-colors-simple');
for (let i = 0; i < 10000; i++) {
    ansi.red('Hello World');
}
console.timeEnd('ansi-colors-simple');

// Chained colors test
console.time('ansi-colors-chained');
for (let i = 0; i < 10000; i++) {
    ansi.red.bold('Hello World');
}
console.timeEnd('ansi-colors-chained');

// Complex chaining test
console.time('ansi-colors-complex');
for (let i = 0; i < 10000; i++) {
    ansi.red.bold.underline('Hello World');
}
console.timeEnd('ansi-colors-complex');`,

    'picocolors-test.mjs': `import pc from 'picocolors';

// Simple color test
console.time('picocolors-simple');
for (let i = 0; i < 10000; i++) {
    pc.red('Hello World');
}
console.timeEnd('picocolors-simple');

// Chained colors test
console.time('picocolors-chained');
for (let i = 0; i < 10000; i++) {
    pc.bold(pc.red('Hello World'));
}
console.timeEnd('picocolors-chained');

// Complex chaining test
console.time('picocolors-complex');
for (let i = 0; i < 10000; i++) {
    pc.underline(pc.bold(pc.red('Hello World')));
}
console.timeEnd('picocolors-complex');`,

    'cli-color-test.mjs': `import clc from 'cli-color';

// Simple color test
console.time('cli-color-simple');
for (let i = 0; i < 10000; i++) {
    clc.red('Hello World');
}
console.timeEnd('cli-color-simple');

// Chained colors test
console.time('cli-color-chained');
for (let i = 0; i < 10000; i++) {
    clc.bold.red('Hello World');
}
console.timeEnd('cli-color-chained');

// Complex chaining test
console.time('cli-color-complex');
for (let i = 0; i < 10000; i++) {
    clc.bold.underline.red('Hello World');
}
console.timeEnd('cli-color-complex');`,

    'colors-test.mjs': `import colors from 'colors/safe.js';

// Simple color test
console.time('colors-simple');
for (let i = 0; i < 10000; i++) {
    colors.red('Hello World');
}
console.timeEnd('colors-simple');

// Chained colors test
console.time('colors-chained');
for (let i = 0; i < 10000; i++) {
    colors.bold(colors.red('Hello World'));
}
console.timeEnd('colors-chained');

// Complex chaining test
console.time('colors-complex');
for (let i = 0; i < 10000; i++) {
    colors.underline(colors.bold(colors.red('Hello World')));
}
console.timeEnd('colors-complex');`
};

// Write test files
Object.entries(testFiles).forEach(([filename, content]) => {
    writeFileSync(join(tempDir, filename), content.trim());
});

// Run benchmarks
console.log('Running benchmarks...\n');

const results = {};

for (const [filename, _] of Object.entries(testFiles)) {
    const testName = filename.replace('-test.mjs', '');
    console.log(`Running ${testName} benchmark...`);

    try {
        const output = execSync(`cd ${tempDir} && node ${filename}`, {
            stdio: ['pipe', 'pipe', 'pipe'],
            encoding: 'utf-8'
        });
        console.log(output);
        results[testName] = output;
    } catch (error) {
        console.error(`Failed to run ${testName} benchmark:`, error.message);
        results[testName] = 'Failed';
    }

    console.log('');
}

// Parse and display results
console.log('\n\nBenchmark Results Summary:');
console.log('========================\n');

Object.entries(results).forEach(([library, output]) => {
    console.log(`${library}:`);
    if (output !== 'Failed') {
        console.log(output);
    } else {
        console.log('  Failed to run benchmark');
    }
});

// Clean up
console.log('Cleaning up temporary files...');
// Note: We're not deleting the temp directory to allow for manual inspection if needed

// Detailed comparison table
console.log('\n\nPerformance Comparison Table:');
console.log('=============================\n');

const libraries = ['chalk', 'chalkee', 'ansi-colors', 'picocolors', 'cli-color', 'colors'];
const scenarios = ['simple', 'chained', 'complex'];
const data = {};

for (const lib of libraries) {
    data[lib] = {};
    const output = results[lib] || '';
    for (const scenario of scenarios) {
        const match = output.match(new RegExp(`${lib}-${scenario}: ([\\d.]+)ms`));
        if (match) {
            data[lib][scenario] = parseFloat(match[1]);
        }
    }
}

console.log('Library        | Simple(ms) | Chained(ms) | Complex(ms) | Avg(ms)');
console.log('-'.repeat(65));

for (const lib of libraries) {
    const simple = data[lib].simple?.toFixed(2) || 'N/A';
    const chained = data[lib].chained?.toFixed(2) || 'N/A';
    const complex = data[lib].complex?.toFixed(2) || 'N/A';
    const avg = (data[lib].simple && data[lib].chained && data[lib].complex)
        ? ((data[lib].simple + data[lib].chained + data[lib].complex) / 3).toFixed(2)
        : 'N/A';
    console.log(`${lib.padEnd(14)} | ${simple.padStart(10)} | ${chained.padStart(11)} | ${complex.padStart(11)} | ${avg}`);
}

console.log('\n\nBenchmark completed!');
console.log('Note: This benchmark compares API performance only.');
console.log('Actual terminal output performance depends on the terminal implementation.');