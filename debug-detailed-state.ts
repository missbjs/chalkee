import { red } from './src/index'

console.log('=== Debugging Detailed State ===')

// Test: red.bold('Hello Bold World')
console.log('\n--- Test: red.bold(\'Hello Bold World\') ---')
const redBoldInstance = red.bold
console.log('redBoldInstance._colors:', (redBoldInstance as any)._colors)
console.log('redBoldInstance._modifiers:', (redBoldInstance as any)._modifiers)

const redBoldText = red.bold('Hello Bold World')
console.log('\nredBoldText instance:')
console.log('redBoldText._colors:', (redBoldText as any)._colors)
console.log('redBoldText._modifiers:', (redBoldText as any)._modifiers)
console.log('redBoldText._text:', (redBoldText as any)._text)

// Check the state
const state = (redBoldText as any).getState()
console.log('\nState:')
console.log('state.colors:', state.colors)
console.log('state.modifiers:', state.modifiers)

// Check the ANSI conversion
const ansiCode = (redBoldText as any).stateToAnsi()
console.log('\nANSI code:', JSON.stringify(ansiCode))

console.log('\nFull result:')
console.log('toString():', redBoldText.toString())
console.log('Expected: "\\u001b[1;31mHello Bold World\\u001b[0m"')
console.log('Actual  :', JSON.stringify(redBoldText.toString()))