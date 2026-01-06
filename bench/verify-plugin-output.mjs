#!/usr/bin/env node

import chalkee from '../dist/index.mjs';

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║  Chalkee Plugin Output Verification (Direct Terminal Test) ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

console.log('Test 1: Basic Colors');
console.log('─'.repeat(60));
console.log(chalkee.red('Red text'));
console.log(chalkee.green('Green text'));
console.log(chalkee.blue('Blue text'));
console.log(chalkee.yellow('Yellow text'));

console.log('\nTest 2: Modifiers');
console.log('─'.repeat(60));
console.log(chalkee.bold('Bold text'));
console.log(chalkee.italic('Italic text'));
console.log(chalkee.underline('Underlined text'));
console.log(chalkee.dim('Dim text'));

console.log('\nTest 3: Color + Modifiers');
console.log('─'.repeat(60));
console.log(chalkee.red.bold('Red Bold'));
console.log(chalkee.green.underline('Green Underline'));
console.log(chalkee.blue.italic('Blue Italic'));
console.log(chalkee.yellow.bold.underline('Yellow Bold Underline'));

console.log('\nTest 4: Template Literals');
console.log('─'.repeat(60));
console.log(chalkee.red`Red template literal`);
console.log(chalkee.green`Green template literal`);
console.log(chalkee.blue.bold`Blue bold template literal`);

console.log('\nTest 5: Chaining');
console.log('─'.repeat(60));
console.log(chalkee.red('Red ') + chalkee.green('Green ') + chalkee.blue('Blue'));
console.log(chalkee.yellow.bold('Yellow Bold ') + chalkee.cyan('Cyan'));

console.log('\nTest 6: Auto-spacing');
console.log('─'.repeat(60));
console.log(chalkee.red`red`.as.green`green`.as.blue`blue`);

console.log('\nTest 7: Background Colors');
console.log('─'.repeat(60));
console.log(chalkee.bgRed('Red Background'));
console.log(chalkee.bgGreen('Green Background'));
console.log(chalkee.bgBlue.yellow('Blue Background Yellow Text'));

console.log('\nTest 8: Complex Chains');
console.log('─'.repeat(60));
console.log(chalkee.red.bold.underline('Red Bold Underline'));
console.log(chalkee.green.italic.dim('Green Italic Dim'));
console.log(chalkee.bgCyan.black.bold('Black Bold on Cyan Background'));

console.log('\n✅ All plugin output tests completed successfully!\n');
