// Debug the chaining functionality to understand what's happening
import './dist/plugins/core.mjs';
import './dist/plugins/bg.mjs';
import './dist/plugins/space.mjs';
import { c as createStyler } from './dist/styler-B4mbBy4I.js';

console.log('Debugging chaining functionality...');

// Create a styler instance
const crayon = createStyler();

// Step by step debugging
console.log('\n=== Step 1: crayon.bg ===');
try {
    const step1 = crayon.bg;
    console.log('Type:', typeof step1);
    console.log('String:', String(step1));
} catch (error) {
    console.error('Error:', error);
}

console.log('\n=== Step 2: crayon.bg.red ===');
try {
    const step2 = crayon.bg.red;
    console.log('Type:', typeof step2);
    console.log('String:', String(step2));
} catch (error) {
    console.error('Error:', error);
}

console.log('\n=== Step 3: crayon.bg.red("Red background") ===');
try {
    const step3 = crayon.bg.red('Red background');
    console.log('Type:', typeof step3);
    console.log('String:', String(step3));
    console.log('Accumulated text should be "Red background"');
} catch (error) {
    console.error('Error:', error);
}

console.log('\n=== Step 4: crayon.bg.red("Red background").as ===');
try {
    const step3 = crayon.bg.red('Red background');
    const step4 = step3.as;
    console.log('Type:', typeof step4);
    console.log('String:', String(step4));
} catch (error) {
    console.error('Error:', error);
}

console.log('\n=== Step 5: crayon.bg.red("Red background").as.blue ===');
try {
    const step3 = crayon.bg.red('Red background');
    const step5 = step3.as.blue;
    console.log('Type:', typeof step5);
    console.log('String:', String(step5));
} catch (error) {
    console.error('Error:', error);
}

console.log('\n=== Full chain: crayon.bg.red("Red background").as.blue("Blue text") ===');
try {
    const result = crayon.bg.red('Red background').as.blue('Blue text');
    console.log('Final result type:', typeof result);
    console.log('Final result string:', String(result));
    console.log('Expected: "Red background Blue text"');
} catch (error) {
    console.error('Error:', error);
}