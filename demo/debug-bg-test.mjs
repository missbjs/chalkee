process.env.FORCE_COLOR = '1';

import crayon from '../dist/index.mjs';
import { escapeAnsi } from '../dist/index.mjs';

// Let's debug what's happening step by step
console.log('=== Debug Background Test ===');

// Step 1: Create a red background
const redBg = crayon.bg.red('Red background');
console.log('redBg:', redBg);
console.log('redBg.toString():', redBg.toString());

// Step 2: Chain with .as
const chained = redBg.as;
console.log('chained:', chained);

// Step 3: Add blue background
const result = chained.bg.blue('Blue background');
console.log('result:', result);
console.log('result.toString():', result.toString());

// Let's also try the direct approach
console.log('\n=== Direct Approach ===');
const directResult = crayon.bg.red('Red background').as.bg.blue('Blue background');
console.log('directResult:', directResult);
console.log('directResult.toString():', directResult.toString());
console.log('directResult (escaped):', escapeAnsi(directResult.toString()));