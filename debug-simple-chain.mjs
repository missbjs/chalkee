// Simple debug of chaining
import './dist/plugins/core.mjs';
import './dist/plugins/space.mjs';
import { c as createStyler } from './dist/styler-B4mbBy4I.js';

console.log('=== Simple Chaining Debug ===\n');

const crayon = createStyler();

// Test 1: Normal chaining
console.log('Test 1: Normal chaining');
const normal = crayon.red('Red').blue('Blue');
console.log('  Result:', JSON.stringify(normal.toString()));
console.log('');

// Test 2: Space chaining
console.log('Test 2: Space chaining');
const space = crayon.as.red('Red').blue('Blue');
console.log('  Result:', JSON.stringify(space.toString()));
console.log('');

// Test 3: Let's see what properties exist
console.log('Test 3: Property inspection');
console.log('  crayon.as exists:', 'as' in crayon);
console.log('  crayon.red exists:', 'red' in crayon);
console.log('  crayon.as.red exists:', 'red' in crayon.as);