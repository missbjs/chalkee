// Test the new callable class implementation
import './dist/plugins/core.mjs';
import { c as createStyler } from './dist/styler-B4mbBy4I.js';

console.log('Testing callable class implementation...');

// Create a styler instance
const styler = createStyler();
console.log('Styler created:', styler);
console.log('Type of styler:', typeof styler);
console.log('Is styler callable?', typeof styler === 'function');

// Test calling the styler as a function
try {
  const result = styler('test text');
  console.log('Called styler as function:', result);
  console.log('String representation:', String(result));
} catch (error) {
  console.error('Error calling styler as function:', error);
}

// Test chaining with properties
try {
  const redResult = styler.red('red text');
  console.log('Red text result:', redResult);
  console.log('String representation:', String(redResult));
} catch (error) {
  console.error('Error with red property:', error);
}

// Test method access
try {
  console.log('toString method:', styler.toString());
  console.log('valueOf method:', styler.valueOf());
} catch (error) {
  console.error('Error accessing methods:', error);
}

console.log('Test completed.');