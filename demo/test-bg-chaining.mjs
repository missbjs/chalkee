process.env.FORCE_COLOR = '1';

import { bg, bgRed, bgBlue } from './dist/index.mjs';

console.log('\n=== Testing Corrected bg Chaining ===\n');

// Test the corrected example
console.log('Testing: bg.red("Red background").as.bg.blue("Blue background")');
const result1 = bg.red('Red background').as.bg.blue('Blue background');
console.log('Result as string:', JSON.stringify(String(result1)));
console.log('Expected: red bg for first part, blue bg for second part');

// Test with regular bgRed/bgBlue functions
console.log('\nTesting: bgRed("Red background").as.bgBlue("Blue background")');
const result2 = bgRed('Red background').as.bgBlue('Blue background');
console.log('Result as string:', JSON.stringify(String(result2)));

// Test template literal syntax
console.log('\nTesting: bg.red`Red background`.as.bg.blue`Blue background`');
const result3 = bg.red`Red background`.as.bg.blue`Blue background`;
console.log('Result as string:', JSON.stringify(String(result3)));

console.log('\n=== Test Complete ===\n');