// Debug the chaining process
import './dist/plugins/core.mjs';
import './dist/plugins/space.mjs';
import { c as createStyler } from './dist/styler-B4mbBy4I.js';

console.log('=== Debug Chaining Process ===\n');

const crayon = createStyler();

// Create space mode styler
console.log('1. crayon.as');
const spaceStyler = crayon.as;
console.log('  String:', JSON.stringify(spaceStyler.toString()));
console.log('');

// Add red text - this should preserve space mode
console.log('2. spaceStyler.red("Red")');
const redStyler = spaceStyler.red('Red');
console.log('  String:', JSON.stringify(redStyler.toString()));
console.log('');

// Chain blue text - this should trigger space processing
console.log('3. redStyler.blue("Blue")');
const blueStyler = redStyler.blue('Blue');
console.log('  String:', JSON.stringify(blueStyler.toString()));
console.log('');

// Let's also check what the accumulated text looks like at each step
console.log('=== Accumulated Text Debug ===');
console.log('spaceStyler accumulated text:', JSON.stringify(spaceStyler.toString()));
console.log('redStyler accumulated text:', JSON.stringify(redStyler.toString()));
console.log('blueStyler accumulated text:', JSON.stringify(blueStyler.toString()));