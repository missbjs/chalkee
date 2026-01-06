import chalkee from './chalkee/index.mjs';

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
    chalkee.red`Hello World`;
}
console.timeEnd('chalkee-template');
