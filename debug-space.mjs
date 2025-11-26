// Debug space mode detection
import './dist/plugins/core.mjs';
import './dist/plugins/space.mjs';
import './dist/plugins/bg.mjs';
import { c as createStyler, e as escapeAnsi } from './dist/styler-B4mbBy4I.js';

console.log('=== Debugging Space Mode Detection ===\n');

const crayon = createStyler();

// Check what happens when we create a space mode styler
console.log('Creating crayon.as:');
const spaceStyler = crayon.as;
console.log('  Type:', typeof spaceStyler);
console.log('  String:', spaceStyler.toString());
console.log('  JSON:', JSON.stringify(spaceStyler.toString()));
console.log('');

// Check what happens when we add red text to space mode
console.log('Adding red text to space mode:');
const redText = spaceStyler.red('Red');
console.log('  Type:', typeof redText);
console.log('  String:', redText.toString());
console.log('  JSON:', JSON.stringify(redText.toString()));
console.log('');

// Check what happens when we chain blue text
console.log('Chaining blue text:');
const blueText = redText.blue('Blue');
console.log('  Type:', typeof blueText);
console.log('  String:', blueText.toString());
console.log('  JSON:', JSON.stringify(blueText.toString()));
console.log('  Escaped:', escapeAnsi(blueText.toString()));
console.log('  Expected: "Red Blue"');
console.log('  Match:', escapeAnsi(blueText.toString()) === 'Red Blue');