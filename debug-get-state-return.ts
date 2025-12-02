import { red } from './src/index'

console.log('=== Debugging getState Return ===')

// Create red.bold instance
const redBoldInstance = red.bold
console.log('redBoldInstance._modifiers:', (redBoldInstance as any)._modifiers)

// Call getState on redBoldInstance
const state = (redBoldInstance as any).getState()
console.log('getState result:', state)
console.log('getState modifiers:', state.modifiers)

// Now let's manually create an instance with this exact state
console.log('\nManual instance creation:')
const manualInstance = new (redBoldInstance.constructor as any)(redBoldInstance, ['Hello World', state])
console.log('manualInstance._modifiers:', (manualInstance as any)._modifiers)

// And compare with the actual call
console.log('\nActual call:')
const actualResult = redBoldInstance('Hello World')
console.log('actualResult._modifiers:', (actualResult as any)._modifiers)

// Let's also check what the initializeFromState method does
console.log('\nTesting initializeFromState:')
const testInstance = new (redBoldInstance.constructor as any)(undefined, undefined)
console.log('testInstance before initializeFromState:', (testInstance as any)._modifiers)
testInstance.initializeFromState(state)
console.log('testInstance after initializeFromState:', (testInstance as any)._modifiers)