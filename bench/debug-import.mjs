import crayon from '../dist/index.mjs';
import '../dist/plugins/core.mjs';

console.log('Testing Crayon imports:');
console.log('crayon:', typeof crayon);
console.log('crayon.red:', typeof crayon.red);
console.log('crayon.bold:', typeof crayon.bold);
console.log('crayon.underline:', typeof crayon.underline);

if (typeof crayon.red === 'function') {
    console.log('crayon.red("Hello World"):', crayon.red('Hello World'));
} else {
    console.log('crayon.red is not a function');
}

if (typeof crayon.bold === 'function') {
    console.log('crayon.bold("Hello World"):', crayon.bold('Hello World'));
} else {
    console.log('crayon.bold is not a function');
}