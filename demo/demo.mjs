/**
 * Demo of Crayon usage
 */
import crayon from '../dist/index.mjs';

console.log('=== Basic Colors ===');
console.log(crayon.blue('Hello world!'));
console.log(crayon.red.bold('Error!'));
console.log(crayon.green.underline('Success'));

console.log('\n=== Template Literal Chaining ===');
console.log(crayon.red`Red text`.bg.blue`Blue background`);
console.log(crayon.green`Green text`.bg.hex('#FF5733')`Orange background`);

console.log('\n=== Chaining ===');
console.log(crayon.red.dim.bold('text'));
console.log(crayon.blue.bold.underline.italic`Fully styled`);

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
console.log(String(crayon.red('Error:').as.bgBlue('File not found').bgGreen('Success')));
console.log(String(crayon.red.underline('Underlined').as.blue('Blue text')));

// Demonstrating persistent auto-space mode
console.log('\nPersistent auto-space mode:');
console.log(String(crayon.red('First').as.bgBlue('Second').bgGreen('Third')));

// Reset clears auto-space mode
console.log('\nReset (.r) clears auto-space mode:');
console.log(String(crayon.red('First').as.bgBlue('Second').r.bgGreen('Third')));
console.log('Notice how the third element does not have a space before it (correct behavior)');

console.log('\n=== Standalone as Function Examples ===');
// Half of the examples using standalone as function at the beginning
console.log(String(crayon.as.red('Error:').bgBlue('File not found').bgGreen('Success')));
console.log(String(crayon.as.red.underline('Underlined').blue('Blue text')));

console.log('\n=== Standalone bg Function Examples ===');
// Examples using standalone bg function - bg-mode persists until .r
console.log(String(crayon.bg.red('Red background').as.blue('Blue background')));
console.log(String(crayon.bg.red`Red background`.blue`Blue background`));

// Additional bg. examples - bg-mode chains forward automatically
console.log('\n=== Additional bg. Function Examples ===');
console.log(String(crayon.bg.red('Red background').as.blue('Blue background').green('Green background')));
console.log(String(crayon.bg.hex('#FF5733')('Orange background').as.hex('#33FF57')('Green background')));

console.log('\n=== Text Modifiers ===');
console.log(crayon.bold('bold'));
console.log(crayon.dim('dim'));
console.log(crayon.italic('italic'));
console.log(crayon.underline('underline'));
console.log(crayon.inverse('inverse'));
console.log(crayon.strikethrough('strikethrough'));