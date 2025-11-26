// Test basic .as functionality
import './dist/plugins/core.mjs';
import './dist/plugins/space.mjs';
import './dist/plugins/bg.mjs';
import { c as createStyler, e as escapeAnsi } from './dist/styler-B4mbBy4I.js';

console.log('=== Testing Basic .as Functionality ===\n');

const crayon = createStyler();

console.log('Basic test: crayon.as.red("Red").blue("Blue")');
// This should create a styler in space mode, then add red "Red", then add blue "Blue"
const basic = crayon.as.red('Red').blue('Blue');
console.log('  Result (human):', basic.toString());
console.log('  Result (JSON):', JSON.stringify(basic.toString()));
console.log('  Escaped (computer):', escapeAnsi(basic.toString()));
console.log('  JSON === Escaped:', JSON.stringify(basic.toString()) === escapeAnsi(basic.toString()));
console.log('');

// Test with background colors
console.log('Background test: crayon.as.bg.red("Red BG").blue("Blue Text")');
const bgTest = crayon.as.bg.red('Red BG').blue('Blue Text');
console.log('  Result (human):', bgTest.toString());
console.log('  Result (JSON):', JSON.stringify(bgTest.toString()));
console.log('  Escaped (computer):', escapeAnsi(bgTest.toString()));
console.log('  JSON === Escaped:', JSON.stringify(bgTest.toString()) === escapeAnsi(bgTest.toString()));
console.log('');

// Test the original issue case
console.log('Original issue: crayon.bg.red("Red Background").as.blue("Blue Text")');
const originalIssue = crayon.bg.red('Red Background').as.blue('Blue Text');
console.log('  Result (human):', originalIssue.toString());
console.log('  Result (JSON):', JSON.stringify(originalIssue.toString()));
console.log('  Escaped (computer):', escapeAnsi(originalIssue.toString()));
console.log('  JSON === Escaped:', JSON.stringify(originalIssue.toString()) === escapeAnsi(originalIssue.toString()));
console.log('');

// Verification
const originalIssueString = originalIssue.toString();
if (originalIssueString.includes('Red Background') && originalIssueString.includes('Blue Text')) {
    console.log('✅ SUCCESS: Both segments are present in the result');
} else {
    console.log('❌ FAILURE: Missing segments in the result');
}