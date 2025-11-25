/**
 * Test file to verify that the core ANSI codes are implemented as a plugin
 * This demonstrates the architectural consistency between core functionality and extended plugins
 */
import { corePlugin } from './src/plugins/core'
import crayon from './src/index'

// Verify that the core ANSI codes plugin follows the same pattern as custom plugins
console.log('Core ANSI Codes Plugin Name:', corePlugin.name)
console.log('Has registerCodes method:', typeof corePlugin.registerCodes === 'function')

// Get the core codes through the plugin
if (corePlugin.registerCodes) {
    const coreCodes = corePlugin.registerCodes()
    console.log('Core codes count:', Object.keys(coreCodes).length)
}

// Verify that core functionality still works
console.log('Red text:', crayon.red('This is red text'))
console.log('Bold blue text:', crayon.blue.bold('This is bold blue text'))
console.log('Background green:', crayon.bgGreen('This has a green background'))

console.log('Test completed successfully!')