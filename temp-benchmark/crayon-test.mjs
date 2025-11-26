
// For Crayon, we'll test using a direct import approach
import crayon from './chalkee/index.mjs';
// Import plugins to register their codes
import './chalkee/plugins/modifiers.mjs';
import './chalkee/plugins/core.mjs';
import './chalkee/plugins/ext-colors.mjs';
import './chalkee/plugins/bg.mjs';
import './chalkee/plugins/util.mjs';

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
