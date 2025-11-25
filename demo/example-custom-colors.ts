/**
 * Example of how to use custom colors in a real project
 * This shows the proper way to extend Crayon with custom colors and get IntelliSense
 */

// 1. First import and register the custom colors plugin
import './src/plugins/custom-colors'

// 2. Then import crayon to use the extended functionality
import crayon from './src/index.ts'

// 3. Now you get full IntelliSense for the custom colors!
// Try typing "crayon." and you'll see pink, orange, purple, lime, etc. in the autocomplete

// Example usage with full IntelliSense:
console.log(crayon.pink('This text is pink!'))
console.log(crayon.bgOrange('This has an orange background!'))
console.log(crayon.purple.bold('Bold purple text'))
console.log(crayon.lime.underline('Underlined lime text'))
console.log(crayon.blink('Blinking text'))
console.log(crayon.doubleUnderline('Double underlined text'))

// Chaining works with custom colors too:
console.log(crayon.pink.bold.underline('Bold, underlined pink text'))
console.log(crayon.bgPurple.white('White text on purple background'))