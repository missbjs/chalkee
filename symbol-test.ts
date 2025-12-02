import util from 'util'

console.log('util.inspect.custom:', util.inspect.custom)
console.log('Symbol.toString():', Symbol('nodejs.util.inspect.custom').toString())

// Test if they're the same
const symbol1 = util.inspect.custom
const symbol2 = Symbol('nodejs.util.inspect.custom')

console.log('Are they equal?', symbol1 === symbol2)
console.log('symbol1 description:', symbol1.description)
console.log('symbol2 description:', symbol2.description)