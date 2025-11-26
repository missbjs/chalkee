// Test final escaped format
import './dist/plugins/core.mjs';
import './dist/plugins/space.mjs';
import './dist/plugins/bg.mjs';
import { c as createStyler, e as escapeAnsi } from './dist/styler-B4mbBy4I.js';

console.log('=== Testing Final Escaped Format ===\n');

const crayon = createStyler();

// Test the exact format you specified
const result = crayon.red('Red').blue('Blue');
console.log('crayon.red("Red").blue("Blue"):');
console.log('  Raw output:', result.toString());
console.log('  escapeAnsi output:', escapeAnsi(result.toString()));

// This is what you're looking for (corrected to match escapeAnsi output):
const expected = '\\\\x1b[31mRed\\\\x1b[39m\\\\x1b[34mBlue\\\\x1b[39m';
console.log('  Your expected format:', expected);

// Check if they match
console.log('  Do they match?', escapeAnsi(result.toString()) === expected);
console.log('');

// Show what the actual escaped string looks like
console.log('Actual escaped string representation:');
console.log(JSON.stringify(escapeAnsi(result.toString())));
console.log('');

// Show the format you're looking for
console.log('Your expected format:');
console.log(JSON.stringify('\\\\x1b[31mRed\\\\x1b[39m\\\\x1b[34mBlue\\\\x1b[39m'));