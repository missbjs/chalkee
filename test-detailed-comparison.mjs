// Detailed test script to show actual ANSI codes generated
import './dist/plugins/core.mjs';
import './dist/plugins/modifiers.mjs';
import './dist/plugins/bg.mjs';
import './dist/plugins/space.mjs';
import { c as createStyler, e as escapeAnsi } from './dist/styler-B4mbBy4I.js';

console.log('=== Detailed ANSI Code Analysis ===\n');

const crayon = createStyler();

// Helper function to show both raw and escaped versions
function analyzeResult(name, result) {
    const raw = String(result);
    const escaped = escapeAnsi(raw);
    console.log(`${name}:`);
    console.log(`  Raw: "${raw}"`);
    console.log(`  Escaped: "${escaped}"`);
    console.log(`  Length: ${raw.length}`);
    console.log('');
    return { raw, escaped };
}

// Test basic styling
console.log('--- Basic Styling ---');
analyzeResult('crayon.red("Hello")', crayon.red('Hello'));
analyzeResult('crayon.blue("World")', crayon.blue('World'));

// Test chaining
console.log('--- Style Chaining ---');
analyzeResult('crayon.red.bold("Bold Red")', crayon.red.bold('Bold Red'));
analyzeResult('crayon.blue.underline("Underline Blue")', crayon.blue.underline('Underline Blue'));

// Test background colors
console.log('--- Background Colors ---');
analyzeResult('crayon.bg.red("Red Background")', crayon.bg.red('Red Background'));
analyzeResult('crayon.bg.blue("Blue Background")', crayon.bg.blue('Blue Background'));

// Test background chaining with space
console.log('--- Background Chaining with Space ---');
const bgResult = crayon.bg.red('Red Background').as.blue('Blue Text');
const bgAnalysis = analyzeResult('crayon.bg.red("Red Background").as.blue("Blue Text")', bgResult);

// Let's also test what the individual parts look like
console.log('--- Individual Parts Analysis ---');
const part1 = crayon.bg.red('Red Background');
const part2 = crayon.blue('Blue Text');

analyzeResult('Part 1: crayon.bg.red("Red Background")', part1);
analyzeResult('Part 2: crayon.blue("Blue Text")', part2);

// Show the actual ANSI codes in a more readable format
console.log('--- Raw ANSI Code Display ---');
function showAnsiCodes(str) {
    // Replace common ANSI codes with readable names
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

console.log('Background chaining result with readable codes:');
console.log(showAnsiCodes(bgAnalysis.raw));

console.log('\n=== Template Literal Tests ===\n');

// Template literal tests
analyzeResult('crayon.red`Hello ${"World"}`', crayon.red`Hello ${"World"}`);
analyzeResult('crayon.bold`Bold ${"Text"} Here`', crayon.bold`Bold ${"Text"} Here`);

console.log('=== Verification Tests ===\n');

// Verify that both segments are present
const bgResultString = String(bgResult);
if (bgResultString.includes('Red Background') && bgResultString.includes('Blue Text')) {
    console.log('✅ SUCCESS: Both segments are present in background chaining result');
} else {
    console.log('❌ FAILURE: Missing segments in background chaining result');
}

console.log('\nTest completed.');