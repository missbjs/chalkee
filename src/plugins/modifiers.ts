/**
 * Modifiers plugin
 * Provides ANSI modifier codes (bold, italic, underline, etc.) with proper TypeScript augmentation
 */
import type { StylePlugin } from './base'
import type { AnsiCodes } from '../ansi'
import type { StyledFunction } from '../types'
import { register, registerCodes, plugins } from '../registry'

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

export const modifiersPlugin: StylePlugin = {
    name: 'modifiers',

    /**
     * Handle property access for modifier functionality and shorthand aliases
     */
    handleProperty(_target: StyledFunction, prop: string, codes: AnsiCodes[], accumulatedText: string, options?: { createStyler?: Function, ansiCodes?: Record<string, AnsiCodes>, pluginRegistry?: any }): StyledFunction | undefined {
        // Handle common modifier properties for better performance
        if (options?.createStyler && options.ansiCodes) {
            // Only for root styler (no codes, no accumulated text)
            if (codes.length === 0 && accumulatedText === '') {
                switch (prop) {
                    case 'bold':
                        return (options.createStyler as Function)([options.ansiCodes.bold], '')
                    case 'dim':
                        return (options.createStyler as Function)([options.ansiCodes.dim], '')
                    case 'italic':
                        return (options.createStyler as Function)([options.ansiCodes.italic], '')
                    case 'underline':
                        return (options.createStyler as Function)([options.ansiCodes.underline], '')
                    case 'inverse':
                        return (options.createStyler as Function)([options.ansiCodes.inverse], '')
                    case 'hidden':
                        return (options.createStyler as Function)([options.ansiCodes.hidden], '')
                    case 'strikethrough':
                        return (options.createStyler as Function)([options.ansiCodes.strikethrough], '')
                    case 'reset':
                        return (options.createStyler as Function)([options.ansiCodes.reset], '')
                }
            }
            
            // Handle shorthand aliases
            if (prop === 'r' || prop === 'b' || prop === 'i' || prop === 'u' || prop === 's' || prop === 'd') {
                if (prop === 'r') {
                    // Handle reset
                    const resetCodes = handleReset(codes, modifierCodes.reset)
                    return (options.createStyler as Function)(resetCodes, accumulatedText)
                }
                if (prop === 'b' && modifierCodes.bold) {
                    return (options.createStyler as Function)([...codes, modifierCodes.bold], accumulatedText)
                }
                if (prop === 'i' && modifierCodes.italic) {
                    return (options.createStyler as Function)([...codes, modifierCodes.italic], accumulatedText)
                }
                if (prop === 'u' && modifierCodes.underline) {
                    return (options.createStyler as Function)([...codes, modifierCodes.underline], accumulatedText)
                }
                if (prop === 's' && modifierCodes.strikethrough) {
                    return (options.createStyler as Function)([...codes, modifierCodes.strikethrough], accumulatedText)
                }
                if (prop === 'd' && modifierCodes.dim) {
                    return (options.createStyler as Function)([...codes, modifierCodes.dim], accumulatedText)
                }
            }
        }

        // Modifiers are handled through the registered codes
        return undefined
    }
}

// Self-register the plugin when imported
register(modifiersPlugin)

// Augment the StyledFunction interface with modifier properties
// This provides IntelliSense for the modifiers
declare module '../types' {
    interface StyledFunction {
        // Modifiers
        reset: StyledFunction
        bold: StyledFunction
        dim: StyledFunction
        italic: StyledFunction
        underline: StyledFunction
        inverse: StyledFunction
        hidden: StyledFunction
        strikethrough: StyledFunction

        // Shorthand aliases for modifiers
        r: StyledFunction  // reset
        b: StyledFunction  // bold
        i: StyledFunction  // italic
        u: StyledFunction  // underline
        s: StyledFunction  // strikethrough
        d: StyledFunction  // dim
    }
}