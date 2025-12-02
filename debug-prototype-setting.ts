import { red } from './src/index'

console.log('=== Debugging Prototype Setting ===')

// Create red.bold instance
const redBoldInstance = red.bold
console.log('redBoldInstance type:', typeof redBoldInstance)
console.log('redBoldInstance constructor:', (redBoldInstance as any).constructor?.name)

// Check the prototype chain
console.log('\nPrototype chain:')
console.log('Object.getPrototypeOf(redBoldInstance):', Object.getPrototypeOf(redBoldInstance))
console.log('redBoldInstance.__proto__:', (redBoldInstance as any).__proto__)

// Check what happens when we create a function and set its prototype
console.log('\nTesting manual prototype setting:')
const testFn = function () { }
console.log('testFn.__proto__ before:', (testFn as any).__proto__)
Object.setPrototypeOf(testFn, redBoldInstance)
console.log('testFn.__proto__ after:', (testFn as any).__proto__)
console.log('testFn.__proto__ === redBoldInstance:', (testFn as any).__proto__ === redBoldInstance)

// Now let's check what the actual function wrapper looks like
console.log('\nActual function wrapper:')
console.log('typeof redBoldInstance:', typeof redBoldInstance)
console.log('redBoldInstance.toString():', (redBoldInstance as any).toString())

// Let's also check if redBoldInstance is actually a function
console.log('\nIs redBoldInstance callable?')
try {
    const result = (redBoldInstance as any)()
    console.log('Yes, it is callable. Result:', result)
} catch (error) {
    console.log('Error when calling:', error.message)
}