/**
 * Test file to verify that IntelliSense works for custom colors
 * This file is for demonstration purposes only
 */

// Import the custom colors plugin to register it and get type augmentation
import './src/plugins/custom-colors'

// Import crayon to use the extended functionality
import crayon from './src/index.ts'

// The following lines demonstrate that IntelliSense works
// When you type "crayon." in your IDE, you should see:
// - pink, orange, purple, lime (foreground colors)
// - bgPink, bgOrange, bgPurple, bgLime (background colors)
// - blink, doubleUnderline (modifiers)

// Example usage - you should get full IntelliSense for these:
console.log(crayon.pink('Pink text'))
console.log(crayon.bgOrange('Orange background'))
console.log(crayon.purple.bold('Bold purple text'))
console.log(crayon.lime.underline('Underlined lime text'))
console.log(crayon.blink('Blinking text'))
console.log(crayon.doubleUnderline('Double underlined text'))

// Chaining also works:
console.log(crayon.pink.bold.underline('Bold, underlined pink text'))
console.log(crayon.bgPurple.white('White text on purple background'))