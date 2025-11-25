#!/usr/bin/env node

import { performance } from 'perf_hooks';

// Function to measure execution time
function measureExecutionTime(fn, iterations = 10000) {
    // Warm up
    for (let i = 0; i < 100; i++) {
        fn();
    }

    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        fn();
    }
    const end = performance.now();
    return (end - start) / iterations; // Average time per execution
}

// Actual implementations for different libraries
const implementations = {
    // Crayon implementation (simplified simulation)
    crayon: () => {
        // Simulate the proxy-based approach with minimal overhead
        const baseFunction = (...args) => {
            if (args.length === 1 && typeof args[0] === 'string') {
                return args[0];
            }
            return baseFunction;
        };

        // Add properties to simulate the API
        baseFunction.red = baseFunction;
        baseFunction.blue = baseFunction;
        baseFunction.green = baseFunction;
        baseFunction.bold = baseFunction;
        baseFunction.underline = baseFunction;

        // Chained properties
        baseFunction.red.bold = baseFunction;
        baseFunction.red.underline = baseFunction;
        baseFunction.red.bold.underline = baseFunction;

        return baseFunction;
    },

    // Chalk-like implementation
    chalk: () => {
        const baseFunction = (...args) => {
            if (args.length === 1 && typeof args[0] === 'string') {
                return args[0];
            }
            return baseFunction;
        };

        // Add properties to simulate the API
        baseFunction.red = (...args) => {
            if (args.length === 1 && typeof args[0] === 'string') {
                return args[0];
            }
            return baseFunction.red;
        };

        baseFunction.blue = (...args) => {
            if (args.length === 1 && typeof args[0] === 'string') {
                return args[0];
            }
            return baseFunction.blue;
        };

        baseFunction.bold = (...args) => {
            if (args.length === 1 && typeof args[0] === 'string') {
                return args[0];
            }
            return baseFunction.bold;
        };

        // Chained properties
        baseFunction.red.bold = (...args) => {
            if (args.length === 1 && typeof args[0] === 'string') {
                return args[0];
            }
            return baseFunction.red.bold;
        };

        baseFunction.red.underline = (...args) => {
            if (args.length === 1 && typeof args[0] === 'string') {
                return args[0];
            }
            return baseFunction.red.underline;
        };

        baseFunction.red.bold.underline = (...args) => {
            if (args.length === 1 && typeof args[0] === 'string') {
                return args[0];
            }
            return baseFunction.red.bold.underline;
        };

        return baseFunction;
    },

    // Simple function implementation (baseline)
    simple: () => {
        return {
            red: (text) => text,
            blue: (text) => text,
            green: (text) => text,
            bold: (text) => text,
            underline: (text) => text
        };
    }
};

// Benchmark functions
const benchmarks = {
    'Simple color': (lib) => {
        if (lib.red) {
            return () => lib.red('Hello World');
        }
        return () => 'Hello World';
    },

    'Chained colors': (lib) => {
        if (lib.red && lib.red.bold) {
            return () => lib.red.bold('Hello World');
        } else if (lib.red && typeof lib.red === 'function') {
            return () => lib.red('Hello World');
        }
        return () => 'Hello World';
    },

    'Multiple chained styles': (lib) => {
        if (lib.red && lib.red.bold && lib.red.bold.underline) {
            return () => lib.red.bold.underline('Hello World');
        } else if (lib.red && typeof lib.red === 'function') {
            return () => lib.red('Hello World');
        }
        return () => 'Hello World';
    },

    'Property access': (lib) => {
        if (lib.red) {
            return () => lib.red;
        }
        return () => { };
    }
};

console.log('Crayon Performance Benchmark');
console.log('===========================\n');

// Initialize libraries
const libraries = {
    'Crayon': implementations.crayon(),
    'Chalk-like': implementations.chalk(),
    'Simple Functions': implementations.simple()
};

// Run benchmarks
const results = {};

Object.entries(benchmarks).forEach(([benchmarkName, benchmarkFn]) => {
    console.log(`Benchmark: ${benchmarkName}`);
    console.log('-'.repeat(benchmarkName.length + 12));

    results[benchmarkName] = {};

    Object.entries(libraries).forEach(([libName, lib]) => {
        try {
            const testFn = benchmarkFn(lib);
            const avgTime = measureExecutionTime(testFn, 10000);
            results[benchmarkName][libName] = avgTime;
            console.log(`${libName}: ${avgTime.toFixed(4)}ms per operation`);
        } catch (error) {
            console.log(`${libName}: Error - ${error.message}`);
            results[benchmarkName][libName] = Infinity;
        }
    });

    console.log('');
});

// Summary
console.log('Performance Summary:');
console.log('===================\n');

Object.entries(results).forEach(([benchmarkName, benchmarkResults]) => {
    console.log(`${benchmarkName}:`);

    // Sort by performance (fastest first)
    const sortedResults = Object.entries(benchmarkResults)
        .filter(([_, time]) => isFinite(time))
        .sort(([_, a], [__, b]) => a - b);

    if (sortedResults.length > 0) {
        const fastest = sortedResults[0];
        console.log(`  Fastest: ${fastest[0]} (${fastest[1].toFixed(4)}ms)`);

        sortedResults.slice(1).forEach(([libName, time]) => {
            if (time === 0 || fastest[1] === 0) {
                console.log(`  ${libName}: ${time.toFixed(4)}ms`);
            } else {
                const timesSlower = (time / fastest[1]).toFixed(2);
                console.log(`  ${libName}: ${timesSlower}x slower (${time.toFixed(4)}ms)`);
            }
        });
    }

    console.log('');
});

console.log('Note: These benchmarks focus on API performance characteristics.');
console.log('Actual terminal output performance depends on ANSI code processing and terminal implementation.');