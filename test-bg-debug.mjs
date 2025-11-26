// Debug the bg plugin behavior
import './dist/plugins/core.mjs';
import './dist/plugins/bg.mjs';
import './dist/plugins/space.mjs';
import { c as createStyler, e as escapeAnsi } from './dist/styler-B4mbBy4I.js';

console.log('=== Background Plugin Debug ===\n');

const crayon = createStyler();

// Step by step debugging of bg.red
console.log('Step 1: crayon.bg');
const step1 = crayon.bg;
console.log('Type:', typeof step1);
console.log('String:', String(step1));
console.log('Escaped:', escapeAnsi(String(step1)));
console.log('');

console.log('Step 2: crayon.bg.red');
const step2 = crayon.bg.red;
console.log('Type:', typeof step2);
console.log('String:', String(step2));
console.log('Escaped:', escapeAnsi(String(step2)));
console.log('');

console.log('Step 3: crayon.bg.red("Red Background")');
const step3 = crayon.bg.red('Red Background');
console.log('Type:', typeof step3);
console.log('String:', String(step3));
console.log('Escaped:', escapeAnsi(String(step3)));
console.log('');

console.log('Step 4: crayon.bg.red("Red Background").as');
const step4 = crayon.bg.red('Red Background').as;
console.log('Type:', typeof step4);
console.log('String:', String(step4));
console.log('Escaped:', escapeAnsi(String(step4)));
console.log('');

console.log('Step 5: crayon.bg.red("Red Background").as.blue');
const step5 = crayon.bg.red('Red Background').as.blue;
console.log('Type:', typeof step5);
console.log('String:', String(step5));
console.log('Escaped:', escapeAnsi(String(step5)));
console.log('');

console.log('Step 6: crayon.bg.red("Red Background").as.blue("Blue Text")');
const step6 = crayon.bg.red('Red Background').as.blue('Blue Text');
console.log('Type:', typeof step6);
console.log('String:', String(step6));
console.log('Escaped:', escapeAnsi(String(step6)));
console.log('');

// Let's also test direct background colors
console.log('=== Direct Background Colors ===\n');
console.log('crayon.bgRed("Direct Red Background")');
const directBg = crayon.bgRed('Direct Red Background');
console.log('String:', String(directBg));
console.log('Escaped:', escapeAnsi(String(directBg)));
console.log('');

// Test the space plugin
console.log('=== Space Plugin Test ===\n');
console.log('crayon.red("Red").as.blue("Blue")');
const spaceTest = crayon.red('Red').as.blue('Blue');
console.log('String:', String(spaceTest));
console.log('Escaped:', escapeAnsi(String(spaceTest)));
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

console.log('Final result with readable codes:');
console.log(showAnsiCodes(String(step6)));

console.log('\nDirect background result with readable codes:');
console.log(showAnsiCodes(String(directBg)));

console.log('\nSpace test result with readable codes:');
console.log(showAnsiCodes(String(spaceTest)));