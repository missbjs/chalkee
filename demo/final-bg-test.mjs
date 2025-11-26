process.env.FORCE_COLOR = '1';

import crayon from '../dist/index.mjs';
import { escapeAnsi } from '../dist/index.mjs';

console.log('=== Final Background Chaining Test ===\n');

// This is what we're testing from the original file (lines 9-11)
console.log('Original test case from test-bg-chaining.mjs:');
console.log('Code: bg.red("Red background").as.bg.blue("Blue background")');

const result = crayon.bg.red('Red background').as.bg.blue('Blue background');
console.log('Actual result:', String(result));
console.log('Escaped result:', escapeAnsi(String(result)));

console.log('\n=== Expected Behavior Analysis ===');
console.log('Based on the code analysis, the .as operator should:');
console.log('1. Terminate the bg-mode (background color mode)');
console.log('2. Allow chaining with regular (foreground) colors');
console.log('3. Insert a space between the two segments');

console.log('\n=== What Should Happen ===');
console.log('The result should show:');
console.log('- "Red background" with red background color');
console.log('- A space');
console.log('- "Blue background" with blue foreground color (no background)');

console.log('\n=== Actual Behavior ===');
console.log('Currently, only the last segment is shown:');
console.log('- "Blue background" with blue foreground color (no background)');
console.log('- The first segment ("Red background") is lost');

console.log('\n=== Conclusion ===');
console.log('There appears to be an issue with the background chaining implementation.');
console.log('The .as operator is not properly preserving the accumulated text from previous segments.');