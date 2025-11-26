// First import the plugins to register them
import './dist/plugins/modifiers.mjs';
import './dist/plugins/core.mjs';
import './dist/plugins/ext-colors.mjs';
import './dist/plugins/bg.mjs';
import './dist/plugins/util.mjs';

// Then import the styler
import { c as createStyler } from './dist/styler-BvFvHSCa.js';

console.log('Creating styler...');
const styler = createStyler();
console.log('Styler created:', styler);
console.log('Type of styler:', typeof styler);
console.log('Has blue property:', 'blue' in styler);
console.log('Blue property:', styler.blue);
console.log('Type of blue:', typeof styler.blue);