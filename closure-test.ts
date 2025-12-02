import { red } from './src/index'

console.log('Closure test:')

// Test basic functionality
const redText = red('Hello Red')
console.log('Function _accumulatedText:', (redText as any)._accumulatedText)

// Try to access the closure directly by replacing toString
const originalToStringDesc = Object.getOwnPropertyDescriptor(redText, 'toString')
console.log('Original toString descriptor:', originalToStringDesc)

// Let's see what the actual toString function returns
const toStringFunc = redText.toString
console.log('toString function source:', toStringFunc.toString())

// Call it directly
const result = toStringFunc.call(redText)
console.log('Direct call result:', JSON.stringify(result))