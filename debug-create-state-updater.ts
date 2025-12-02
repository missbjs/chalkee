import { red } from './src/index'

console.log('=== Debugging createStateUpdater ===')

// Step 1: Create red instance
console.log('\n--- Step 1: red ---')
const redInstance = red
console.log('redInstance._colors:', (redInstance as any)._colors.map((c: any) => c.name))
console.log('redInstance._modifiers:', (redInstance as any)._modifiers)

// Step 2: Manually trace what createStateUpdater does for bold
console.log('\n--- Step 2: Tracing createStateUpdater for bold ---')
const self = redInstance
console.log('self._colors:', (self as any)._colors.map((c: any) => c.name))
console.log('self._modifiers:', (self as any)._modifiers)

// Get the state that would be passed to the constructor
const selfState = (self as any).getState()
console.log('selfState.colors:', selfState.colors.map((c: any) => c.name))
console.log('selfState.modifiers:', selfState.modifiers)

// Create newInstance (this is what happens in createStateUpdater line 218)
console.log('\n--- Creating newInstance ---')
const newInstance = new (redInstance.constructor as any)(self, ['', selfState])
console.log('newInstance after creation:')
console.log('newInstance._colors:', (newInstance as any)._colors.map((c: any) => c.name))
console.log('newInstance._modifiers:', (newInstance as any)._modifiers)

// Copy state (this is what happens in createStateUpdater lines 221-225)
console.log('\n--- Copying state ---')
const newInstanceAny: any = newInstance as any
const selfAny: any = self as any
newInstanceAny._colors = [...selfAny._colors]
newInstanceAny._modifiers = [...selfAny._modifiers]
newInstanceAny._backgroundColors = [...selfAny._backgroundColors]
newInstanceAny._isOpen = selfAny._isOpen
newInstanceAny._autoSpacing = selfAny._autoSpacing
console.log('newInstance after copying state:')
console.log('newInstance._colors:', (newInstanceAny as any)._colors.map((c: any) => c.name))
console.log('newInstance._modifiers:', (newInstanceAny as any)._modifiers)

// Apply modifier function (this is what happens in createStateUpdater line 228)
console.log('\n--- Applying modifier function ---')
const modifierFn = (instance: any) => {
    // Only add bold if it's not already in the modifiers
    if (!instance._modifiers.includes('bold')) {
        instance._modifiers = [...instance._modifiers, 'bold']
    }
    instance._isOpen = true
}
modifierFn(newInstanceAny)
console.log('newInstance after applying modifier function:')
console.log('newInstance._colors:', (newInstanceAny as any)._colors.map((c: any) => c.name))
console.log('newInstance._modifiers:', (newInstanceAny as any)._modifiers)