// Test the chaining functionality with the new callable class implementation
import './dist/plugins/core.mjs';
import './dist/plugins/modifiers.mjs';
import { c as createStyler } from './dist/styler-B4mbBy4I.js';

console.log('Testing chaining functionality...');

// Create a styler instance
const crayon = createStyler();
console.log('Crayon created:', crayon);

// Test basic styling
try {
    const redText = crayon.red('Red text');
    console.log('Red text:', String(redText));
} catch (error) {
    console.error('Error with red text:', error);
}

// Test chaining
try {
    const chained = crayon.red.bold('Bold red text');
    console.log('Bold red text:', String(chained));
} catch (error) {
    console.error('Error with chaining:', error);
}

// Test method access on callable instances
try {
    const redInstance = crayon.red;
    console.log('Red instance type:', typeof redInstance);
    console.log('Red instance callable?', typeof redInstance === 'function');

    // Test calling the red instance
    const result = redInstance('Called red instance');
    console.log('Called red instance:', String(result));

    // Test accessing methods on the red instance
    console.log('Red instance toString:', redInstance.toString());
} catch (error) {
    console.error('Error with instance methods:', error);
}

// Test complex chaining
try {
    const complex = crayon.blue.bold.underline('Blue, bold, underlined text');
    console.log('Complex chaining:', String(complex));
} catch (error) {
    console.error('Error with complex chaining:', error);
}

console.log('Chaining test completed.');