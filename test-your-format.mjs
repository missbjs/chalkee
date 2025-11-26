// Test your exact format
import './dist/plugins/core.mjs';
import './dist/plugins/space.mjs';
import './dist/plugins/bg.mjs';
import { c as createStyler, e as escapeAnsi } from './dist/styler-B4mbBy4I.js';

console.log('=== Testing Your Exact Format ===\n');

const crayon = createStyler();

// Test the exact format you specified
const result = crayon.red('Red').blue('Blue');
console.log('crayon.red("Red").blue("Blue"):');
console.log('  Raw output:', result.toString());
console.log('  escapeAnsi output:', escapeAnsi(result.toString()));

// This is what you're looking for:
const expected = '\\x1b[31mRed\\x1b[39m\\x1b[34mBlue\\x1b[39m';
console.log('  Your expected format:', expected);

// Check if they match (they won't because of the escapeAnsi conversion)
console.log('  Do they match?', escapeAnsi(result.toString()) === expected);

// To get the exact format you want, we'd need to use a different escape function
// Let's create a custom function that gives you the exact format:
function customEscape(text) {
    return text.replace(/\x1b/g, '\\x1b');
}

console.log('\nUsing custom escape function:');
console.log('  Custom escape output:', customEscape(result.toString()));
console.log('  Custom escape matches expected?', customEscape(result.toString()) === expected);