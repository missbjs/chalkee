process.env.FORCE_COLOR = '1';

import crayon from '../dist/index.mjs';
const { bg, red, bold } = crayon;

console.log('\n=== Persistent bg-Mode Demonstration ===\n');

console.log('1. Basic bg-mode chaining:');
console.log('   Code: bg.red`Red`.blue`Blue`.green`Green`');
console.log('   Output:', String(bg.red`Red`.blue`Blue`.green`Green`));
console.log('   ✓ All three have background colors (red, blue, green)');

console.log('\n2. bg-mode with auto-space (.as):');
console.log('   Code: bg.red`Red`.as.blue`Blue`.green`Green`');
console.log('   Output:', String(bg.red`Red`.as.blue`Blue`.green`Green`));
console.log('   ✓ Background colors with automatic spacing');

console.log('\n3. bg-mode with hex colors:');
console.log('   Code: bg.hex("#FF0000")`Red`.hex("#00FF00")`Green`');
console.log('   Output:', String(bg.hex('#FF0000')`Red`.hex('#00FF00')`Green`));
console.log('   ✓ hex() respects bg-mode');

console.log('\n4. bg-mode with modifiers:');
console.log('   Code: bg.red`Red`.bold`Bold on red bg`.italic`Italic on red bg`');
console.log('   Output:', String(bg.red`Red`.bold`Bold on red bg`.italic`Italic on red bg`));
console.log('   ✓ Modifiers work, background persists');

console.log('\n5. Resetting bg-mode with .r:');
console.log('   Code: bg.red`Red bg`.r.blue`Foreground blue`');
console.log('   Output:', String(bg.red`Red bg`.r.blue`Foreground blue`));
console.log('   ✓ .r clears bg-mode, blue becomes foreground color');

console.log('\n6. Combining with foreground colors:');
console.log('   Code: red.bg.yellow`Red text on yellow bg`.blue`Blue text on yellow bg`');
console.log('   Output:', String(red.bg.yellow`Red text on yellow bg`.blue`Blue text on yellow bg`));
console.log('   ✓ Foreground + bg-mode combination');

console.log('\n=== Summary ===');
console.log('✓ bg-mode is persistent (like .as)');
console.log('✓ All color properties become background colors');
console.log('✓ hex/rgb utilities respect bg-mode');
console.log('✓ Modifiers (bold, italic, etc.) work normally');
console.log('✓ Reset (.r) clears bg-mode');
console.log('\nThis makes bg. consistent with .as and other chaining styles!\n');
