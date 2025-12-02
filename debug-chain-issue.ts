import { red } from './src/index'

console.log('=== Debugging Chain Issue ===')

// Test 1: Basic red
console.log('\n--- Test 1: Basic red ---')
const redInstance = red
console.log('redInstance._colors:', (redInstance as any)._colors)
console.log('redInstance._modifiers:', (redInstance as any)._modifiers)

// Test 2: red.bold
console.log('\n--- Test 2: red.bold ---')
const redBoldInstance = red.bold
console.log('redBoldInstance._colors:', (redBoldInstance as any)._colors)
console.log('redBoldInstance._modifiers:', (redBoldInstance as any)._modifiers)

// Test 3: red.bold('text')
console.log('\n--- Test 3: red.bold(\'Hello Bold World\') ---')
const redBoldText = red.bold('Hello Bold World')
console.log('redBoldText.toString():', redBoldText.toString())
console.log('redBoldText (JSON):', JSON.stringify(redBoldText.toString()))
console.log('Expected: "\\u001b[1;31mHello Bold World\\u001b[0m"')
console.log('Match:', redBoldText.toString() === '\u001b[1;31mHello Bold World\u001b[0m')