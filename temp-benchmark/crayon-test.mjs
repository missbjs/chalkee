
import crayon from 'chalkee';

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
