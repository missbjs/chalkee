// Test that more closely matches our actual implementation
class TestClass {
    private _accumulatedText: string

    constructor(text: string = '') {
        this._accumulatedText = text || ''

        const self = this
        const fn: any = function (this: TestClass, ...args: any[]) {
            console.log('Function called with args:', args)
            return self // Return self for chaining
        }

        // Override the function's toString method
        fn.toString = function () {
            console.log('toString called, self._accumulatedText:', self._accumulatedText)
            return self._accumulatedText
        }

        // Return the function instead of the class instance
        return fn
    }

    toString(): string {
        return this._accumulatedText
    }
}

const testInstance = new TestClass('Hello World')
console.log('testInstance._accumulatedText:', (testInstance as any)._accumulatedText)
console.log('testInstance.toString():', testInstance.toString())
console.log('Direct testInstance:', testInstance)