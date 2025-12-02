import { red } from './dist/index.mjs'

console.log('Testing red function:')

// Test 1: Basic red text
console.log('\n--- Test 1: Basic red text ---')
const redText = red('Hello World')
console.log('redText (direct):', redText)
console.log('redText.toString():', redText.toString())

// Test 2: Check if custom inspect is working
console.log('\n--- Test 2: Custom inspect ---')
console.log('typeof redText:', typeof redText)
// We can't easily access the customInspect symbol here, so let's just test the function
console.log('redText() result:', redText())