#!/usr/bin/env node

import { performance } from 'perf_hooks';

// Import Crayon and its plugins
import crayon from '../dist/index.mjs';
import '../dist/plugins/core.mjs';
import '../dist/plugins/modifiers.mjs';

// Import chalk for comparison
import chalk from 'chalk';

console.log('Direct Performance Benchmark');
console.log('==========================\n');

// Warm up
console.log('Warming up...');
for (let i = 0; i < 1000; i++) {
    crayon.red('test');
    chalk.red('test');
}
console.log('Warmup complete.\n');

// Benchmark function
function benchmark(name, fn, iterations = 10000) {
    // Warm up the specific function
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
    console.log(`  Operations/sec: ${(iterations / (totalTime / 1000)).toFixed(0)}`);
    console.log('');

    return avgTime;
}

// Run benchmarks
console.log('Running benchmarks...\n');

const results = {};

// Simple color benchmarks
results['Crayon Simple'] = benchmark('Crayon Simple Color', () => {
    crayon.red('Hello World');
}, 10000);

results['Chalk Simple'] = benchmark('Chalk Simple Color', () => {
    chalk.red('Hello World');
}, 10000);

// Chained color benchmarks
results['Crayon Chained'] = benchmark('Crayon Chained Colors', () => {
    crayon.red.bold('Hello World');
}, 10000);

results['Chalk Chained'] = benchmark('Chalk Chained Colors', () => {
    chalk.red.bold('Hello World');
}, 10000);

// Complex chaining benchmarks
results['Crayon Complex'] = benchmark('Crayon Complex Chaining', () => {
    crayon.red.bold.underline('Hello World');
}, 10000);

results['Chalk Complex'] = benchmark('Chalk Complex Chaining', () => {
    chalk.red.bold.underline('Hello World');
}, 10000);

// Summary
console.log('Performance Summary:');
console.log('==================');

// Sort results by performance
const sortedResults = Object.entries(results).sort(([, a], [, b]) => a - b);

console.log('Fastest to Slowest:');
sortedResults.forEach(([name, time]) => {
    console.log(`  ${name}: ${time.toFixed(4)}ms per operation`);
});

// Compare Crayon vs Chalk
console.log('\nComparison:');
const crayonSimple = results['Crayon Simple'];
const chalkSimple = results['Chalk Simple'];
if (crayonSimple && chalkSimple) {
    const ratio = (crayonSimple / chalkSimple).toFixed(1);
    console.log(`  Crayon is ${ratio}x slower than Chalk for simple colors`);
}

const crayonChained = results['Crayon Chained'];
const chalkChained = results['Chalk Chained'];
if (crayonChained && chalkChained) {
    const ratio = (crayonChained / chalkChained).toFixed(1);
    console.log(`  Crayon is ${ratio}x slower than Chalk for chained colors`);
}

const crayonComplex = results['Crayon Complex'];
const chalkComplex = results['Chalk Complex'];
if (crayonComplex && chalkComplex) {
    const ratio = (crayonComplex / chalkComplex).toFixed(1);
    console.log(`  Crayon is ${ratio}x slower than Chalk for complex chaining`);
}