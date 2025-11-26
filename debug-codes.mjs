// Debug how codes are preserved
import './dist/plugins/core.mjs';
import './dist/plugins/space.mjs';
import { c as createStyler, e as escapeAnsi } from './dist/styler-B4mbBy4I.js';

console.log('=== Debugging Code Preservation ===\n');

const crayon = createStyler();

// Create a space mode styler
console.log('Creating crayon.as:');
const spaceStyler = crayon.as;
console.log('  Type:', typeof spaceStyler);
console.log('  Has codes property:', 'codes' in spaceStyler);
console.log('  String:', spaceStyler.toString());
console.log('');

// Add red text to space mode
console.log('Adding red text to space mode:');
const redText = spaceStyler.red('Red');
console.log('  Type:', typeof redText);
console.log('  Has codes property:', 'codes' in redText);
console.log('  String:', redText.toString());
console.log('');

// Chain blue text
console.log('Chaining blue text:');
const blueText = redText.blue('Blue');
console.log('  Type:', typeof blueText);
console.log('  Has codes property:', 'codes' in blueText);
console.log('  String:', blueText.toString());
console.log('  Escaped:', escapeAnsi(blueText.toString()));