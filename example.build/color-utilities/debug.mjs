// Debug script to check what plugins are registered
import 'crayon/plugins/color-utilities' // Import and register only the color utilities plugin
import crayon from 'crayon/minimal'
import { pluginRegistry } from 'crayon/minimal'

console.log('Plugins registered:')
console.log(pluginRegistry)

// Check if emoji is available
console.log('Is emoji available?', typeof crayon.emoji !== 'undefined')

// Check if red is available
console.log('Is red available?', typeof crayon.red !== 'undefined')

// Check if hex is available
console.log('Is hex available?', typeof crayon.hex !== 'undefined')