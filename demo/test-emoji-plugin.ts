/**
 * Test file to verify that the emoji plugin works correctly
 */

import crayon from './src/index'

console.log('Testing emoji plugin functionality:')

// Test basic emoji functionality
console.log('Basic emoji:', crayon.emoji('smile')('Smile emoji'))
console.log('Styled emoji:', crayon.red.emoji('heart')('Red heart'))

// Test direct emoji properties
console.log('Direct emoji property:', crayon.smile('Direct smile'))
console.log('Styled direct emoji:', crayon.blue.fire('Blue fire'))

// Test with unknown emoji (should return the input as-is)
console.log('Unknown emoji:', crayon.emoji('unknown')('Unknown emoji'))

// Test chaining
console.log('Chained emoji:', crayon.bold.underline.emoji('star')('Bold underlined star'))

console.log('\nEmoji plugin tests completed successfully!')