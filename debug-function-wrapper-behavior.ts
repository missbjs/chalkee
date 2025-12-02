import { red } from './src/index'

console.log('=== Debugging Function Wrapper Behavior ===')

// Let's create a simple test to understand how the function wrapper works
const redBoldInstance = red.bold
console.log('redBoldInstance type:', typeof redBoldInstance)
console.log('redBoldInstance constructor:', (redBoldInstance as any).constructor?.name)

// Let's see what happens when we call the function with different arguments
console.log('\nTesting different call patterns:')

// 1. Call with no arguments
console.log('1. Call with no arguments:')
try {
    const result1 = redBoldInstance()
    console.log('   Result type:', typeof result1)
    console.log('   Result === redBoldInstance:', (result1 as any) === redBoldInstance)
    console.log('   Result._modifiers:', (result1 as any)._modifiers)
} catch (error) {
    console.log('   Error:', error.message)
}

// 2. Call with string argument
console.log('\n2. Call with string argument:')
try {
    const result2 = redBoldInstance('Hello World')
    console.log('   Result type:', typeof result2)
    console.log('   Result._modifiers:', (result2 as any)._modifiers)
    console.log('   Result._text:', (result2 as any)._text)
} catch (error) {
    console.log('   Error:', error.message)
}

// 3. Call with multiple arguments
console.log('\n3. Call with multiple arguments:')
try {
    const result3 = redBoldInstance('Hello', 'World')
    console.log('   Result type:', typeof result3)
    console.log('   Result._modifiers:', (result3 as any)._modifiers)
} catch (error) {
    console.log('   Error:', error.message)
}

// Let's also check if the function has any special properties
console.log('\nFunction properties:')
console.log('redBoldInstance.length:', (redBoldInstance as any).length)
console.log('redBoldInstance.name:', (redBoldInstance as any).name)