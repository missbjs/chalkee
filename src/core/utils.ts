import { getColor, parseHex, rgbToAnsi256 } from './registry'
import { createStyleState } from "./styler"
import { mergeStyleStates } from './styler'
import { ChalkeeBase } from './ChalkeeBase'

// Extend the ChalkeeBase interface with utility methods
declare module './ChalkeeBase' {
    interface ChalkeeBase {
        createBgColor(colorName: string): ChalkeeBase
        createReset(): ChalkeeBase
        createAutoSpacing(): ChalkeeBase
        createHexColor(color: string): ChalkeeBase
        createRgbColor(r: number, g: number, b: number): ChalkeeBase
        createBgHexColor(color: string): ChalkeeBase
        createBgRgbColor(r: number, g: number, b: number): ChalkeeBase
    }
}

// Attach utility methods to ChalkeeBase prototype
function attachUtilMethods(ChalkeeBase: any) {
    // Background color creator
    Object.defineProperty(ChalkeeBase.prototype, 'createBgColor', {
        value: function createBgColor(this: typeof ChalkeeBase, colorName: string): ChalkeeBase {
            const currentState = this._state || createStyleState()
            const colorDef = getColor(colorName)
            if (!colorDef) {
                return this as any as ChalkeeBase
            }

            const newState = mergeStyleStates(currentState, {
                ...createStyleState(),
                backgroundColors: [colorDef],
                isOpen: true,
                autoSpacing: currentState.autoSpacing || false
            })
            const newInstance = new (this.constructor as any)(newState, '')
            newInstance._accumulatedText = this._accumulatedText
            return newInstance as any as ChalkeeBase
        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    // Background color replacement creator (for .bg mode)
    Object.defineProperty(ChalkeeBase.prototype, 'createBgReplace', {
        value: function createBgReplace(this: typeof ChalkeeBase, colorName: string): ChalkeeBase {
            const currentState = this._state || createStyleState()
            const colorDef = getColor(colorName)
            if (!colorDef) {
                return this as any as ChalkeeBase
            }

            // For .bg mode, we want to replace the background color, not add to it
            // We also want a clean state without previous foreground colors or modifiers
            const newState = {
                ...createStyleState(), // Start with a clean state
                backgroundColors: [colorDef], // Set only the new background color
                isOpen: true,
                autoSpacing: currentState.autoSpacing || false,
                previousStyles: currentState // Use the current state as the previous styles
            }
            const newInstance = new (this.constructor as any)(newState, '')
            newInstance._accumulatedText = (this as any)._accumulatedText || '';
            // Preserve background mode flag
            (newInstance as any)._isInBgMode = true

            // ALSO attach special color methods to this instance for continued .bg mode chaining
            attachSpecialBgMethods(newInstance)

            return newInstance as any as ChalkeeBase
        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    // Reset creator
    Object.defineProperty(ChalkeeBase.prototype, 'createReset', {
        value: function createReset(this: typeof ChalkeeBase): ChalkeeBase {
            const currentState = this._state || createStyleState()
            // For reset, we want to completely clear all styles, not merge them
            const newState = {
                ...createStyleState(),
                colors: [],
                modifiers: [],
                backgroundColors: [],
                isOpen: false,
                autoSpacing: currentState.autoSpacing || false
            }
            const newInstance = new (this.constructor as any)(newState, '')
            newInstance._accumulatedText = this._accumulatedText
            return newInstance as any as ChalkeeBase
        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    // Auto-spacing creator
    Object.defineProperty(ChalkeeBase.prototype, 'createAutoSpacing', {
        value: function createAutoSpacing(this: typeof ChalkeeBase): ChalkeeBase {
            const currentState = this._state || createStyleState()
            const newState = mergeStyleStates(currentState, {
                ...createStyleState(),
                isOpen: true,
                autoSpacing: true
            })
            const newInstance = new (this.constructor as any)(newState, '')
            newInstance._accumulatedText = this._accumulatedText
            // Preserve background mode flag if present
            if ((this as any)._isInBgMode) {
                (newInstance as any)._isInBgMode = true
            }
            // Attach special bg methods to enable .bg chaining from .as
            Object.defineProperty(newInstance, 'bg', {
                get: function () {
                    const bgInstance = newInstance.createBgMode()
                    // Attach special color methods for .bg mode chaining
                    attachSpecialBgMethods(bgInstance)
                    return bgInstance
                },
                enumerable: true,
                configurable: true
            })
            return newInstance as any as ChalkeeBase
        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    // Background mode creator
    Object.defineProperty(ChalkeeBase.prototype, 'createBgMode', {
        value: function createBgMode(this: typeof ChalkeeBase): ChalkeeBase {
            const currentState = (this as any)._state || createStyleState()
            // Create a new instance that merges with existing state
            const newState = mergeStyleStates(currentState, {
                ...createStyleState(),
                isOpen: true,
                autoSpacing: currentState.autoSpacing || false
            })
            const newInstance = new (this.constructor as any)(newState, '')
            newInstance._accumulatedText = (this as any)._accumulatedText || '';
            // Add a flag to indicate we're in background mode
            (newInstance as any)._isInBgMode = true
            return newInstance as any as ChalkeeBase
        },
        writable: true,
        enumerable: false,
        configurable: true
    })
    // Hex color creator
    Object.defineProperty(ChalkeeBase.prototype, 'createHexColor', {
        value: function createHexColor(this: typeof ChalkeeBase, color: string): ChalkeeBase {
            const currentState = this._state || createStyleState()

            // Parse hex color
            const hexCode = parseHex(color)
            if (!hexCode) {
                return this as any as ChalkeeBase
            }

            const [r, g, b] = hexCode
            const ansi256 = rgbToAnsi256(r, g, b)

            // Create state with the hex color code
            const newState = mergeStyleStates(currentState, {
                ...createStyleState(),
                isOpen: true,
                autoSpacing: currentState.autoSpacing || false,
                hexColorCode: `\x1b[38;5;${ansi256}m` as any
            })
            const newInstance = new (this.constructor as any)(newState, '')
            newInstance._accumulatedText = this._accumulatedText

            return newInstance as any as ChalkeeBase
        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    // RGB color creator
    Object.defineProperty(ChalkeeBase.prototype, 'createRgbColor', {
        value: function createRgbColor(this: typeof ChalkeeBase, r: number, g: number, b: number): ChalkeeBase {
            const currentState = this._state || createStyleState()

            // Convert RGB to ANSI 256 color
            const ansi256 = rgbToAnsi256(r, g, b)

            // Create state with the RGB color code
            const newState = mergeStyleStates(currentState, {
                ...createStyleState(),
                isOpen: true,
                autoSpacing: currentState.autoSpacing || false,
                rgbColorCode: `\x1b[38;5;${ansi256}m` as any
            })
            const newInstance = new (this.constructor as any)(newState, '')
            newInstance._accumulatedText = this._accumulatedText

            return newInstance as any as ChalkeeBase
        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    // Background hex color creator
    Object.defineProperty(ChalkeeBase.prototype, 'createBgHexColor', {
        value: function createBgHexColor(this: typeof ChalkeeBase, color: string): ChalkeeBase {
            const currentState = this._state || createStyleState()

            // Parse hex color
            const hexCode = parseHex(color)
            if (!hexCode) {
                return this as any as ChalkeeBase
            }

            const [r, g, b] = hexCode
            const ansi256 = rgbToAnsi256(r, g, b)

            // Create state with the background hex color code
            const newState = mergeStyleStates(currentState, {
                ...createStyleState(),
                isOpen: true,
                autoSpacing: currentState.autoSpacing || false,
                bgHexColorCode: `\x1b[48;5;${ansi256}m` as any
            })
            const newInstance = new (this.constructor as any)(newState, '')
            newInstance._accumulatedText = this._accumulatedText

            return newInstance as any as ChalkeeBase
        },
        writable: true,
        enumerable: false,
        configurable: true
    })

    // Background RGB color creator
    Object.defineProperty(ChalkeeBase.prototype, 'createBgRgbColor', {
        value: function createBgRgbColor(this: typeof ChalkeeBase, r: number, g: number, b: number): ChalkeeBase {
            const currentState = this._state || createStyleState()

            // Convert RGB to ANSI 256 color
            const ansi256 = rgbToAnsi256(r, g, b)

            // Create state with the background RGB color code
            const newState = mergeStyleStates(currentState, {
                ...createStyleState(),
                isOpen: true,
                autoSpacing: currentState.autoSpacing || false,
                bgRgbColorCode: `\x1b[48;5;${ansi256}m` as any
            })
            const newInstance = new (this.constructor as any)(newState, '')
            newInstance._accumulatedText = this._accumulatedText

            return newInstance as any as ChalkeeBase
        },
        writable: true,
        enumerable: false,
        configurable: true
    })
}

// Helper function to attach special color methods for .bg mode
// Pre-create property descriptors to avoid recreating them for each instance
const BG_PROPERTY_DESCRIPTORS: Record<string, PropertyDescriptor> = {}

function createBgPropertyDescriptor(colorName: string, bgColorName: string): PropertyDescriptor {
    const key = `${colorName}_${bgColorName}`
    if (BG_PROPERTY_DESCRIPTORS[key]) {
        return BG_PROPERTY_DESCRIPTORS[key]
    }

    const descriptor: PropertyDescriptor = {
        get(this: any) {
            return this.createBgReplace(bgColorName)
        },
        enumerable: true,
        configurable: true
    }

    BG_PROPERTY_DESCRIPTORS[key] = descriptor
    return descriptor
}

function attachSpecialBgMethods(instance: any) {
    // Attach all foreground color methods to this instance to enable chaining
    const colorMap: Record<string, string> = {
        red: 'bgRed',
        green: 'bgGreen',
        blue: 'bgBlue',
        yellow: 'bgYellow',
        magenta: 'bgMagenta',
        cyan: 'bgCyan',
        white: 'bgWhite',
        black: 'bgBlack',
        gray: 'bgBlackBright',
        grey: 'bgBlackBright',
        redBright: 'bgRedBright',
        greenBright: 'bgGreenBright',
        blueBright: 'bgBlueBright',
        yellowBright: 'bgYellowBright',
        magentaBright: 'bgMagentaBright',
        cyanBright: 'bgCyanBright',
        whiteBright: 'bgWhiteBright',
        blackBright: 'bgBlackBright'
    }

    // Reuse cached descriptors for performance
    for (const [colorName, bgColorName] of Object.entries(colorMap)) {
        const descriptor = createBgPropertyDescriptor(colorName, bgColorName)
        Object.defineProperty(instance, colorName, descriptor)
    }
}

// Automatically attach the methods when this module is imported
attachUtilMethods(ChalkeeBase)

export { attachSpecialBgMethods }