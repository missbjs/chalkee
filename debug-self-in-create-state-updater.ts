import { red } from './src/index'

console.log('=== Debugging Self in createStateUpdater ===')

// Create red instance
const redInstance = red
console.log('redInstance._modifiers:', (redInstance as any)._modifiers)

// Let's manually trace what createStateUpdater does for bold
console.log('\nTracing createStateUpdater for bold:')

// Capture self (this should be redInstance)
const self = redInstance
console.log('self._modifiers:', (self as any)._modifiers)

// Get self state (this should be the state of redInstance)
const selfState = (self as any).getState()
console.log('selfState.modifiers:', selfState.modifiers)

// Create new instance with this state
const newInstance = new (redInstance.constructor as any)(undefined, ['', selfState])
console.log('newInstance._modifiers after creation:', (newInstance as any)._modifiers)

// Copy state from self to newInstance
const selfAny: any = self as any
const newInstanceAny: any = newInstance as any
newInstanceAny._colors = [...selfAny._colors]
newInstanceAny._modifiers = [...selfAny._modifiers]
newInstanceAny._backgroundColors = [...selfAny._backgroundColors]
newInstanceAny._isOpen = selfAny._isOpen
newInstanceAny._autoSpacing = selfAny._autoSpacing
console.log('newInstance._modifiers after state copy:', newInstanceAny._modifiers)

// Apply modifier function (add bold)
if (!newInstanceAny._modifiers.includes('bold')) {
    newInstanceAny._modifiers = [...newInstanceAny._modifiers, 'bold']
}
newInstanceAny._isOpen = true
console.log('newInstance._modifiers after adding bold:', newInstanceAny._modifiers)

// Set prototype
Object.setPrototypeOf(newInstance, self)
console.log('Prototype set')

// Now let's compare with the actual red.bold
console.log('\nComparing with actual red.bold:')
const redBoldInstance = red.bold
console.log('redBoldInstance._modifiers:', (redBoldInstance as any)._modifiers)

// Test calling both
console.log('\nTesting function calls:')
const manualResult = newInstance('Hello World')
console.log('manualResult._modifiers:', (manualResult as any)._modifiers)

const actualResult = redBoldInstance('Hello World')
console.log('actualResult._modifiers:', (actualResult as any)._modifiers)