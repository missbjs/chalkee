import crayon from './dist/index.mjs';

console.log('Crayon object:', crayon);
console.log('Has red property:', 'red' in crayon);
console.log('Red property:', crayon.red);
console.log('Type of red:', typeof crayon.red);

// Try to use the red property
try {
    const result = crayon.red('test');
    console.log('Red result:', result);
} catch (error) {
    console.error('Error using red:', error);
}

// Try to use chaining
try {
    const result = crayon.red.bold('test');
    console.log('Red bold result:', result);
} catch (error) {
    console.error('Error using red.bold:', error);
}