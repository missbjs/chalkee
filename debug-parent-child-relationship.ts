import { red } from './src/index'

console.log('=== Debugging Parent-Child Relationship ===')

// Create red instance
const redInstance = red
console.log('redInstance._modifiers:', (redInstance as any)._modifiers)

// Create red.bold instance
const redBoldInstance = red.bold
console.log('redBoldInstance._modifiers:', (redBoldInstance as any)._modifiers)

// Check the parent of redBoldInstance
console.log('\nParent of redBoldInstance:')
console.log('redBoldInstance.parent:', (redBoldInstance as any).parent)

// Check if redBoldInstance has a parent
if ((redBoldInstance as any).parent) {
    console.log('redBoldInstance.parent._modifiers:', (redBoldInstance as any).parent._modifiers)
}

// Now let's manually trace what happens when we call redBoldInstance('Hello World')
console.log('\nTracing redBoldInstance(\'Hello World\') call:')

// In the function wrapper, self is redBoldInstance
const self = redBoldInstance
console.log('self._modifiers:', (self as any)._modifiers)

// When we call self.getState(), it should return the correct state
const selfState = (self as any).getState()
console.log('selfState.modifiers:', selfState.modifiers)

// When we create a new instance with self as parent and selfState as state
const newInstance = new (redBoldInstance.constructor as any)(self, ['Hello World', selfState])
console.log('newInstance._modifiers:', (newInstance as any)._modifiers)
console.log('newInstance.parent === self:', (newInstance as any).parent === self)

// Check the parent's state
if ((newInstance as any).parent) {
    console.log('newInstance.parent._modifiers:', (newInstance as any).parent._modifiers)
}

// Now let's see what happens with the actual call
console.log('\nActual call:')
const actualResult = redBoldInstance('Hello World')
console.log('actualResult._modifiers:', (actualResult as any)._modifiers)
console.log('actualResult.parent === redBoldInstance:', (actualResult as any).parent === redBoldInstance)

// Check the parent's state in the actual result
if ((actualResult as any).parent) {
    console.log('actualResult.parent._modifiers:', (actualResult as any).parent._modifiers)
}