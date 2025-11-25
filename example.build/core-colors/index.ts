// Core colors consumer application - selectively import plugin
import 'chalkee/plugins/core' // Import and register only the core colors plugin
import crayon from 'chalkee/minimal'

console.log('Testing core colors consumer app:')
console.log(crayon.red`This should be red`)
console.log(crayon.blue`This should be blue`)
console.log(crayon.green`This should be green`)

// Test negative cases - hex and rgb should NOT be defined here
if (typeof crayon.hex === 'undefined') {
  console.log('hex is correctly not available in core colors only build')
} else {
  console.log('ERROR: hex should NOT be available in core colors only build')
  console.log('hex value:', crayon.hex)
}

if (typeof crayon.rgb === 'undefined') {
  console.log('rgb is correctly not available in core colors only build')
} else {
  console.log('ERROR: rgb should NOT be available in core colors only build')
  console.log('rgb value:', crayon.rgb)
}