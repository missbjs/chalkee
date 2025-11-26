// Debug the processText method step by step
import './dist/plugins/core.mjs';
import './dist/plugins/space.mjs';
import './dist/plugins/bg.mjs';
import { c as createStyler, e as escapeAnsi } from './dist/styler-B4mbBy4I.js';

// Import registry functions to test them directly
import { processText, filterMarkerCodes, registeredCodes, plugins } from './dist/registry-D7-N_KSq.js';

console.log('=== Debugging processText Method ===\n');

// Check what plugins are registered
console.log('Registered plugins:');
plugins.forEach((plugin, index) => {
    console.log(`  ${index + 1}. ${plugin.name} - handleProperty: ${!!plugin.handleProperty}, processText: ${!!plugin.processText}, isMarkerCode: ${!!plugin.isMarkerCode}`);
});
console.log('');

// Test the space marker
const SPACE_MARKER = '\x00AS\x00';
const spaceCode = { open: SPACE_MARKER, close: '' };
const redCode = registeredCodes.red;

console.log('Testing space mode detection:');
console.log('Codes array:', [spaceCode, redCode]);
const hasSpaceMode = [spaceCode, redCode].some(code => code.open === SPACE_MARKER);
console.log('Has space mode:', hasSpaceMode);
console.log('');

// Test filterMarkerCodes
console.log('Testing filterMarkerCodes:');
const filteredCodes = filterMarkerCodes([spaceCode, redCode]);
console.log('Original codes:', [spaceCode, redCode]);
console.log('Filtered codes:', filteredCodes);
console.log('');

// Test processText directly
console.log('Testing processText directly:');
const processResult = processText([spaceCode, redCode], 'Red Text', 'Previous Text');
console.log('ProcessText result:', processResult);
console.log('');

// Test without space mode
console.log('Testing processText without space mode:');
const processResult2 = processText([redCode], 'Red Text', 'Previous Text');
console.log('ProcessText result:', processResult2);
console.log('');

// Now test with the actual crayon library step by step
console.log('=== Testing Crayon Library Step by Step ===\n');

const crayon = createStyler();

// Step 1: Create space mode
console.log('Step 1: crayon.as');
const spaceStyler = crayon.as;
console.log('Space styler string:', JSON.stringify(spaceStyler.toString()));
console.log('');

// Step 2: Add red text
console.log('Step 2: crayon.as.red("Red")');
const redResult = spaceStyler.red('Red');
console.log('Red result string:', JSON.stringify(redResult.toString()));
console.log('');

// Step 3: Add blue text
console.log('Step 3: crayon.as.red("Red").blue("Blue")');
const blueResult = redResult.blue('Blue');
console.log('Blue result string:', JSON.stringify(blueResult.toString()));
console.log('');

// Show the actual ANSI codes
function showAnsiCodes(str) {
    return str
        .replace(/\x1b\[31m/g, '[RED]')
        .replace(/\x1b\[34m/g, '[BLUE]')
        .replace(/\x1b\[41m/g, '[BG_RED]')
        .replace(/\x1b\[44m/g, '[BG_BLUE]')
        .replace(/\x1b\[1m/g, '[BOLD]')
        .replace(/\x1b\[4m/g, '[UNDERLINE]')
        .replace(/\x1b\[39m/g, '[/FG]')
        .replace(/\x1b\[49m/g, '[/BG]')
        .replace(/\x1b\[22m/g, '[/BOLD]')
        .replace(/\x1b\[24m/g, '[/UNDERLINE]');
}

console.log('Final result with readable codes:');
console.log(showAnsiCodes(blueResult.toString()));