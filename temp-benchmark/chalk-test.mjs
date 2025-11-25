
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
