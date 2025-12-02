import { red } from './src/index'

console.log('=== Debugging Chain State ===')

// Test 1: red('Hello World')
console.log('\n--- Test 1: red("Hello World") ---')
const redResult = red('Hello World')
console.log('redResult._colors:', (redResult as any)._colors.map((c: any) => c.name))
console.log('redResult._modifiers:', (redResult as any)._modifiers)
console.log('redResult.toString():', JSON.stringify(redResult.toString()))

// Test 2: red.bold('Hello Bold World')
console.log('\n--- Test 2: red.bold("Hello Bold World") ---')
const redBoldInstance = red.bold
console.log('redBoldInstance._colors:', (redBoldInstance as any)._colors.map((c: any) => c.name))
console.log('redBoldInstance._modifiers:', (redBoldInstance as any)._modifiers)

const redBoldResult = redBoldInstance('Hello Bold World')
console.log('redBoldResult._colors:', (redBoldResult as any)._colors.map((c: any) => c.name))
console.log('redBoldResult._modifiers:', (redBoldResult as any)._modifiers)
console.log('redBoldResult.parent._colors:', (redBoldResult as any).parent._colors.map((c: any) => c.name))
console.log('redBoldResult.parent._modifiers:', (redBoldResult as any).parent._modifiers)
console.log('redBoldResult.toString():', JSON.stringify(redBoldResult.toString()))

// Test 3: red.bold.underline('Complex chaining test')
console.log('\n--- Test 3: red.bold.underline("Complex chaining test") ---')
const redBoldUnderlineInstance = red.bold.underline
console.log('redBoldUnderlineInstance._colors:', (redBoldUnderlineInstance as any)._colors.map((c: any) => c.name))
console.log('redBoldUnderlineInstance._modifiers:', (redBoldUnderlineInstance as any)._modifiers)

const redBoldUnderlineResult = redBoldUnderlineInstance('Complex chaining test')
console.log('redBoldUnderlineResult._colors:', (redBoldUnderlineResult as any)._colors.map((c: any) => c.name))
console.log('redBoldUnderlineResult._modifiers:', (redBoldUnderlineResult as any)._modifiers)
console.log('redBoldUnderlineResult.parent._colors:', (redBoldUnderlineResult as any).parent._colors.map((c: any) => c.name))
console.log('redBoldUnderlineResult.parent._modifiers:', (redBoldUnderlineResult as any).parent._modifiers)
console.log('redBoldUnderlineResult.toString():', JSON.stringify(redBoldUnderlineResult.toString()))