// Comprehensive test comparing expected vs actual results
import './dist/plugins/core.mjs';
import './dist/plugins/space.mjs';
import './dist/plugins/bg.mjs';
import { c as createStyler, e as escapeAnsi } from './dist/styler-B4mbBy4I.js';

console.log('=== Comprehensive Test: Expected vs Actual ===\n');

const crayon = createStyler();

// Test cases with expected results
const testCases = [
    {
        name: 'Basic space chaining',
        operation: () => crayon.as.red('Red').blue('Blue'),
        expectedHuman: 'Red Blue', // With space
        expectedEscaped: '\\x1b[31mRed\\x1b[39m \\x1b[34mBlue\\x1b[39m'
    },
    {
        name: 'Background chaining',
        operation: () => crayon.bg.red('Red Background').as.blue('Blue Text'),
        expectedHuman: 'Red Background Blue Text', // With space
        expectedEscaped: '\\x1b[41mRed Background\\x1b[49m \\x1b[34mBlue Text\\x1b[39m'
    },
    {
        name: 'Direct background chaining',
        operation: () => crayon.as.bgRed('Red BG').blue('Blue Text'),
        expectedHuman: 'Red BG Blue Text', // With space
        expectedEscaped: '\\x1b[41mRed BG\\x1b[49m \\x1b[34mBlue Text\\x1b[39m'
    }
];

testCases.forEach((testCase, index) => {
    console.log(`Test ${index + 1}: ${testCase.name}`);

    try {
        const result = testCase.operation();
        const actualHuman = result.toString();
        const actualEscaped = escapeAnsi(actualHuman);

        console.log(`  Actual (human):   "${actualHuman}"`);
        console.log(`  Expected (human): "${testCase.expectedHuman}"`);
        console.log(`  Human match: ${actualHuman === testCase.expectedHuman ? '✅ PASS' : '❌ FAIL'}`);

        console.log(`  Actual (escaped): "${actualEscaped}"`);
        console.log(`  Expected (escaped): "${testCase.expectedEscaped}"`);
        console.log(`  Escaped match: ${actualEscaped === testCase.expectedEscaped ? '✅ PASS' : '❌ FAIL'}`);

        // Check if both segments are present
        const segments = testCase.expectedHuman.split(' ');
        let allSegmentsPresent = true;
        for (const segment of segments) {
            if (!actualHuman.includes(segment)) {
                allSegmentsPresent = false;
                break;
            }
        }

        console.log(`  Segments present: ${allSegmentsPresent ? '✅ PASS' : '❌ FAIL'}`);

    } catch (error) {
        console.log(`  Error: ${error.message}`);
    }

    console.log('');
});

// Show the readable ANSI codes to understand what's actually happening
console.log('=== Readable ANSI Code Analysis ===\n');

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

const result1 = crayon.as.red('Red').blue('Blue');
const result2 = crayon.bg.red('Red Background').as.blue('Blue Text');

console.log('Test 1 result with readable codes:');
console.log(showAnsiCodes(result1.toString()));
console.log('');

console.log('Test 2 result with readable codes:');
console.log(showAnsiCodes(result2.toString()));
console.log('');

console.log('Expected Test 1 with readable codes:');
console.log('[RED]Red[/FG] [BLUE]Blue[/FG]');
console.log('');

console.log('Expected Test 2 with readable codes:');
console.log('[BG_RED]Red Background[/BG] [BLUE]Blue Text[/FG]');
console.log('');