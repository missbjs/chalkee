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
    "name": "crayon-benchmark",
    "version": "1.0.0",
    "type": "module",
    "dependencies": {
        "chalk": "^5.0.0",
        "ansi-colors": "^4.1.3"
    }
};

writeFileSync(join(tempDir, 'package.json'), JSON.stringify(packageJson, null, 2));

console.log('Installing dependencies...');

try {
    execSync(`cd ${tempDir} && npm install`, { stdio: 'inherit' });
    console.log('Dependencies installed successfully.\n');
} catch (error) {
    console.error('Failed to install dependencies:', error.message);
    process.exit(1);
}

// Copy dist directory to temp-benchmark
console.log('Copying Crayon dist directory...');
cpSync(join(__dirname, '..', 'dist'), join(tempDir, 'chalkee'), { recursive: true });

// Create benchmark test files
const testFiles = {
    'chalk-test.mjs': `
import chalk from 'chalk';

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
console.timeEnd('chalk-complex');
`,

    'crayon-test.mjs': `
// For Crayon, we'll test using a direct import approach
import crayon from './chalkee/index.mjs';
// Import plugins to register their codes
import './chalkee/plugins/core.mjs';
import './chalkee/plugins/modifiers.mjs';

// Simple color test
console.time('crayon-simple');
for (let i = 0; i < 10000; i++) {
    crayon.red('Hello World');
}
console.timeEnd('crayon-simple');

// Chained colors test
console.time('crayon-chained');
for (let i = 0; i < 10000; i++) {
    crayon.red.bold('Hello World');
}
console.timeEnd('crayon-chained');

// Complex chaining test
console.time('crayon-complex');
for (let i = 0; i < 10000; i++) {
    crayon.red.bold.underline('Hello World');
}
console.timeEnd('crayon-complex');
`,

    'ansi-colors-test.mjs': `
import ansi from 'ansi-colors';

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
console.timeEnd('ansi-colors-complex');
`
};

// Write test files
Object.entries(testFiles).forEach(([filename, content]) => {
    writeFileSync(join(tempDir, filename), content);
});

// Run benchmarks
console.log('Running benchmarks...\n');

const results = {};

for (const [filename] of Object.entries(testFiles)) {
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
console.log('Benchmark Results Summary:');
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

console.log('\nBenchmark completed!');
console.log('\nNote: This benchmark compares API performance only.');
console.log('Actual terminal output performance depends on the terminal implementation.');