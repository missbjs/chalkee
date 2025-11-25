
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
