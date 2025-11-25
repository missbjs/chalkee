#!/usr/bin/env node
// Truly minimal consumer application - no plugins imported by default
import crayon from 'crayon/minimal'

console.log('Testing truly minimal consumer app:')

// Test that no styling functions are available by default
if (typeof crayon.red === 'undefined') {
  console.log('red is correctly not available in truly minimal build')
} else {
  console.log('ERROR: red should NOT be available in truly minimal build')
}

if (typeof crayon.hex === 'undefined') {
  console.log('hex is correctly not available in truly minimal build')
} else {
  console.log('ERROR: hex should NOT be available in truly minimal build')
}

if (typeof crayon.rgb === 'undefined') {
  console.log('rgb is correctly not available in truly minimal build')
} else {
  console.log('ERROR: rgb should NOT be available in truly minimal build')
}