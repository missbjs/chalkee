import util from 'util'

// Create a function with manual symbol setting
const fn = function () {
    return 'Hello World'
}

fn.toString = function () {
    return 'Styled: Hello World'
}

// Manually set the symbol
fn[util.inspect.custom] = function () {
    return 'Custom Inspect: Hello World'
}

console.log('Direct console.log:')
console.log(fn)

console.log('\nUsing util.inspect:')
console.log(util.inspect(fn))