import { red } from './src/index'

console.log('=== Debugging Chain Progress ===')

// Test 1: red.bold('Hello Bold World')
console.log('\n--- Test 1: red.bold(\'Hello Bold World\') ---')
const redBoldInstance = red.bold
console.log('redBoldInstance._modifiers:', (redBoldInstance as any)._modifiers)

const redBoldResult = redBoldInstance('Hello Bold World')
console.log('redBoldResult._modifiers:', (redBoldResult as any)._modifiers)
console.log('redBoldResult.parent._modifiers:', (redBoldResult as any).parent._modifiers)
console.log('redBoldResult.toString():', JSON.stringify(redBoldResult.toString()))

// Test 2: red.bold.underline('Complex chaining test')
console.log('\n--- Test 2: red.bold.underline(\'Complex chaining test\') ---')
const redBoldUnderlineInstance = red.bold.underline
console.log('redBoldUnderlineInstance._modifiers:', (redBoldUnderlineInstance as any)._modifiers)

const redBoldUnderlineResult = redBoldUnderlineInstance('Complex chaining test')
console.log('redBoldUnderlineResult._modifiers:', (redBoldUnderlineResult as any)._modifiers)
console.log('redBoldUnderlineResult.parent._modifiers:', (redBoldUnderlineResult as any).parent._modifiers)
console.log('redBoldUnderlineResult.toString():', JSON.stringify(redBoldUnderlineResult.toString()))

// Test 3: Check the chain
console.log('\n--- Test 3: Chain analysis ---')
console.log('redBoldUnderlineInstance.parent === redBoldInstance:', (redBoldUnderlineInstance as any).parent === redBoldInstance)
console.log('redBoldInstance.parent === red:', (redBoldInstance as any).parent === red)