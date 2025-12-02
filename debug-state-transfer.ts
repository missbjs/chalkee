import { red } from './src/index'

console.log('=== Debugging State Transfer ===')

// Test: red.bold('Hello Bold World')
console.log('\n--- Test: red.bold(\'Hello Bold World\') ---')
const redBoldInstance = red.bold
console.log('redBoldInstance._colors:', (redBoldInstance as any)._colors)
console.log('redBoldInstance._modifiers:', (redBoldInstance as any)._modifiers)

// Get the state that would be passed to the constructor
const stateToPass = (redBoldInstance as any).getState()
console.log('\nState to pass to constructor:')
console.log('stateToPass.colors:', stateToPass.colors)
console.log('stateToPass.modifiers:', stateToPass.modifiers)

// Manually create an instance with this state to see what happens
const manualInstance = new (redBoldInstance.constructor as any)(undefined, ['', stateToPass])
console.log('\nManual instance:')
console.log('manualInstance._colors:', (manualInstance as any)._colors)
console.log('manualInstance._modifiers:', (manualInstance as any)._modifiers)

// Now test the actual call
const redBoldText = red.bold('Hello Bold World')
console.log('\nActual result:')
console.log('redBoldText._colors:', (redBoldText as any)._colors)
console.log('redBoldText._modifiers:', (redBoldText as any)._modifiers)