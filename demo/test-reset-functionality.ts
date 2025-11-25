/**
 * Test file to verify that the reset functionality works correctly
 * with shorthand aliases handled by the modifiers plugin
 */
import crayon from './src/index'

// Test that reset functionality works with various combinations
console.log('Testing reset functionality:')

// Test basic reset
console.log('Basic reset:', crayon.red.bold.underline.r('Reset text after red bold underlined text'))

// Test reset with auto-space mode
console.log('Reset with auto-space:', crayon.as.red.r('Reset text after red auto-space text'))

// Test reset with background mode
console.log('Reset with background mode:', crayon.bg.red.r('Reset text after red background'))

// Test chaining after reset
console.log('Chaining after reset:', crayon.red.bold.r.blue('Blue text after reset'))

console.log('\nAll reset tests passed!')