// Test the background chaining functionality with the new callable class implementation
import './dist/plugins/core.mjs';
import './dist/plugins/bg.mjs';
import './dist/plugins/space.mjs';
import { c as createStyler, e as escapeAnsi } from './dist/styler-B4mbBy4I.js';

console.log('Testing background chaining functionality...');

// Create a styler instance
const crayon = createStyler();
console.log('Crayon created:', crayon);

// Test the original issue: bg.red('Red background').as.blue('Blue text')
try {
    console.log('\nTesting: bg.red("Red background").as.blue("Blue text")');
    const result1 = crayon.bg.red('Red background').as.blue('Blue text');
    console.log('Result as string:', String(result1));
    console.log('Result escaped:', escapeAnsi(String(result1)));

    // Test if both segments are present
    const resultString = String(result1);
    if (resultString.includes('Red background') && resultString.includes('Blue text')) {
        console.log('✅ SUCCESS: Both segments are present in the result');
    } else {
        console.log('❌ FAILURE: Missing segments in the result');
    }
} catch (error) {
    console.error('Error with bg chaining:', error);
}

// Test another bg chaining example
try {
    console.log('\nTesting: bg.blue("Blue bg").as.green("Green text")');
    const result2 = crayon.bg.blue('Blue bg').as.green('Green text');
    console.log('Result as string:', String(result2));
    console.log('Result escaped:', escapeAnsi(String(result2)));

    // Test if both segments are present
    const resultString = String(result2);
    if (resultString.includes('Blue bg') && resultString.includes('Green text')) {
        console.log('✅ SUCCESS: Both segments are present in the result');
    } else {
        console.log('❌ FAILURE: Missing segments in the result');
    }
} catch (error) {
    console.error('Error with bg chaining:', error);
}

console.log('\nBackground chaining test completed.');