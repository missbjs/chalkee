import { red } from './src/index'

console.log('=== Debugging Function Wrapper Self ===')

// Let's create a modified version of the CallableChalkee class 
// with some debug logging to understand what's happening

// First, let's see what the actual red.bold instance looks like
const redBoldInstance = red.bold
console.log('redBoldInstance._modifiers:', (redBoldInstance as any)._modifiers)

// Let's also check what happens when we call getState directly on redBoldInstance
const state = (redBoldInstance as any).getState()
console.log('Direct getState on redBoldInstance:', state.modifiers)

// Now let's trace what should happen in the function wrapper
console.log('\nSimulating function wrapper behavior:')

// In the function wrapper, self should be redBoldInstance
const self = redBoldInstance
console.log('self._modifiers:', (self as any)._modifiers)

// When we call self.getState(), it should return the state with bold modifier
const selfState = (self as any).getState()
console.log('selfState.modifiers:', selfState.modifiers)

// When we create a new instance with this state, it should work correctly
const newInstance = new (redBoldInstance.constructor as any)(self, ['Hello World', selfState])
console.log('newInstance._modifiers:', (newInstance as any)._modifiers)

// But when we actually call redBoldInstance('Hello World'), it doesn't work
console.log('\nActual call:')
const actualResult = redBoldInstance('Hello World')
console.log('actualResult._modifiers:', (actualResult as any)._modifiers)

// Let's also check if there's any difference in calling the function directly
console.log('\nDirect function call:')
try {
    const directResult = (redBoldInstance as any)('Hello World')
    console.log('directResult._modifiers:', (directResult as any)._modifiers)
} catch (error) {
    console.log('Error in direct call:', error.message)
}