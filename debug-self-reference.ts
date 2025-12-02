import { red } from './src/index'

console.log('=== Debugging Self Reference ===')

// Create red.bold instance
const redBoldInstance = red.bold
console.log('redBoldInstance._modifiers:', (redBoldInstance as any)._modifiers)

// Let's check what self is in the function wrapper
console.log('\n--- Checking self reference ---')
console.log('typeof redBoldInstance:', typeof redBoldInstance)
console.log('redBoldInstance === (redBoldInstance as any).constructor:', redBoldInstance === (redBoldInstance as any).constructor)

// Let's manually simulate what the function wrapper does
console.log('\n--- Simulating function wrapper ---')
const fn = redBoldInstance
const self = fn // This is what self is in the function wrapper

console.log('self === redBoldInstance:', self === redBoldInstance)
console.log('self._modifiers:', (self as any)._modifiers)

// Get the actual CallableChalkee instance
console.log('\n--- Getting actual CallableChalkee instance ---')
const actualSelf = Object.getPrototypeOf(fn)
console.log('actualSelf._modifiers:', (actualSelf as any)._modifiers)

// Test what happens when we call getState on both
console.log('\n--- Testing getState ---')
console.log('self.getState():', (self as any).getState ? 'has getState' : 'no getState')
console.log('actualSelf.getState():', (actualSelf as any).getState ? 'has getState' : 'no getState')

if ((actualSelf as any).getState) {
    const state = (actualSelf as any).getState()
    console.log('actualSelf.getState() modifiers:', state.modifiers)
}