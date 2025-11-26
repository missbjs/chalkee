// Debug what codes are passed to processText
import './dist/plugins/core.mjs';
import './dist/plugins/space.mjs';
import { c as createStyler } from './dist/styler-B4mbBy4I.js';

// Import the registry module
import * as registry from './dist/registry-D7-N_KSq.js';

console.log('=== Debug processText Calls ===\n');

// Store the original processText function
const originalProcessText = registry.d;

// Monkey patch processText to log what codes are being passed
registry.d = (codes, text, accumulatedText) => {
    console.log('processText called with:');
    console.log('  codes:', codes.map(c => c.open));
    console.log('  text:', JSON.stringify(text));
    console.log('  accumulatedText:', JSON.stringify(accumulatedText));
    console.log('');

    return originalProcessText(codes, text, accumulatedText);
};

const crayon = createStyler();

// Test space chaining
console.log('Testing space chaining:');
const space = crayon.as.red('Red').blue('Blue');
console.log('Final result:', JSON.stringify(space.toString()));