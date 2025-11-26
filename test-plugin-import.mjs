// Import the core plugin
import './dist/plugins/core.mjs';

// Import the styler
import { c as createStyler } from './dist/styler-BvFvHSCa.js';

// Create a styler instance
const testStyler = createStyler();

console.log('Styler created:', testStyler);
console.log('Has red property:', 'red' in testStyler);
console.log('Red property:', testStyler.red);
console.log('Type of red:', typeof testStyler.red);

// Try to use the red property
try {
  const result = testStyler.red('test');
  console.log('Red result:', result);
} catch (error) {
  console.error('Error using red:', error);
}
