/**
 * Template literal handler for processing tagged template calls
 */

import { StyleChainState, Chalkee } from '../types'
import { getColor, getModifier } from './registry'
import { inspect } from 'util'

// Get the inspect.custom symbol (following your pattern from debug-esm.chain.ts)
const customInspect = inspect.custom ?? Symbol('custom.inspect')

/**
 * Create a styled function that maintains the current state and can be chained
 * Following the pattern from debug-esm.chain.ts
 */
class CallableChalkee {
    // Store state as class properties
    private _colors: any[] = []
    private _modifiers: string[] = []
    private _backgroundColors: any[] = []
    private _isOpen: boolean = false
    private _autoSpacing: boolean = false
    private _text: string = ''

    constructor(
        public parent: CallableChalkee | undefined,
        public args: [string, StyleChainState] | undefined
    ) {
        // Initialize state from args if provided
        if (args) {
            this._text = args[0]
            if (args[1]) {
                this.initializeFromState(args[1])
            }
        }

        // Make this instance callable by setting up the call behavior
        const self = this
        const fn = function (...args: any[]) {
            // When called as a function, we need to handle both cases:
            // 1. When it's a continuation of a chain (no args or template args)
            // 2. When it's a new styling operation (text args)
            if (args.length === 0) {
                // No arguments, return self for chaining
                return self
            } else if (args.length === 1 && typeof args[0] === 'string') {
                // String argument, for chaining behavior we create a new node with parent
                const newInstance = new CallableChalkee(self, [args[0], self.getState()])
                return newInstance
            } else {
                // Handle other cases
                return self._call(args)
            }
        }

        // Copy methods/properties onto fn (following your pattern)
        Object.setPrototypeOf(fn, this)

        return fn as unknown as CallableChalkee
    }

    // Initialize state from a StyleChainState object
    private initializeFromState(state: StyleChainState) {
        this._colors = [...state.colors]
        this._modifiers = [...state.modifiers]
        this._backgroundColors = [...state.backgroundColors]
        this._isOpen = state.isOpen
        this._autoSpacing = state.autoSpacing
    }

    // Get current state as StyleChainState object
    private getState(): StyleChainState {
        return {
            colors: [...this._colors],
            modifiers: [...this._modifiers],
            backgroundColors: [...this._backgroundColors],
            isOpen: this._isOpen,
            previousStyles: this.parent ? this.parent.getState() : undefined,
            autoSpacing: this._autoSpacing
        }
    }

    // Convert state to ANSI escape codes
    private stateToAnsi(): string {
        const codes: number[] = []

        // Add modifier codes
        for (const modifier of this._modifiers) {
            const code = getModifier(modifier)
            if (code !== undefined) {
                codes.push(code)
            }
        }

        // Add foreground color codes
        for (const color of this._colors) {
            codes.push(color.ansiCode)
        }

        // Add background color codes
        for (const color of this._backgroundColors) {
            codes.push(color.ansiCode)
        }

        // If no codes, return empty string
        if (codes.length === 0) {
            return ''
        }

        // Return the ANSI escape sequence
        return `\x1b[${codes.join(';')}m`
    }

    // Create a reset ANSI escape code
    private createReset(): string {
        return '\x1b[0m'
    }

    // Apply styling to text based on the current state
    private applyStyle(text: string): string {
        // If NO_COLOR is set, return plain text
        if ((process as any).env.NO_COLOR) {
            return text
        }

        // If FORCE_COLOR is set to 0, return plain text
        if ((process as any).env.FORCE_COLOR === '0') {
            return text
        }

        const open = this.stateToAnsi()
        const close = this.createReset()

        // If auto-spacing is enabled, add a space before the text (except for the first element)
        if (this._autoSpacing && this.parent) {
            text = ' ' + text
        }

        return open + text + close
    }

    _call(args: any[]) {
        // Handle different call patterns
        if (args.length === 1 && typeof args[0] === 'string') {
            // Regular function call: red('text')
            const newInstance = new CallableChalkee(this, [args[0], this.getState()])
            return newInstance
        } else if (args.length >= 1 && Array.isArray(args[0]) && 'raw' in args[0] && Array.isArray((args[0] as any).raw)) {
            // Template literal call: red`text`
            // For simplicity, convert to regular function call
            const combined = args[0].reduce((acc: string, str: string, i: number) => {
                acc += str
                if (i < args.length - 1) {
                    acc += String(args[i + 1])
                }
                return acc
            }, '')
            const newInstance = new CallableChalkee(this, [combined, this.getState()])
            return newInstance
        } else if (args.length === 0) {
            // Called without arguments
            const newInstance = new CallableChalkee(this, ['', this.getState()])
            return newInstance
        } else {
            // Handle other cases by converting args to string
            const combined = args.map(arg => String(arg)).join('')
            const newInstance = new CallableChalkee(this, [combined, this.getState()])
            return newInstance
        }
    }

    // Following your pattern from debug-esm.chain.ts
    [customInspect](): string {
        // For styling purposes, return the styled text
        // For chained behavior, we need to collect all texts from the chain
        const texts: string[] = []
        let current: CallableChalkee | undefined = this

        // Walk up the chain to collect all texts
        while (current) {
            if (current._text) {
                texts.unshift(current.applyStyle(current._text))
            }
            current = current.parent
        }

        return texts.join(' ')
    }

    // Add toString and valueOf methods
    toString(): string {
        // For chained behavior, we need to collect all texts from the chain
        const texts: string[] = []
        let current: CallableChalkee | undefined = this

        // Walk up the chain to collect all texts
        while (current) {
            if (current._text) {
                texts.unshift(current.applyStyle(current._text))
            }
            current = current.parent
        }

        return texts.join(' ')
    }

    valueOf(): string {
        return this.toString()
    }

    // Helper method to create a new styled function with updated state
    private createStateUpdater(modifierFn: (instance: CallableChalkee) => void): any {
        const self = this

        // Create a new CallableChalkee instance with the updated state
        const newInstance = new CallableChalkee(undefined, ['', self.getState()])

        // Copy the current state to the new instance
        newInstance._colors = [...self._colors]
        newInstance._modifiers = [...self._modifiers]
        newInstance._backgroundColors = [...self._backgroundColors]
        newInstance._isOpen = self._isOpen
        newInstance._autoSpacing = self._autoSpacing

        // Apply the modifier function to update the state
        modifierFn(newInstance)

        // Set the prototype to ensure chainable methods
        Object.setPrototypeOf(newInstance, self)

        return newInstance
    }


    // Chainable color methods - defined as class methods that manipulate instance state
    get red(): any {
        return this.createStateUpdater(instance => {
            const colorDef = getColor('red')
            if (!colorDef) return

            instance._colors = [...instance._colors, colorDef]
            instance._isOpen = true
        })
    }

    get green(): any {
        return this.createStateUpdater(instance => {
            const colorDef = getColor('green')
            if (!colorDef) return

            instance._colors = [...instance._colors, colorDef]
            instance._isOpen = true
        })
    }

    get blue(): any {
        return this.createStateUpdater(instance => {
            const colorDef = getColor('blue')
            if (!colorDef) return

            instance._colors = [...instance._colors, colorDef]
            instance._isOpen = true
        })
    }

    get bold(): any {
        return this.createStateUpdater(instance => {
            // Only add bold if it's not already in the modifiers
            if (!instance._modifiers.includes('bold')) {
                instance._modifiers = [...instance._modifiers, 'bold']
            }
            instance._isOpen = true
        })
    }

    get underline(): any {
        return this.createStateUpdater(instance => {
            // Only add underline if it's not already in the modifiers
            if (!instance._modifiers.includes('underline')) {
                instance._modifiers = [...instance._modifiers, 'underline']
            }
            instance._isOpen = true
        })
    }

    get dim(): any {
        return this.createStateUpdater(instance => {
            // Only add dim if it's not already in the modifiers
            if (!instance._modifiers.includes('dim')) {
                instance._modifiers = [...instance._modifiers, 'dim']
            }
            instance._isOpen = true
        })
    }

    get italic(): any {
        return this.createStateUpdater(instance => {
            // Only add italic if it's not already in the modifiers
            if (!instance._modifiers.includes('italic')) {
                instance._modifiers = [...instance._modifiers, 'italic']
            }
            instance._isOpen = true
        })
    }

    get strikethrough(): any {
        return this.createStateUpdater(instance => {
            // Only add strikethrough if it's not already in the modifiers
            if (!instance._modifiers.includes('strikethrough')) {
                instance._modifiers = [...instance._modifiers, 'strikethrough']
            }
            instance._isOpen = true
        })
    }

    get inverse(): any {
        return this.createStateUpdater(instance => {
            // Only add inverse if it's not already in the modifiers
            if (!instance._modifiers.includes('inverse')) {
                instance._modifiers = [...instance._modifiers, 'inverse']
            }
            instance._isOpen = true
        })
    }

    get hidden(): any {
        return this.createStateUpdater(instance => {
            // Only add hidden if it's not already in the modifiers
            if (!instance._modifiers.includes('hidden')) {
                instance._modifiers = [...instance._modifiers, 'hidden']
            }
            instance._isOpen = true
        })
    }

    // Shorthand aliases
    get b(): any {
        return this.bold
    }

    get d(): any {
        return this.dim
    }

    get u(): any {
        return this.underline
    }

    get i(): any {
        return this.italic
    }

    get s(): any {
        return this.strikethrough
    }
}

export function createStyledFunction(text: string, state: StyleChainState): Chalkee {
    return new CallableChalkee(undefined, [text, state]) as unknown as Chalkee
}