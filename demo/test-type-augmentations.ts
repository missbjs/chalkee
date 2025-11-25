/**
 * Test file for verifying type augmentations work correctly
 * This ensures IntelliSense shows all available properties
 */

import './src/plugins/bg-mode'
import './src/plugins/space'
import crayon from './src/index'

// Test core colors
console.log('Core colors:', crayon.red('Red text'))

// Test modifiers
console.log('Modifiers:', crayon.bold('Bold text'))

// Test color utilities
console.log('Hex color:', crayon.hex('#FF0000')('Red hex text'))

// Test background mode
console.log('Background mode:', crayon.bg.red('Red background'))

// Test auto-space mode
console.log('Auto-space:', crayon.as.red('Red text with auto-space'))

// Test emoji (if available)
console.log('Emoji:', crayon.emoji ? crayon.emoji('smile') : 'Emoji not available')

// Test custom colors (if available)
console.log('Custom colors:', crayon.pink ? crayon.pink('Pink text') : 'Custom colors not available')