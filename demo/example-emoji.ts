/**
 * Example usage of the emoji plugin
 * Demonstrates how to use emojis with the Crayon styling library
 */

import crayon from './src/index'

// Example 1: Using the emoji method with emoji names
console.log('Example 1: Using emoji names')
console.log(crayon.emoji('smile')('Hello with a smile!'))
console.log(crayon.red.emoji('heart')('Red heart emoji'))
console.log(crayon.blue.bold.emoji('rocket')('Blue bold rocket'))

// Example 2: Using the emoji method with direct emoji characters
console.log('\nExample 2: Using direct emoji characters')
console.log(crayon.emoji('🌟')('Star emoji'))
console.log(crayon.green.emoji('🎉')('Green party popper'))

// Example 3: Using direct emoji properties
console.log('\nExample 3: Using direct emoji properties')
console.log(crayon.smile('Direct smile property'))
console.log(crayon.red.fire('Red fire emoji'))
console.log(crayon.blue.bold.rocket('Blue bold rocket'))

// Example 4: Chaining emojis with other styles
console.log('\nExample 4: Chaining emojis')
console.log(crayon.bgYellow.black.emoji('star')('Yellow background with black star'))
console.log(crayon.underline.green.emoji('heart')('Underlined green heart'))

// Example 5: Using emoji utility methods
console.log('\nExample 5: Emoji utilities')
// Note: These would be accessed differently in practice, but showing the concept
console.log('Available emojis: smile, laugh, wink, heart, thumbsUp, fire, star, rocket, etc.')

console.log('\nEmoji plugin working correctly!')