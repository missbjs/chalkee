/**
 * Demo of sentence chaining feature
 * Testing: red('red text').bold`is important`.r` but not `.s` this `
 */

import { red, bgRed, bgBlue, bgGreen, bgYellow, as, bg } from './dist/index.mjs';

console.log('\n=== SENTENCE CHAINING DEMO ===\n');

// Your exact example: red('red text').bold`is important`.r` but not `.s` this `
console.log('Example: red("red text").bold` is important`.r` but not `.s` this `');
const result = red('red text').bold` is important`.r` but not `.s` this `;
console.log(String(result)); // Convert to string for display

console.log('\n=== More Examples ===\n');

// Chain after function call - using .as instead of manual space
console.log('red("Error:").as.bold("Critical!")');
console.log(String(red('Error:').as.bold('Critical!')));

// Chain with template literals - using .as instead of manual space
console.log('red`Warning`.as.bold.underline`important`');
console.log(String(red`Warning`.as.bold.underline`important`));

// Multiple chains - using .as instead of manual space in template literal
console.log('red("Step 1").as.bold`done`');
console.log(String(red('Step 1').as.bold`done`));

// Using reset in the middle - showing manual space after reset
console.log('red("colored").r(" normal")');
console.log(String(red('colored').r(' normal')));

// Complex sentence building - using .as instead of manual spaces
console.log('red`Error:`.as.bold`File not found`.as.dim`(line 42)`');
console.log(String(red`Error:`.as.bold`File not found`.as.dim`(line 42)`));

// Using shorthands - using .as instead of manual spaces
console.log('red("text").as.b("bold").i("italic").u("underline")');
console.log(String(red('text').as.b('bold').i('italic').u('underline')));
console.log(red('text').as.b('bold').i('italic').u('underline').toString());
console.log(red('text').as.b('bold').i('italic').u('underline').valueOf());
console.log(red('text').as.b('bold').i('italic').u('underline') + '');
console.log(red('text').as.b('bold').i('italic').u('underline'));

console.log('\n=== Background Color Chaining Examples ===\n');

// Basic background color chaining - using .as instead of manual space
console.log('bgRed("Red background").as.bgBlue("Blue background")');
console.log(String(bgRed('Red background').as.bgBlue('Blue background')));

// Chaining with text colors and background colors - using .as instead of manual space
console.log('red.bgBlue("Red text, blue background").as.bgGreen("with green background")');
console.log(String(red.bgBlue('Red text, blue background').as.bgGreen('with green background')));

// Template literals with background colors - using .as instead of manual space
console.log('bgYellow`Yellow background`.as.bgGreen`Green background`');
console.log(String(bgYellow`Yellow background`.as.bgGreen`Green background`));

// Complex chaining with background colors - using .as instead of manual spaces
console.log('bgRed("Error:").as.bgBlue("File not found").as.bgGreen("Success")');
console.log(String(bgRed('Error:').as.bgBlue('File not found').as.bgGreen('Success')));

// Using new bg.hex and bg.rgb APIs in chaining - using .as instead of manual spaces
console.log('bg.hex("#FF5733")("Orange bg").as.bg.hex("#33FF57")("Green bg")');
console.log(String(bgRed.bg.hex('#FF5733')('Orange bg').as.bg.hex('#33FF57')('Green bg')));

console.log('\n=== Chaining with Template Literals ===')

console.log('\n=== Auto-Space (.as) Feature ===')

console.log('\n=== Standalone as Function Examples ===')

console.log('\n=== Standalone bg Function Examples ===')
const bgExample1 = bg.red('Red background').blue('Blue background')
console.log('bg.red("Red background").blue("Blue background")')
console.log('Output:', String(bgExample1))
console.log('Escaped:', escapeAnsi(String(bgExample1)))

const bgExample2 = bgRed('Red background').bgBlue('Blue background')
console.log('\nbgRed("Red background").bgBlue("Blue background")')
console.log('Output:', String(bgExample2))
console.log('Escaped:', escapeAnsi(String(bgExample2)))

console.log('\n=== Additional bg. Function Examples ===')
const bgExample3 = bg.red('Red background').blue('Blue background').green('Green background')
console.log('bg.red("Red background").blue("Blue background").green("Green background")')
console.log('Output:', String(bgExample3))
console.log('Escaped:', escapeAnsi(String(bgExample3)))

console.log('\nbg.hex("#FF5733")("Orange background").as.hex("#33FF57")("Green background")')
const bgExample4 = bg.hex('#FF5733')('Orange background').as.hex('#33FF57')('Green background')
console.log('Output:', String(bgExample4))
console.log('Escaped:', escapeAnsi(String(bgExample4)))
console.log('Notice the space between "Orange background" and "Green background" due to .as')

console.log('\n✅ Sentence chaining works!\n');

// Function to escape ANSI codes for display
function escapeAnsi(str) {
  return str.replace(/\x1b/g, '\\x1b')
}

console.log('\n=== Text Modifiers ===')
