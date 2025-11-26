// Test exact escaped format
import './dist/plugins/core.mjs';
import './dist/plugins/space.mjs';
import './dist/plugins/bg.mjs';
import { c as createStyler, e as escapeAnsi } from './dist/styler-B4mbBy4I.js';

console.log('=== Testing Exact Escaped Format ===\n');

const crayon = createStyler();

// Test basic red text
const redText = crayon.red('Red');
console.log('Red text:');
console.log('  Raw:', redText.toString());
console.log('  Escaped:', escapeAnsi(redText.toString()));
console.log('  Expected: \\\\x1b[31mRed\\\\x1b[39m');
console.log('  Match:', escapeAnsi(redText.toString()) === '\\\\x1b[31mRed\\\\x1b[39m');
console.log('');

// Test chained red and blue without space
const chainedText = crayon.red('Red').blue('Blue');
console.log('Chained red and blue (no space):');
console.log('  Raw:', chainedText.toString());
console.log('  Escaped:', escapeAnsi(chainedText.toString()));
console.log('  Expected: \\\\x1b[31mRed\\\\x1b[39m\\\\x1b[34mBlue\\\\x1b[39m');
console.log('  Match:', escapeAnsi(chainedText.toString()) === '\\\\x1b[31mRed\\\\x1b[39m\\\\x1b[34mBlue\\\\x1b[39m');
console.log('');

// Test .as chaining
const spaceChainedText = crayon.as.red('Red').blue('Blue');
console.log('Chained red and blue (with space):');
console.log('  Raw:', spaceChainedText.toString());
console.log('  Escaped:', escapeAnsi(spaceChainedText.toString()));
console.log('  Expected: \\\\x1b[31mRed\\\\x1b[39m \\\\x1b[34mBlue\\\\x1b[39m');
console.log('  Match:', escapeAnsi(spaceChainedText.toString()) === '\\\\x1b[31mRed\\\\x1b[39m \\\\x1b[34mBlue\\\\x1b[39m');