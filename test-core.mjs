import { b as registerCodes, S as Styler, d as createStylerProperty, c as createStyler, r as register } from "./dist/styler-BvFvHSCa.js";

console.log('createStyler type:', typeof createStyler);
console.log('Styler type:', typeof Styler);

// Test the createStylerProperty function directly
const testCode = { open: '\x1b[31m', close: '\x1b[39m' };
const property = createStylerProperty(testCode, { createStyler });

console.log('Property descriptor:', property);
console.log('Property get function:', property.get);

// Try to call the getter
try {
    const result = property.get();
    console.log('Getter result:', result);
    console.log('Type of result:', typeof result);
} catch (error) {
    console.error('Error calling getter:', error);
}