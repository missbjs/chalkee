import { red } from './src/index'

console.log('=== Debugging Self Identity ===')

// Create red.bold instance
const redBoldInstance = red.bold
console.log('redBoldInstance._modifiers:', (redBoldInstance as any)._modifiers)

// Let's manually simulate what the function wrapper does
console.log('\nSimulating function wrapper:')

// In the function wrapper, self should be the 'this' from when redBoldInstance was created
// Let's create a new instance to see what 'this' would be
const testInstance = new (red.constructor as any)(undefined, undefined)
console.log('testInstance._modifiers:', (testInstance as any)._modifiers)

// Now let's trace what should happen in the function wrapper
console.log('\nTracing function wrapper behavior:')

// When redBoldInstance('Hello World') is called, self should be redBoldInstance
// But let's check if that's actually the case by creating a modified version

// Let's also check what happens if we call getState on the testInstance
const testState = (testInstance as any).getState()
console.log('testState.modifiers:', testState.modifiers)

// And what happens if we create an instance with testInstance as parent
const testChild = new (red.constructor as any)(testInstance, ['Hello World', testState])
console.log('testChild._modifiers:', (testChild as any)._modifiers)
console.log('testChild.parent === testInstance:', (testChild as any).parent === testInstance)

// Let's also check what the prototype of redBoldInstance is
console.log('\nPrototype of redBoldInstance:')
console.log('Object.getPrototypeOf(redBoldInstance):', Object.getPrototypeOf(redBoldInstance))
console.log('redBoldInstance.__proto__:', (redBoldInstance as any).__proto__)

// And what the prototype of the testInstance is
console.log('\nPrototype of testInstance:')
console.log('Object.getPrototypeOf(testInstance):', Object.getPrototypeOf(testInstance))
console.log('testInstance.__proto__:', (testInstance as any).__proto__)