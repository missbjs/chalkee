process.env.FORCE_COLOR = '1';

import crayon from './dist/index.mjs';
import { escapeAnsi } from './dist/index.mjs';

console.log('=== Testing Regular Color Chaining ===\n');

// Test regular color chaining
console.log('Regular chaining: crayon.red("Red").as.blue("Blue")');
const regular = crayon.red('Red').as.blue('Blue');
console.log('  Result:', JSON.stringify(regular.toString()));
console.log('  Escaped:', escapeAnsi(regular.toString()));

// Test with modifiers
console.log('\nWith modifiers: crayon.bold("Bold").as.underline("Underline")');
const withModifiers = crayon.bold('Bold').as.underline('Underline');
console.log('  Result:', JSON.stringify(withModifiers.toString()));
console.log('  Escaped:', escapeAnsi(withModifiers.toString()));

// Test template literals
console.log('\nTemplate literals: crayon.red`Red`.as.blue`Blue`');
const template = crayon.red`Red`.as.blue`Blue`;
console.log('  Result:', JSON.stringify(template.toString()));
console.log('  Escaped:', escapeAnsi(template.toString()));