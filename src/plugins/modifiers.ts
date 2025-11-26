/**
 * Modifiers plugin
 * Provides ANSI modifier codes (bold, italic, underline, etc.) with proper TypeScript augmentation
 */
import type { StylePlugin } from './base'
import type { AnsiCodes } from '../ansi'
import { Styler, createStyler } from '../styler'
import { register, registerCodes, plugins, createStylerProperty } from '../registry'

// Handle reset operation - clear special mode markers and add reset code
function handleReset(codes: AnsiCodes[], resetCode: AnsiCodes): AnsiCodes[] {
    // Quick exit if no plugins have isMarkerCode method
    let hasIsMarkerCode = false
    for (let i = 0; i < plugins.length; i++) {
        if (plugins[i].isMarkerCode) {
            hasIsMarkerCode = true
            break
        }
    }

    if (!hasIsMarkerCode) {
        // Add the reset code directly
        return [...codes, resetCode]
    }

    // Filter out mode markers by asking each plugin
    const codesWithoutModes: AnsiCodes[] = []
    for (let i = 0; i < codes.length; i++) {
        const code = codes[i]
        let isMarker = false
        // Ask each plugin if this is a marker code
        for (let j = 0; j < plugins.length; j++) {
            const plugin = plugins[j]
            if (plugin.isMarkerCode && plugin.isMarkerCode(code)) {
                isMarker = true
                break
            }
        }
        if (!isMarker) {
            codesWithoutModes.push(code)
        }
    }
    // Add the reset code
    return [...codesWithoutModes, resetCode]
}

// Modifier ANSI codes - defined at module level
const modifierCodes = {
    // Modifiers
    reset: { open: '\x1b[0m', close: '\x1b[0m' },
    bold: { open: '\x1b[1m', close: '\x1b[22m' },
    dim: { open: '\x1b[2m', close: '\x1b[22m' },
    italic: { open: '\x1b[3m', close: '\x1b[23m' },
    underline: { open: '\x1b[4m', close: '\x1b[24m' },
    inverse: { open: '\x1b[7m', close: '\x1b[27m' },
    hidden: { open: '\x1b[8m', close: '\x1b[28m' },
    strikethrough: { open: '\x1b[9m', close: '\x1b[29m' },
}

// Register modifier codes when module is imported
registerCodes(modifierCodes)

// Create a mapping of properties to their corresponding codes for better performance
const propertyCodeMap: Record<string, AnsiCodes | undefined> = {
    // Standard modifiers
    'bold': modifierCodes.bold,
    'dim': modifierCodes.dim,
    'italic': modifierCodes.italic,
    'underline': modifierCodes.underline,
    'inverse': modifierCodes.inverse,
    'hidden': modifierCodes.hidden,
    'strikethrough': modifierCodes.strikethrough,
    'reset': modifierCodes.reset,

    // Shorthand aliases
    'b': modifierCodes.bold,
    'd': modifierCodes.dim,
    'i': modifierCodes.italic,
    'u': modifierCodes.underline,
    's': modifierCodes.strikethrough,
    'r': modifierCodes.reset
}

// Define modifier properties directly on the Styler prototype
Object.defineProperties(Styler.prototype, {
    // Modifiers
    reset: createStylerProperty(modifierCodes.reset, { createStyler }),
    bold: createStylerProperty(modifierCodes.bold, { createStyler }),
    dim: createStylerProperty(modifierCodes.dim, { createStyler }),
    italic: createStylerProperty(modifierCodes.italic, { createStyler }),
    underline: createStylerProperty(modifierCodes.underline, { createStyler }),
    inverse: createStylerProperty(modifierCodes.inverse, { createStyler }),
    hidden: createStylerProperty(modifierCodes.hidden, { createStyler }),
    strikethrough: createStylerProperty(modifierCodes.strikethrough, { createStyler }),

    // Shorthand aliases
    r: createStylerProperty(modifierCodes.reset, { createStyler }),
    b: createStylerProperty(modifierCodes.bold, { createStyler }),
    i: createStylerProperty(modifierCodes.italic, { createStyler }),
    u: createStylerProperty(modifierCodes.underline, { createStyler }),
    s: createStylerProperty(modifierCodes.strikethrough, { createStyler }),
    d: createStylerProperty(modifierCodes.dim, { createStyler })
})

export const modifiersPlugin: StylePlugin = {
    name: 'modifiers',

    /**
     * Handle property access for modifier functionality and shorthand aliases
     */
    handleProperty(_target: Styler, prop: string, codes: AnsiCodes[], accumulatedText: string, options?: { createStyler?: Function, ansiCodes?: Record<string, AnsiCodes>, pluginRegistry?: any }): Styler | undefined {
        // Handle common modifier properties for better performance
        if (options?.createStyler && options.ansiCodes) {
            // Check if this is a known modifier property
            const modifierCode = propertyCodeMap[prop]

            // Only for root styler (no codes, no accumulated text) - direct property access
            if (codes.length === 0 && accumulatedText === '' && modifierCode) {
                return (options.createStyler as Function)([modifierCode], '')
            }

            // Handle special cases with fallback approach
            switch (prop) {
                case 'r':
                case 'reset':
                    // Handle reset with full reset logic
                    const resetCodes = handleReset(codes, modifierCodes.reset)
                    return (options.createStyler as Function)(resetCodes, accumulatedText)

                case 'b':
                case 'bold':
                    if (modifierCodes.bold) {
                        return (options.createStyler as Function)([...codes, modifierCodes.bold], accumulatedText)
                    }
                    break

                case 'i':
                case 'italic':
                    if (modifierCodes.italic) {
                        return (options.createStyler as Function)([...codes, modifierCodes.italic], accumulatedText)
                    }
                    break

                case 'u':
                case 'underline':
                    if (modifierCodes.underline) {
                        return (options.createStyler as Function)([...codes, modifierCodes.underline], accumulatedText)
                    }
                    break

                case 's':
                case 'strikethrough':
                    if (modifierCodes.strikethrough) {
                        return (options.createStyler as Function)([...codes, modifierCodes.strikethrough], accumulatedText)
                    }
                    break

                case 'd':
                case 'dim':
                    if (modifierCodes.dim) {
                        return (options.createStyler as Function)([...codes, modifierCodes.dim], accumulatedText)
                    }
                    break

                default:
                    // Fallback to standard modifier handling if it's a known modifier
                    if (modifierCode) {
                        return (options.createStyler as Function)([...codes, modifierCode], accumulatedText)
                    }
            }
        }

        // Modifiers are handled through the registered codes
        return undefined
    },
}

// Self-register the plugin when imported
register(modifiersPlugin)

// Augment the Styler interface with modifier properties
// This provides IntelliSense for the modifiers
declare module '../styler' {
    interface Styler {
        // Modifiers
        reset: Styler
        bold: Styler
        dim: Styler
        italic: Styler
        underline: Styler
        inverse: Styler
        hidden: Styler
        strikethrough: Styler

        // Shorthand aliases
        r: Styler
        b: Styler
        i: Styler
        u: Styler
        s: Styler
        d: Styler
    }
}