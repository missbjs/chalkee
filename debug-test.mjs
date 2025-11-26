import crayon from './dist/index.mjs';

console.log('Testing crayon object directly...');
try {
    console.log('Crayon object:', crayon);
    console.log('Type of crayon:', typeof crayon);
    console.log('Has blue property:', 'blue' in crayon);
    console.log('Blue property:', crayon.blue);
    console.log('Type of blue:', typeof crayon.blue);

    if (typeof crayon.blue === 'function') {
        console.log('Blue function test:', crayon.blue('test'));
    }
} catch (error) {
    console.error('Error testing crayon:', error);
}