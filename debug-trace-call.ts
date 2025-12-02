import { red } from './src/index'

console.log('=== Tracing the Call ===')

// Let's trace what happens step by step
const redInstance = red
console.log('1. redInstance created')
console.log('   _colors:', (redInstance as any)._colors)
console.log('   _modifiers:', (redInstance as any)._modifiers)

const redBoldInstance = redInstance.bold
console.log('\n2. redBoldInstance created (red.bold)')
console.log('   _colors:', (redBoldInstance as any)._colors)
console.log('   _modifiers:', (redBoldInstance as any)._modifiers)

// Let's manually trace what should happen when we call redBoldInstance('Hello Bold World')
console.log('\n3. Tracing what should happen when calling redBoldInstance(\'Hello Bold World\')')

// Get the function that would be called
const fn = redBoldInstance
console.log('   fn is the callable wrapper')

// Check what self is in the function
console.log('   self (this in function):', (fn as any).__proto__ === redBoldInstance ? 'correct' : 'incorrect')

// Check the state that would be passed
const state = (redBoldInstance as any).getState()
console.log('   state to pass:', state)
console.log('   state.modifiers:', state.modifiers)

// Actually call it
console.log('\n4. Actually calling red.bold(\'Hello Bold World\')')
const result = red.bold('Hello Bold World')
console.log('   result._colors:', (result as any)._colors)
console.log('   result._modifiers:', (result as any)._modifiers)
console.log('   result.toString():', result.toString())