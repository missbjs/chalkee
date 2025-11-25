/**
 * Core plugin
 * Provides core ANSI color codes with proper TypeScript augmentation
 */
import type { StylePlugin } from './base'
import type { AnsiCodes } from '../ansi'
import type { StyledFunction } from '../types'
import { register, registerCodes } from '../registry'

// Core ANSI codes - defined at module level
const coreCodes = {
    // Foreground colors
    black: { open: '\x1b[30m', close: '\x1b[39m' },
    red: { open: '\x1b[31m', close: '\x1b[39m' },
    green: { open: '\x1b[32m', close: '\x1b[39m' },
    yellow: { open: '\x1b[33m', close: '\x1b[39m' },
    blue: { open: '\x1b[34m', close: '\x1b[39m' },
    magenta: { open: '\x1b[35m', close: '\x1b[39m' },
    cyan: { open: '\x1b[36m', close: '\x1b[39m' },
    white: { open: '\x1b[37m', close: '\x1b[39m' },
    gray: { open: '\x1b[90m', close: '\x1b[39m' },
    grey: { open: '\x1b[90m', close: '\x1b[39m' },

    // Bright foreground colors
    blackBright: { open: '\x1b[90m', close: '\x1b[39m' },
    redBright: { open: '\x1b[91m', close: '\x1b[39m' },
    greenBright: { open: '\x1b[92m', close: '\x1b[39m' },
    yellowBright: { open: '\x1b[93m', close: '\x1b[39m' },
    blueBright: { open: '\x1b[94m', close: '\x1b[39m' },
    magentaBright: { open: '\x1b[95m', close: '\x1b[39m' },
    cyanBright: { open: '\x1b[96m', close: '\x1b[39m' },
    whiteBright: { open: '\x1b[97m', close: '\x1b[39m' },

    // Background colors
    bgBlack: { open: '\x1b[40m', close: '\x1b[49m' },
    bgRed: { open: '\x1b[41m', close: '\x1b[49m' },
    bgGreen: { open: '\x1b[42m', close: '\x1b[49m' },
    bgYellow: { open: '\x1b[43m', close: '\x1b[49m' },
    bgBlue: { open: '\x1b[44m', close: '\x1b[49m' },
    bgMagenta: { open: '\x1b[45m', close: '\x1b[49m' },
    bgCyan: { open: '\x1b[46m', close: '\x1b[49m' },
    bgWhite: { open: '\x1b[47m', close: '\x1b[49m' },

    // Bright background colors
    bgBlackBright: { open: '\x1b[100m', close: '\x1b[49m' },
    bgRedBright: { open: '\x1b[101m', close: '\x1b[49m' },
    bgGreenBright: { open: '\x1b[102m', close: '\x1b[49m' },
    bgYellowBright: { open: '\x1b[103m', close: '\x1b[49m' },
    bgBlueBright: { open: '\x1b[104m', close: '\x1b[49m' },
    bgMagentaBright: { open: '\x1b[105m', close: '\x1b[49m' },
    bgCyanBright: { open: '\x1b[106m', close: '\x1b[49m' },
    bgWhiteBright: { open: '\x1b[107m', close: '\x1b[49m' },
}

// Register core codes when module is imported
registerCodes(coreCodes)

export const corePlugin: StylePlugin = {
    name: 'core',

    /**
     * Handle property access for core color functionality
     */
    handleProperty(_target: StyledFunction, prop: string, codes: AnsiCodes[], accumulatedText: string, options?: { createStyler?: Function, ansiCodes?: Record<string, AnsiCodes> }): StyledFunction | undefined {
        // Handle common color properties for better performance
        if (options?.createStyler && options.ansiCodes) {
            // Only for root styler (no codes, no accumulated text)
            if (codes.length === 0 && accumulatedText === '') {
                switch (prop) {
                    case 'red':
                        return (options.createStyler as Function)([options.ansiCodes.red], '')
                    case 'green':
                        return (options.createStyler as Function)([options.ansiCodes.green], '')
                    case 'blue':
                        return (options.createStyler as Function)([options.ansiCodes.blue], '')
                    case 'yellow':
                        return (options.createStyler as Function)([options.ansiCodes.yellow], '')
                    case 'magenta':
                        return (options.createStyler as Function)([options.ansiCodes.magenta], '')
                    case 'cyan':
                        return (options.createStyler as Function)([options.ansiCodes.cyan], '')
                    case 'white':
                        return (options.createStyler as Function)([options.ansiCodes.white], '')
                    case 'black':
                        return (options.createStyler as Function)([options.ansiCodes.black], '')
                    case 'gray':
                    case 'grey':
                        return (options.createStyler as Function)([options.ansiCodes.gray], '')
                }
            }
        }

        // Core plugin doesn't need special handling methods for better performance in other cases
        return undefined
    }
}

// Self-register the plugin when imported
register(corePlugin)

// Augment the StyledFunction interface with core color properties
// This provides IntelliSense for the core colors
declare module '../types' {
    interface StyledFunction {
        // Foreground colors
        black: StyledFunction
        red: StyledFunction
        green: StyledFunction
        yellow: StyledFunction
        blue: StyledFunction
        magenta: StyledFunction
        cyan: StyledFunction
        white: StyledFunction
        gray: StyledFunction
        grey: StyledFunction

        // Bright foreground colors
        blackBright: StyledFunction
        redBright: StyledFunction
        greenBright: StyledFunction
        yellowBright: StyledFunction
        blueBright: StyledFunction
        magentaBright: StyledFunction
        cyanBright: StyledFunction
        whiteBright: StyledFunction

        // Background colors
        bgBlack: StyledFunction
        bgRed: StyledFunction
        bgGreen: StyledFunction
        bgYellow: StyledFunction
        bgBlue: StyledFunction
        bgMagenta: StyledFunction
        bgCyan: StyledFunction
        bgWhite: StyledFunction

        // Bright background colors
        bgBlackBright: StyledFunction
        bgRedBright: StyledFunction
        bgGreenBright: StyledFunction
        bgYellowBright: StyledFunction
        bgBlueBright: StyledFunction
        bgMagentaBright: StyledFunction
        bgCyanBright: StyledFunction
        bgWhiteBright: StyledFunction
    }
}