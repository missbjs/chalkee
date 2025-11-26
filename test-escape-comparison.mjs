// Test script to compare styled text with escaped codes
import './dist/plugins/core.mjs';
import './dist/plugins/modifiers.mjs';
import './dist/plugins/bg.mjs';
import './dist/plugins/space.mjs';
import { c as createStyler, e as escapeAnsi } from './dist/styler-B4mbBy4I.js';

console.log('=== Testing Styled Text vs Escaped Codes ===\n');

const crayon = createStyler();

// Test cases
const testCases = [
    {
        name: 'Basic red text',
        styled: () => crayon.red('Hello World'),
        expected: '\x1b[31mHello World\x1b[39m'
    },
    {
        name: 'Chained styles',
        styled: () => crayon.red.bold('Bold Red Text'),
        expected: '\x1b[31m\x1b[1mBold Red Text\x1b[22m\x1b[39m'
    },
    {
        name: 'Background styling',
        styled: () => crayon.bg.blue('Blue Background'),
        expected: '\x1b[44mBlue Background\x1b[49m'
    },
    {
        name: 'Complex chaining',
        styled: () => crayon.blue.bold.underline('Blue Bold Underline'),
        expected: '\x1b[34m\x1b[1m\x1b[4mBlue Bold Underline\x1b[24m\x1b[22m\x1b[39m'
    },
    {
        name: 'Background chaining with space',
        styled: () => crayon.bg.red('Red Background').as.blue('Blue Text'),
        expected: '\x1b[41mRed Background\x1b[49m \x1b[34mBlue Text\x1b[39m'
    }
];

// Run tests
testCases.forEach((testCase, index) => {
    console.log(`Test ${index + 1}: ${testCase.name}`);

    try {
        const result = testCase.styled();
        const resultString = String(result);
        const escapedResult = escapeAnsi(resultString);
        const escapedExpected = escapeAnsi(testCase.expected);

        console.log(`  Styled result: ${resultString}`);
        console.log(`  Escaped result: ${escapedResult}`);
        console.log(`  Expected: ${testCase.expected}`);
        console.log(`  Escaped expected: ${escapedExpected}`);

        // Compare the actual ANSI codes
        const match = resultString === testCase.expected;
        console.log(`  Match: ${match ? '✅ PASS' : '❌ FAIL'}`);

        if (!match) {
            console.log(`  Length diff: ${resultString.length} vs ${testCase.expected.length}`);
        }

    } catch (error) {
        console.log(`  Error: ${error.message}`);
    }

    console.log('');
});

console.log('=== Template Literal Tests ===\n');

// Template literal tests
const templateTests = [
    {
        name: 'Red template literal',
        styled: () => crayon.red`Hello ${'World'}`,
        expected: '\x1b[31mHello World\x1b[39m'
    },
    {
        name: 'Bold template literal',
        styled: () => crayon.bold`Bold ${'Text'} Here`,
        expected: '\x1b[1mBold Text Here\x1b[22m'
    }
];

templateTests.forEach((test, index) => {
    console.log(`Template Test ${index + 1}: ${test.name}`);

    try {
        const result = test.styled();
        const resultString = String(result);
        const escapedResult = escapeAnsi(resultString);
        const escapedExpected = escapeAnsi(test.expected);

        console.log(`  Styled result: ${resultString}`);
        console.log(`  Escaped result: ${escapedResult}`);
        console.log(`  Expected: ${test.expected}`);
        console.log(`  Escaped expected: ${escapedExpected}`);

        // Compare the actual ANSI codes
        const match = resultString === test.expected;
        console.log(`  Match: ${match ? '✅ PASS' : '❌ FAIL'}`);

    } catch (error) {
        console.log(`  Error: ${error.message}`);
    }

    console.log('');
});