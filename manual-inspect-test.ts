import { red } from './dist/index.mjs'
import util from 'util'

console.log('Testing manual inspect method:')

const redText = red('Hello World')

    // Manually set the custom inspect method with the correct symbol
    ; (redText as any)[util.inspect.custom] = function () {
        return 'Manual inspect result: Hello World'
    }

console.log('After manual setting:')
console.log('redText:', redText)
console.log('util.inspect(redText):', util.inspect(redText))