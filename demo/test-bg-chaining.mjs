process.env.FORCE_COLOR = '1';

import crayon from '../dist/index.mjs';
import { escapeAnsi } from '../dist/index.mjs';
const { bg, bgRed, bgBlue, bgGreen } = crayon;

console.log('\n=== Testing Corrected bg Chaining ===\n');

// Test the corrected example - this should show both red and blue backgrounds
console.log('Testing: bg.red("Red background").as.blue("Blue text")');
const result1 = bg.red('Red background').as.blue('Blue text');
console.log('Result as string:', String(result1));
console.log('Result escaped:', escapeAnsi(String(result1)));
console.log('Expected: red bg for first part, blue text (no bg) for second part');

// Test with regular bgRed/bgBlue functions
console.log('\nTesting: bgRed("Red background").as.bgBlue("Blue background")');
const result2 = bgRed('Red background').as.bgBlue('Blue background');
console.log('Result as string:', String(result2));
console.log('Result escaped:', escapeAnsi(String(result2)));

// Test template literal syntax
console.log('\nTesting: bg.red`Red background`.as.blue`Blue text`');
const result3 = bg.red`Red background`.as.blue`Blue text`;
console.log('Result as string:', String(result3));
console.log('Result escaped:', escapeAnsi(String(result3)));

// Additional test to show what happens without .as
console.log('\nTesting WITHOUT .as: bg.red("Red background").blue("Blue text")');
const result4 = bg.red('Red background').blue('Blue text');
console.log('Result as string:', String(result4));
console.log('Result escaped:', escapeAnsi(String(result4)));
console.log('Notice: Only blue text is shown because the second .blue overrides the first bg.red');

// More complex chaining example
console.log('\nTesting complex chain: bg.red("Red bg").as.blue("Blue text").as.bg.green("Green bg")');
const result5 = bg.red('Red bg').as.blue('Blue text').as.bg.green('Green bg');
console.log('Result as string:', String(result5));
console.log('Result escaped:', escapeAnsi(String(result5)));

// Show the difference between chaining with and without .as
console.log('\n=== Comparison: With vs Without .as ===');
console.log('With .as:');
console.log('  bg.red("Red bg").as.blue("Blue text") =>', bg.red('Red bg').as.blue('Blue text'));
console.log('Without .as:');
console.log('  bg.red("Red bg").blue("Blue text") =>', bg.red('Red bg').blue('Blue text'));

console.log('\n=== Test Complete ===\n');