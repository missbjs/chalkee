// Import the core plugin
import './dist/plugins/core.mjs';

// Import the styler
import { c as createStyler, d as createStylerProperty } from './dist/styler-BvFvHSCa.js';

// Create a test property to see what's happening
const testCode = { open: '\x1b[31m', close: '\x1b[39m' };
const testProperty = createStylerProperty(testCode, { createStyler });

console.log('Test property options:', { createStyler });
console.log('Test property getter:', testProperty.get);

// Create a styler instance
const styler = createStyler();

console.log('Styler instance:', styler);

// Access the test property on the styler instance
console.log('Accessing test property on styler...');
try {
    const result = testProperty.get.call(styler);
    console.log('Test property result:', result);
} catch (error) {
    console.error('Error accessing test property:', error);
}

// Now create a chained styler instance (like crayon.red would return)
const chainedStyler = styler.red;
console.log('Chained styler:', chainedStyler);

// Access the test property on the chained styler instance
console.log('Accessing test property on chained styler...');
try {
    const result = testProperty.get.call(chainedStyler);
    console.log('Test property result on chained styler:', result);
} catch (error) {
    console.error('Error accessing test property on chained styler:', error);
}