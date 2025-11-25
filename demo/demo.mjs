/**
 * Demo of Crayon usage
 */
import crayon, { red, blue, green, bold, hex, rgb, h, b, i, u, as, bg } from '../dist/index.mjs';

console.log('=== Basic Colors ===');
console.log(crayon.blue('Hello world!'));
console.log(red.bold('Error!'));
console.log(green.underline('Success'));

console.log('\n=== Template Literal Chaining ===');
console.log(red`Red text`.bg.blue`Blue background`);
console.log(green`Green text`.bg.hex('#FF5733')`Orange background`);

console.log('\n=== Chaining ===');
console.log(red.dim.bold('text'));
console.log(blue.bold.underline.italic`Fully styled`);

console.log('\n=== Named Imports ===');
console.log(red('Red text'));
console.log(blue('Blue text'));
console.log(green('Green text'));
console.log(bold('Bold text'));

console.log('\n=== Color Utilities ===');
console.log(hex('#FF5733')('Hex color'));
console.log(rgb(255, 87, 51)('RGB color'));
console.log(crayon.bgHex('#FF5733')('Background hex'));
console.log(crayon.bgRgb(100, 200, 50)('Background RGB'));

console.log('\n=== Shorthands ===');
console.log(h('#FF5733')('h = hex'));
console.log(b('b = bold'));
console.log(i('i = italic'));
console.log(u('u = underline'));

console.log('\n=== Template Literals ===');
const name = 'World';
console.log(blue`Hello ${name}!`);
console.log(red.bold`Error: ${'Something went wrong'}`);

console.log('\n=== Complex Chaining ===');
console.log(red.bgWhite.bold.underline('Attention'));
console.log(crayon.cyan.bgBlack.italic('Styled text'));
console.log(green.bold.underline.italic('All modifiers'));

console.log('\n=== All Colors ===');
console.log(crayon.black('black'));
console.log(crayon.red('red'));
console.log(crayon.green('green'));
console.log(crayon.yellow('yellow'));
console.log(crayon.blue('blue'));
console.log(crayon.magenta('magenta'));
console.log(crayon.cyan('cyan'));
console.log(crayon.white('white'));
console.log(crayon.gray('gray'));

console.log('\n=== Bright Colors ===');
console.log(crayon.blackBright('blackBright'));
console.log(crayon.redBright('redBright'));
console.log(crayon.greenBright('greenBright'));
console.log(crayon.yellowBright('yellowBright'));
console.log(crayon.blueBright('blueBright'));
console.log(crayon.magentaBright('magentaBright'));
console.log(crayon.cyanBright('cyanBright'));
console.log(crayon.whiteBright('whiteBright'));

console.log('\n=== Background Colors ===');
console.log(crayon.bgBlack('bgBlack'));
console.log(crayon.bgRed('bgRed'));
console.log(crayon.bgGreen('bgGreen'));
console.log(crayon.bgYellow('bgYellow'));
console.log(crayon.bgBlue('bgBlue'));
console.log(crayon.bgMagenta('bgMagenta'));
console.log(crayon.bgCyan('bgCyan'));
console.log(crayon.bgWhite('bgWhite'));

console.log('\n=== New bg API Examples ===');
console.log(crayon.bg.red('bg.red'));
console.log(crayon.bg.blue('bg.blue'));
console.log(crayon.bg.green('bg.green'));
console.log(crayon.bg.hex('#FF5733')('bg.hex color'));
console.log(crayon.bg.rgb(100, 200, 50)('bg.rgb color'));

console.log('\n=== Auto-Space (.as) Feature ===');
console.log(String(red('Error:').as.bgBlue('File not found').bgGreen('Success')));
console.log(String(red.underline('Underlined').as.blue('Blue text')));

// Demonstrating persistent auto-space mode
console.log('\nPersistent auto-space mode:');
console.log(String(red('First').as.bgBlue('Second').bgGreen('Third')));

// Reset clears auto-space mode
console.log('\nReset (.r) clears auto-space mode:');
console.log(String(red('First').as.bgBlue('Second').r.bgGreen('Third')));
console.log('Notice how the third element does not have a space before it (correct behavior)');

console.log('\n=== Standalone as Function Examples ===');
// Half of the examples using standalone as function at the beginning
console.log(String(as.red('Error:').bgBlue('File not found').bgGreen('Success')));
console.log(String(as.red.underline('Underlined').blue('Blue text')));

console.log('\n=== Standalone bg Function Examples ===');
// Examples using standalone bg function - bg-mode persists until .r
console.log(String(bg.red('Red background').as.blue('Blue background')));
console.log(String(bg.red`Red background`.blue`Blue background`));

// Additional bg. examples - bg-mode chains forward automatically
console.log('\n=== Additional bg. Function Examples ===');
console.log(String(bg.red('Red background').as.blue('Blue background').green('Green background')));
console.log(String(bg.hex('#FF5733')('Orange background').as.hex('#33FF57')('Green background')));

console.log('\n=== Text Modifiers ===');
console.log(crayon.bold('bold'));
console.log(crayon.dim('dim'));
console.log(crayon.italic('italic'));
console.log(crayon.underline('underline'));
console.log(crayon.inverse('inverse'));
console.log(crayon.strikethrough('strikethrough'));