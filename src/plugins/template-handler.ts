import { StyleChainState, Chalkee } from '../types'
import { getColor } from './registry'
import { mergeStyleStates, createStyleState, styleStateToAnsi, createReset } from './styler'
import util from 'util'

// Get the inspect.custom symbol once at module level
const customInspectSymbol = util.inspect.custom

/**
 * CallableChalkee class that provides chainable styling methods
 * Implements the "fn cum class" pattern where function creation happens in constructor
 */
class CallableChalkee {
    // Private state properties
    private _state: StyleChainState
    private _accumulatedText: string

    constructor(state: StyleChainState, text: string = '') {
        // Store state
        this._state = state || createStyleState()

        // Store accumulated text (style the initial text if provided)
        if (text) {
            const open = styleStateToAnsi(this._state)
            const close = createReset()
            this._accumulatedText = open + text + close
        } else {
            this._accumulatedText = ''
        }

        // Create a function that will act as the callable instance
        const fn: any = function (this: CallableChalkee, ...args: any[]) {
            if (args.length === 1 && typeof args[0] === 'string') {
                // For chaining with text, apply styling to this text and combine with accumulated text
                const newText = args[0]
                const newInstance = new CallableChalkee(fn._state, '')
                // Combine the previously accumulated text with the new styled text
                const open = styleStateToAnsi(fn._state)
                const close = createReset()
                const styledNewText = open + newText + close
                newInstance._accumulatedText = fn._accumulatedText + styledNewText
                return newInstance
            } else if (args.length === 0) {
                // Return self for chaining
                return fn
            } else {
                // Handle other cases
                const combined = args.map(arg => String(arg)).join('')
                const newInstance = new CallableChalkee(fn._state, '')
                const open = styleStateToAnsi(fn._state)
                const close = createReset()
                const styledCombinedText = open + combined + close
                newInstance._accumulatedText = fn._accumulatedText + styledCombinedText
                return newInstance
            }
        }

        // Set the prototype to make methods available
        Object.setPrototypeOf(fn, CallableChalkee.prototype)

        // Override the function's toString, valueOf, and inspect methods
        fn.toString = function () {
            return fn._accumulatedText
        }
        fn.valueOf = function () {
            return fn._accumulatedText
        }
        Object.defineProperty(fn, customInspectSymbol, {
            value: function () {
                return fn._accumulatedText
            },
            writable: true,
            enumerable: false,
            configurable: true
        })

        // Set properties on the function object
        fn._state = this._state
        fn._accumulatedText = this._accumulatedText

        // Return the function instead of the class instance
        return fn as any
    }

    // String conversion methods
    toString(): string {
        return this._accumulatedText
    }

    valueOf(): string {
        return this._accumulatedText
    }

    // Custom inspect method
    [Symbol.toPrimitive](hint: string): string {
        return this._accumulatedText
    }

    // Main call method for when used as a function
    call(...args: any[]): Chalkee {
        if (args.length === 1 && typeof args[0] === 'string') {
            // For chaining with text, apply styling to this text and combine with accumulated text
            const newText = args[0]
            const newInstance = new CallableChalkee(this._state, '')
            // Combine the previously accumulated text with the new styled text
            const open = styleStateToAnsi(this._state)
            const close = createReset()
            const styledNewText = open + newText + close
            newInstance._accumulatedText = this._accumulatedText + styledNewText
            return newInstance as any as Chalkee
        } else if (args.length === 0) {
            // Return self for chaining
            return this as any as Chalkee
        } else {
            // Handle other cases
            const combined = args.map(arg => String(arg)).join('')
            const newInstance = new CallableChalkee(this._state, '')
            const open = styleStateToAnsi(this._state)
            const close = createReset()
            const styledCombinedText = open + combined + close
            newInstance._accumulatedText = this._accumulatedText + styledCombinedText
            return newInstance as any as Chalkee
        }
    }

    // Chainable color methods
    get red(): Chalkee {
        const currentState = this._state || createStyleState()
        const newState = mergeStyleStates(currentState, {
            ...createStyleState(),
            colors: [getColor('red')!],
            isOpen: true,
            autoSpacing: currentState.autoSpacing || false
        })
        const newInstance = new CallableChalkee(newState, '')
        newInstance._accumulatedText = this._accumulatedText
        return newInstance as any as Chalkee
    }

    get green(): Chalkee {
        const currentState = this._state || createStyleState()
        const newState = mergeStyleStates(currentState, {
            ...createStyleState(),
            colors: [getColor('green')!],
            isOpen: true,
            autoSpacing: currentState.autoSpacing || false
        })
        const newInstance = new CallableChalkee(newState, '')
        newInstance._accumulatedText = this._accumulatedText
        return newInstance as any as Chalkee
    }

    get blue(): Chalkee {
        const currentState = this._state || createStyleState()
        const newState = mergeStyleStates(currentState, {
            ...createStyleState(),
            colors: [getColor('blue')!],
            isOpen: true,
            autoSpacing: currentState.autoSpacing || false
        })
        const newInstance = new CallableChalkee(newState, '')
        newInstance._accumulatedText = this._accumulatedText
        return newInstance as any as Chalkee
    }

    // Chainable modifier methods
    get bold(): Chalkee {
        const currentState = this._state || createStyleState()
        const newState = mergeStyleStates(currentState, {
            ...createStyleState(),
            modifiers: [...(currentState.modifiers || []), 'bold'],
            isOpen: true,
            autoSpacing: currentState.autoSpacing || false
        })
        const newInstance = new CallableChalkee(newState, '')
        newInstance._accumulatedText = this._accumulatedText
        return newInstance as any as Chalkee
    }

    get underline(): Chalkee {
        const currentState = this._state || createStyleState()
        const newState = mergeStyleStates(currentState, {
            ...createStyleState(),
            modifiers: [...(currentState.modifiers || []), 'underline'],
            isOpen: true,
            autoSpacing: currentState.autoSpacing || false
        })
        const newInstance = new CallableChalkee(newState, '')
        newInstance._accumulatedText = this._accumulatedText
        return newInstance as any as Chalkee
    }

    get dim(): Chalkee {
        const currentState = this._state || createStyleState()
        const newState = mergeStyleStates(currentState, {
            ...createStyleState(),
            modifiers: [...(currentState.modifiers || []), 'dim'],
            isOpen: true,
            autoSpacing: currentState.autoSpacing || false
        })
        const newInstance = new CallableChalkee(newState, '')
        newInstance._accumulatedText = this._accumulatedText
        return newInstance as any as Chalkee
    }

    get italic(): Chalkee {
        const currentState = this._state || createStyleState()
        const newState = mergeStyleStates(currentState, {
            ...createStyleState(),
            modifiers: [...(currentState.modifiers || []), 'italic'],
            isOpen: true,
            autoSpacing: currentState.autoSpacing || false
        })
        const newInstance = new CallableChalkee(newState, '')
        newInstance._accumulatedText = this._accumulatedText
        return newInstance as any as Chalkee
    }

    get strikethrough(): Chalkee {
        const currentState = this._state || createStyleState()
        const newState = mergeStyleStates(currentState, {
            ...createStyleState(),
            modifiers: [...(currentState.modifiers || []), 'strikethrough'],
            isOpen: true,
            autoSpacing: currentState.autoSpacing || false
        })
        const newInstance = new CallableChalkee(newState, '')
        newInstance._accumulatedText = this._accumulatedText
        return newInstance as any as Chalkee
    }

    get inverse(): Chalkee {
        const currentState = this._state || createStyleState()
        const newState = mergeStyleStates(currentState, {
            ...createStyleState(),
            modifiers: [...(currentState.modifiers || []), 'inverse'],
            isOpen: true,
            autoSpacing: currentState.autoSpacing || false
        })
        const newInstance = new CallableChalkee(newState, '')
        newInstance._accumulatedText = this._accumulatedText
        return newInstance as any as Chalkee
    }

    get hidden(): Chalkee {
        const currentState = this._state || createStyleState()
        const newState = mergeStyleStates(currentState, {
            ...createStyleState(),
            modifiers: [...(currentState.modifiers || []), 'hidden'],
            isOpen: true,
            autoSpacing: currentState.autoSpacing || false
        })
        const newInstance = new CallableChalkee(newState, '')
        newInstance._accumulatedText = this._accumulatedText
        return newInstance as any as Chalkee
    }

    // Shorthand aliases
    get b(): Chalkee { return this.bold }
    get d(): Chalkee { return this.dim }
    get u(): Chalkee { return this.underline }
    get i(): Chalkee { return this.italic }
    get s(): Chalkee { return this.strikethrough }
}

// Factory function to create a callable Chalkee instance
// Following user's requirement: "@template-handler.ts 203-238 only new Chalkee() here.... all these code should be in the class"
function createCallableChalkee(state: StyleChainState, text: string = ''): Chalkee {
    return new CallableChalkee(state, text) as any as Chalkee
}

// Factory function to create the initial styled function
function createStyledFunction(text: string, state: StyleChainState): Chalkee {
    return createCallableChalkee(state, text)
}

export { createStyledFunction, CallableChalkee }