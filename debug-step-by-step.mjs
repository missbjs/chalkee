process.env.FORCE_COLOR = '1';

import crayon from './dist/index.mjs';
import { escapeAnsi } from './dist/index.mjs';

console.log('=== Step-by-Step Debug ===\n');

// Step 1: Create a red background
console.log('Step 1: crayon.bg.red("Red background")');
const step1 = crayon.bg.red('Red background');
console.log('  Result:', JSON.stringify(String(step1)));
console.log('  Escaped:', escapeAnsi(String(step1)));

// Step 2: Add .as
console.log('\nStep 2: step1.as');
const step2 = step1.as;
console.log('  Result:', JSON.stringify(String(step2)));
console.log('  Escaped:', escapeAnsi(String(step2)));

// Step 3: Add blue text
console.log('\nStep 3: step2.blue("Blue text")');
const step3 = step2.blue('Blue text');
console.log('  Result:', JSON.stringify(String(step3)));
console.log('  Escaped:', escapeAnsi(String(step3)));

console.log('\n=== Direct Chaining ===');
const direct = crayon.bg.red('Red background').as.blue('Blue text');
console.log('Direct result:', JSON.stringify(String(direct)));
console.log('Direct escaped:', escapeAnsi(String(direct)));