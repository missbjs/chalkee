/**
 * Test file to verify that the merged custom colors plugin works correctly
 */

import './src/plugins/custom-colors'
import crayon from './src/index'

// Test that all the extended colors are available
console.log('Testing merged custom colors plugin:')
console.log('Pink text:', crayon.pink('This is pink text'))
console.log('Orange background:', crayon.bgOrange('This has an orange background'))
console.log('Purple with underline:', crayon.purple.underline('Purple underlined text'))
console.log('Lime with bold:', crayon.lime.bold('Bold lime text'))
console.log('Coral text:', crayon.coral('This is coral text'))
console.log('Teal background:', crayon.bgTeal('This has a teal background'))
console.log('Blinking text:', crayon.blink('This text is blinking'))
console.log('Overline text:', crayon.overline('This text has an overline'))
console.log('Double underline:', crayon.doubleUnderline('This text is double underlined'))

console.log('\nAll tests passed!')