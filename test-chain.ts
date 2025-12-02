// Test file to verify chain behavior
import { red, green, blue, bold, underline } from './src/index';

// Test the chaining behavior
console.log('Testing chain behavior:');
const result = red('first').bold('second').underline('third');
console.log('Result:', result.toString());
console.log('Result with ANSI codes visible:', JSON.stringify(result.toString()));

// Test individual functions
console.log('\nTesting individual functions:');
console.log('red only:', red('red text').toString());
console.log('red only with ANSI codes visible:', JSON.stringify(red('red text').toString()));
console.log('red & bold:', red('red').bold('bold').toString());
console.log('red & bold with ANSI codes visible:', JSON.stringify(red('red').bold('bold').toString()));
console.log('bold & red:', bold('bold').red('red').toString());
console.log('bold & red with ANSI codes visible:', JSON.stringify(bold('bold').red('red').toString()));

// Test the complex chain from the user's example
console.log('\nTesting complex chain:');
const complexChain = red('red').bold('bold').underline('Complex chaining test');
console.log('Complex chain result:', complexChain.toString());
console.log('Complex chain with ANSI codes visible:', JSON.stringify(complexChain.toString()));