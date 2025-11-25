// Mixed plugins consumer application - selectively import plugins
import 'chalkee/plugins/core'    // Import and register core colors plugin
import 'chalkee/plugins/util' // Import and register color utilities plugin
import 'chalkee/plugins/modifiers'       // Import and register modifiers plugin
import crayon from 'chalkee/minimal'

console.log('Testing mixed plugins consumer app:')
console.log(crayon.red.bold`This should be red and bold`)
console.log(crayon.blue.underline`This should be blue and underlined`)
console.log(crayon.hex('#FF00FF').italic`This should be magenta and italic`)

// Test negative cases - bg mode should NOT be defined here (unless we import it)
if (typeof crayon.bg === 'undefined') {
  console.log('bg mode is correctly not available in mixed build without explicit import')
} else {
  console.log('bg mode is available in mixed build')
}