// Detailed debug of space codes
import './dist/plugins/core.mjs';
import './dist/plugins/space.mjs';
import { c as createStyler } from './dist/styler-B4mbBy4I.js';

console.log('=== Detailed Debug of Space Codes ===\n');

const crayon = createStyler();

// Step 1: Create space mode styler
console.log('Step 1: crayon.as');
const spaceStyler = crayon.as;
console.log('  String:', JSON.stringify(spaceStyler.toString()));
console.log('');

// Step 2: Add red text
console.log('Step 2: spaceStyler.red("Red")');
const redStyler = spaceStyler.red('Red');
console.log('  String:', JSON.stringify(redStyler.toString()));
console.log('');

// Step 3: Chain blue text
console.log('Step 3: redStyler.blue("Blue")');
const blueStyler = redStyler.blue('Blue');
console.log('  String:', JSON.stringify(blueStyler.toString()));
console.log('');

// Let's also test what happens without space mode
console.log('=== Comparison without space mode ===');
const normalRed = crayon.red('Red');
const normalBlue = normalRed.blue('Blue');
console.log('Normal chaining:', JSON.stringify(normalBlue.toString()));