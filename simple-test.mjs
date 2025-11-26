// Simple test to understand the escaping issue
import './dist/plugins/core.mjs';
import './dist/plugins/modifiers.mjs';
import { c as createStyler, e as escapeAnsi } from './dist/styler-B4mbBy4I.js';

const crayon = createStyler();

// Test the exact format you specified
const result = crayon.red('Red').blue('Blue');
console.log('Result:', result.toString());
console.log('Escaped:', escapeAnsi(result.toString()));

// What we expect
const expected = '\\x1b[31mRed\\x1b[39m\\x1b[34mBlue\\x1b[39m';
console.log('Expected:', expected);

// Check if they match
console.log('Do they match?', escapeAnsi(result.toString()) === expected);

// Let's also check what JSON.stringify shows
console.log('JSON.stringify of escaped:', JSON.stringify(escapeAnsi(result.toString())));
console.log('JSON.stringify of expected:', JSON.stringify(expected));