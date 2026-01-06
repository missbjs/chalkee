import { StyleChainState } from '../types'
import { createStyleState } from "./styler"
import { styleStateToAnsi, createReset, applyStyle } from './styler'
import { attachSpecialBgMethods } from './utils'
import { ChalkeeBase } from './ChalkeeBase'

/**
 * A function that styles text and can be chained with other styles
 * Supports multiple calling patterns:
 * 1. Regular function call: red('text')
 * 2. Template literal: red`text`
 * 3. Curried function calls: red('text')(value)(value2)
 */
interface StyledFunction {
    (text: string): Chalkee
    (strings: TemplateStringsArray, ...values: unknown[]): Chalkee
    (...args: any[]): Chalkee
}

// // Get the inspect.custom symbol once at module level (safe for browser/node environments)
// const customInspectSymbol = util?.inspect?.custom

/**
 * CallableChalkee class that provides chainable styling methods
 * Implements the "fn cum class" pattern where function creation happens in constructor
 */
export class Chalkee extends ChalkeeBase implements StyledFunction {
    constructor(state: StyleChainState, text: string = '') {
        super()

        // Store state
        this._state = state || createStyleState()

        // Store accumulated text (style the initial text if provided)
        if (text) {
            const open = styleStateToAnsi(this._state)
            const closeResult = createReset()
            this._accumulatedText = open + text + closeResult
        } else {
            this._accumulatedText = ''
        }

        // Create a function that will act as the callable instance
        const fn: any = function (this: Chalkee, ...args: any[]) {
            if (args.length === 1 && typeof args[0] === 'string') {
                // For chaining with text, apply styling to this text and combine with accumulated text
                const newText = args[0]
                const newInstance = new Chalkee(fn._state, '')
                const styledNewText = applyStyleWithCodes(newText, fn._state)
                newInstance._accumulatedText = fn._accumulatedText + styledNewText
                preserveBgMode(newInstance, fn)
                return newInstance
            } else if (args.length === 0) {
                // Return self for chaining
                return fn
            } else if (args.length >= 1 && Array.isArray(args[0]) && typeof args[0][0] === 'string' && 'raw' in args[0]) {
                // Handle template literals with interpolated values
                const templateStrings = args[0] as TemplateStringsArray
                const values = args.slice(1)

                // Interpolate the template strings with values
                let combinedText = templateStrings[0]
                for (let i = 0; i < values.length; i++) {
                    combinedText += String(values[i]) + (templateStrings[i + 1] || '')
                }

                const newInstance = new Chalkee(fn._state, '')
                const styledCombinedText = applyStyleWithCodes(combinedText, fn._state)
                newInstance._accumulatedText = fn._accumulatedText + styledCombinedText
                preserveBgMode(newInstance, fn)
                return newInstance
            } else {
                // Handle other cases
                const combined = args.map(arg => String(arg)).join('')
                const newInstance = new Chalkee(fn._state, '')
                const styledCombinedText = applyStyleWithCodes(combined, fn._state)
                newInstance._accumulatedText = fn._accumulatedText + styledCombinedText
                preserveBgMode(newInstance, fn)
                return newInstance
            }
        }

        // Set the prototype to make methods available
        Object.setPrototypeOf(fn, Chalkee.prototype)

        // no need, but working, since there are in class props
        // // Override the function's toString, valueOf, and inspect methods
        // fn.toString = function () {
        //     return fn._accumulatedText
        // }
        // fn.valueOf = function () {
        //     return fn._accumulatedText
        // }
        // Object.defineProperty(fn, customInspectSymbol, {
        //     value: function () {
        //         return fn._accumulatedText
        //     },
        //     writable: true,
        //     enumerable: false,
        //     configurable: true
        // })

        // Set properties on the function object
        fn._state = this._state
        fn._accumulatedText = this._accumulatedText

        // Return the function instead of the class instance
        return fn as any
    }

    // Main call method for when used as a function
    call(text: string): Chalkee
    call(strings: TemplateStringsArray, ...values: unknown[]): Chalkee
    call(...args: any[]): Chalkee
    call(...args: any[]): Chalkee {
        // call<T, A extends any[], R>(this: (this: T, ...args: A) => R, thisArg: T, ...args: A): R {
        if (args.length === 1 && typeof args[0] === 'string') {
            // For chaining with text, apply styling to this text and combine with accumulated text
            const newText = args[0]
            const newInstance = new Chalkee(this._state, '')
            const styledNewText = applyStyleWithCodes(newText, this._state)
            newInstance._accumulatedText = this._accumulatedText + styledNewText
            return newInstance
        } else if (args.length === 0) {
            // Return self for chaining
            return this
        } else {
            // Handle other cases
            const combined = args.map(arg => String(arg)).join('')
            const newInstance = new Chalkee(this._state, '')
            const styledCombinedText = applyStyleWithCodes(combined, this._state)
            newInstance._accumulatedText = this._accumulatedText + styledCombinedText
            return newInstance
        }
    }
}

// Ambient declaration merging to satisfy StyledFunction interface
// The actual implementation is provided by the returned function from the constructor
export interface Chalkee extends StyledFunction { }

// Helper: Preserve background mode flag and attach methods if needed
function preserveBgMode(instance: any, sourceFn: any) {
    if (sourceFn._isInBgMode) {
        (instance as any)._isInBgMode = true
        attachSpecialBgMethods(instance)
    }
}

// Helper: Apply style with proper ANSI codes
function applyStyleWithCodes(text: string, state: StyleChainState): string {
    return applyStyle(text, state)
}

// Factory function to create a callable Chalkee instance
// Following user's requirement: "@template-handler.ts 203-238 only new Chalkee() here.... all these code should be in the class"
function createCallableChalkee(state: StyleChainState, text: string = ''): Chalkee {
    return new Chalkee(state, text) //as ChalkeeBase & StyledFunction
}

// Factory function to create the initial styled function
export function createStyledFunction(text: string, state: StyleChainState) {
    return createCallableChalkee(state, text)
}