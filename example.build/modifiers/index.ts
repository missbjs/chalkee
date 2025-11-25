// Modifiers consumer application - selectively import plugin
import 'chalkee/plugins/modifiers' // Import and register only the modifiers plugin
import crayon from 'chalkee/minimal'

console.log('Testing modifiers consumer app:')
console.log(crayon.bold`This should be bold`)
console.log(crayon.italic`This should be italic`)
console.log(crayon.underline`This should be underlined`)

// Test negative cases - red and hex should NOT be defined here
if (typeof crayon.red === 'undefined') {
  console.log('red is correctly not available in modifiers only build')
} else {
  console.log('ERROR: red should NOT be available in modifiers only build')
}

if (typeof crayon.hex === 'undefined') {
  console.log('hex is correctly not available in modifiers only build')
} else {
  console.log('ERROR: hex should NOT be available in modifiers only build')
}