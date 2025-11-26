#!/usr/bin/env node

import { performance } from 'node:perf_hooks'

// Import libraries
import crayon from '../dist/index.mjs'
import chalk from 'chalk'

function benchmark(name, fn, iterations = 10000) {
    // Warmup
    for (let i = 0; i < 100; i++) {
        fn();
    }

    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        fn();
    }
    const end = performance.now();

    const totalTime = end - start;
    const avgTime = totalTime / iterations;

    console.log(`${name}:`);
    console.log(`  Total time: ${totalTime.toFixed(2)}ms`);
    console.log(`  Average time: ${avgTime.toFixed(4)}ms per operation`);
    console.log(`  Operations/sec: ${Math.floor(iterations / (totalTime / 1000))}`);
    console.log('');
}

console.log('Direct Performance Benchmark');
console.log('==========================\n');

console.log('Warming up...');
// Warmup
for (let i = 0; i < 1000; i++) {
    crayon.red('Hello World');
    chalk.red('Hello World');
}
console.log('Warmup complete.\n');

console.log('Running benchmarks...\n');

// Simple color test
benchmark('Crayon Simple Color', () => {
    crayon.red('Hello World');
}, 10000);

benchmark('Chalk Simple Color', () => {
    chalk.red('Hello World');
}, 10000);

// Chained colors test
benchmark('Crayon Chained Colors', () => {
    crayon.red('Hello World');
}, 10000);

benchmark('Chalk Chained Colors', () => {
    chalk.red.bold('Hello World');
}, 10000);

// Complex chaining test
benchmark('Crayon Complex Chaining', () => {
    crayon.red('Hello World');
}, 10000);

benchmark('Chalk Complex Chaining', () => {
    chalk.red.bold.underline('Hello World');
}, 10000);

console.log('Performance Summary:');
console.log('==================\n');

// Note: The actual performance comparison would require running each test multiple times
// and calculating averages. This is a simple demonstration.