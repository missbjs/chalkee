#!/usr/bin/env node

/**
 * Demo file for the emoji plugin
 * Shows how to use emojis with the Crayon styling library
 */

import crayon from './dist/index.mjs'

console.log('=== Crayon Emoji Plugin Demo ===\n')

// Example 1: Basic emoji usage
console.log('1. Basic Emoji Usage:')
console.log(crayon.emoji('smile')('Hello World with a smile!'))
console.log(crayon.emoji('heart')('I love coding!'))
console.log(crayon.emoji('rocket')('Let\'s go to space!'))

// Example 2: Styled emojis
console.log('\n2. Styled Emojis:')
console.log(crayon.red.emoji('heart')('Red heart'))
console.log(crayon.blue.bold.emoji('star')('Blue bold star'))
console.log(crayon.green.underline.emoji('sparkles')('Green underlined sparkles'))

// Example 3: Direct emoji properties
console.log('\n3. Direct Emoji Properties:')
console.log(crayon.smile('Direct smile property'))
console.log(crayon.fire('Direct fire property'))
console.log(crayon.rocket('Direct rocket property'))

// Example 4: Emoji with other styling
console.log('\n4. Emojis with Other Styling:')
console.log(crayon.bgYellow.black.emoji('sun')('Sun with yellow background'))
console.log(crayon.bold.italic.emoji('rainbow')('Bold italic rainbow'))

// Example 5: Using actual emoji characters
console.log('\n5. Using Actual Emoji Characters:')
console.log(crayon.emoji('🌟')('Actual star emoji'))
console.log(crayon.emoji('🍕')('Actual pizza emoji'))
console.log(crayon.red.emoji('🎉')('Red party popper'))

console.log('\n=== Emoji Plugin Demo Complete ===')