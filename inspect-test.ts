import { red } from './src/index'
import util from 'util'

console.log('Inspect test:')

// Test basic functionality
const redText = red('Hello Red')
console.log('Direct console.log:')
console.log(redText)

console.log('\nUsing util.inspect:')
console.log(util.inspect(redText))

console.log('\nChecking symbols:')
const symbols = Object.getOwnPropertySymbols(redText)
console.log('Symbols:', symbols.map(s => s.toString()))

const customSymbol = util.inspect.custom
console.log('Custom symbol:', customSymbol.toString())
console.log('Has custom symbol:', symbols.some(s => s === customSymbol))
console.log('Custom symbol value:', (redText as any)[customSymbol])