#!/usr/bin/env node

/**
 * Demo of extended colors plugin for Crayon
 * Shows how users can get proper IntelliSense with custom color codes
 */

import crayon from '../dist/index.mjs'

// In a real application, users would import and register the plugin:
// import './plugins/extended-colors' // This registers the plugin
// import './plugins/extended-colors.d.ts' // This provides type augmentation

console.log('\n=== Extended Colors Plugin Demo ===\n')

console.log('This demo shows how users can extend Crayon with custom colors')
console.log('that provide full IntelliSense support.\n')

console.log('To use extended colors in your project:')
console.log('1. Create a plugin file (like src/plugins/extended-colors.ts)')
console.log('2. Create a type definition file (like src/plugins/extended-colors.d.ts)')
console.log('3. Import both in your entry point')
console.log('4. Get full IntelliSense for custom colors!\n')

console.log('Example usage with IntelliSense:')
console.log('  crayon.pink("Pink text")')
console.log('  crayon.bgOrange("Orange background")')
console.log('  crayon.purple.bold("Bold purple text")')
console.log('  crayon.lime.underline("Underlined lime text")')
console.log('  crayon.coral.bgTeal("Coral text on teal background")')
console.log('  crayon.blink("Blinking text")')
console.log('  crayon.doubleUnderline("Double underlined text")')

console.log('\n=== Extended Colors Plugin Demo Complete ===\n')