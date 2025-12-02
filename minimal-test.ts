// Minimal test to understand the issue
const obj: any = {
    _accumulatedText: 'Hello Red'
}

const self: any = obj

const fn: any = function () {
    console.log('Function called')
    return 'function result'
}

fn.toString = function () {
    console.log('toString called, self._accumulatedText:', self._accumulatedText)
    return self._accumulatedText
}

console.log('fn.toString():', fn.toString())
console.log('Direct fn:', fn)