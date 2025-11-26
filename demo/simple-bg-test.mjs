process.env.FORCE_COLOR = '1';

import crayon from '../dist/index.mjs';
import { escapeAnsi } from '../dist/index.mjs';

console.log('=== Simple Background Test ===');

// Test 1: Basic background colors
console.log('Red background:', crayon.bgRed('Red background'));
console.log('Blue background:', crayon.bgBlue('Blue background'));

// Test 2: Using the bg namespace
console.log('bg.red:', crayon.bg.red('Red background'));
console.log('bg.blue:', crayon.bg.blue('Blue background'));

// Test 3: Chaining with .as
console.log('Chaining with .as:');
console.log('bg.red("Red").as.bg.blue("Blue"):', crayon.bg.red('Red').as.bg.blue('Blue'));

// Test 4: Compare with and without .as
console.log('\nComparison:');
console.log('With .as:', crayon.bg.red('Red').as.bg.blue('Blue'));
console.log('Without .as:', crayon.bg.red('Red').bg.blue('Blue'));

// Test 5: Escaped versions
console.log('\nEscaped versions:');
console.log('With .as (escaped):', escapeAnsi(String(crayon.bg.red('Red').as.bg.blue('Blue'))));
console.log('Without .as (escaped):', escapeAnsi(String(crayon.bg.red('Red').bg.blue('Blue'))));