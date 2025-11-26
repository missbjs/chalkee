// Import the core plugin (this will define properties on Styler.prototype)
import './dist/plugins/core.mjs';
// Import the modifiers plugin (this will define more properties on Styler.prototype)
import './dist/plugins/modifiers.mjs';

// Import the styler
import { c as createStyler, S as Styler } from './dist/styler-BvFvHSCa.js';

// Create a styler instance
const styler = createStyler();

// Test chaining
console.log('Testing chaining...');
try {
    const result = styler.red.bold('test');
    console.log('Red bold result:', result);
    console.log('Type of result:', typeof result);
} catch (error) {
    console.error('Error with red.bold:', error);
}

// Test more complex chaining
try {
    const result = styler.red.bold.underline('test');
    console.log('Red bold underline result:', result);
} catch (error) {
    console.error('Error with red.bold.underline:', error);
}