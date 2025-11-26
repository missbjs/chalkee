// Debug the processText function
import './dist/plugins/core.mjs';
import './dist/plugins/bg.mjs';
import './dist/plugins/space.mjs';
import { c as createStyler, e as escapeAnsi } from './dist/styler-B4mbBy4I.js';

// Let's manually test the processText function
import { processText, registeredCodes } from './dist/registry-D7-N_KSq.js';

console.log('=== Testing processText Function ===\n');

// Test space mode processing
const SPACE_MARKER = '\x00AS\x00';
const spaceCode = { open: SPACE_MARKER, close: '' };
const blueCode = registeredCodes.blue;

console.log('Testing space mode processing:');
console.log('Codes:', [spaceCode, blueCode]);
console.log('Text: "Blue Text"');
console.log('Accumulated text: "Red Background"');

const result = processText([spaceCode, blueCode], 'Blue Text', 'Red Background');
console.log('ProcessText result:', result);
console.log('');

// Test with just blue code (no space mode)
console.log('Testing normal processing:');
const normalResult = processText([blueCode], 'Blue Text', 'Red Background');
console.log('ProcessText result:', normalResult);
console.log('');

// Now test with the actual crayon library
console.log('=== Testing with Crayon Library ===\n');

const crayon = createStyler();

// Test space plugin directly
console.log('Creating space mode styler:');
const spaceStyler = crayon.as;
console.log('Space styler string:', String(spaceStyler));
console.log('Space styler escaped:', escapeAnsi(String(spaceStyler)));
console.log('');

// Test chaining with space
console.log('Testing red("Red").as.blue("Blue"):');
const chainResult = crayon.red('Red').as.blue('Blue');
console.log('Chain result string:', String(chainResult));
console.log('Chain result escaped:', escapeAnsi(String(chainResult)));
console.log('');

// Show readable ANSI codes
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

console.log('Chain result with readable codes:');
console.log(showAnsiCodes(String(chainResult)));