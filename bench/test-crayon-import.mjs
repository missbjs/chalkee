import crayon from 'chalkee';

console.log('Crayon import test');
console.log('Red text:', crayon.red('Hello World'));
console.log('Bold red text:', crayon.red.bold('Hello World'));
console.log('Complex styling:', crayon.red.bold.underline('Hello World'));