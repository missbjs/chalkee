// First import the styler and registry functions
import { b as registerCodes, S as Styler, d as createStylerProperty, c as createStyler, r as register } from "./dist/styler-BvFvHSCa.js";

// Define the core codes
const coreCodes = {
    red: { open: '\x1b[31m', close: '\x1b[39m' },
    blue: { open: '\x1b[34m', close: '\x1b[39m' },
    bold: { open: '\x1b[1m', close: '\x1b[22m' },
};

// Register the codes
registerCodes(coreCodes);

// Define properties on the Styler prototype
Object.defineProperties(Styler.prototype, {
    red: createStylerProperty(coreCodes.red, { createStyler }),
    blue: createStylerProperty(coreCodes.blue, { createStyler }),
    bold: createStylerProperty(coreCodes.bold, { createStyler }),
});

// Create a styler instance
const styler = createStyler();

console.log('Styler created:', styler);
console.log('Has red property:', 'red' in styler);
console.log('Red property:', styler.red);
console.log('Type of red:', typeof styler.red);

// Try to use the red property
try {
    const result = styler.red('test');
    console.log('Red result:', result);
} catch (error) {
    console.error('Error using red:', error);
}