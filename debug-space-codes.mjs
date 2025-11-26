// Debug space codes preservation
import './dist/plugins/core.mjs';
import './dist/plugins/space.mjs';
import { c as createStyler } from './dist/styler-B4mbBy4I.js';

console.log('=== Debugging Space Codes Preservation ===\n');

const crayon = createStyler();

// Create a space mode styler
console.log('1. Creating crayon.as:');
const spaceStyler = crayon.as;
console.log('  String:', JSON.stringify(spaceStyler.toString()));
console.log('');

// Add red text to space mode
console.log('2. Adding red text to space mode:');
const redText = spaceStyler.red('Red');
console.log('  String:', JSON.stringify(redText.toString()));
console.log('');

// Chain blue text
console.log('3. Chaining blue text:');
const blueText = redText.blue('Blue');
console.log('  String:', JSON.stringify(blueText.toString()));
console.log('');

// Let's also test the expected behavior
console.log('4. Expected behavior:');
console.log('  Should be: "Red Blue"');
console.log('  Actually is:', JSON.stringify(blueText.toString()));