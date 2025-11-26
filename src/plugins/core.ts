import type { StylePlugin, AttachPropertiesOptions } from './base'
import type { AnsiCodes } from '../ansi'
import { Styler, createStyler } from '../styler'
import { register, registerCodes, createStylerProperty } from '../registry'

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
    bgGray: { open: '\x1b[100m', close: '\x1b[49m' },
    bgGrey: { open: '\x1b[100m', close: '\x1b[49m' },

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

// Register core codes with the registry
registerCodes(coreCodes)

// Define core color properties directly on the Styler prototype
Object.defineProperties(Styler.prototype, {
    // Foreground colors
    black: createStylerProperty(coreCodes.black, { createStyler }),
    red: createStylerProperty(coreCodes.red, { createStyler }),
    green: createStylerProperty(coreCodes.green, { createStyler }),
    yellow: createStylerProperty(coreCodes.yellow, { createStyler }),
    blue: createStylerProperty(coreCodes.blue, { createStyler }),
    magenta: createStylerProperty(coreCodes.magenta, { createStyler }),
    cyan: createStylerProperty(coreCodes.cyan, { createStyler }),
    white: createStylerProperty(coreCodes.white, { createStyler }),
    gray: createStylerProperty(coreCodes.gray, { createStyler }),
    grey: createStylerProperty(coreCodes.gray, { createStyler }),

    // Bright foreground colors
    blackBright: createStylerProperty(coreCodes.blackBright, { createStyler }),
    redBright: createStylerProperty(coreCodes.redBright, { createStyler }),
    greenBright: createStylerProperty(coreCodes.greenBright, { createStyler }),
    yellowBright: createStylerProperty(coreCodes.yellowBright, { createStyler }),
    blueBright: createStylerProperty(coreCodes.blueBright, { createStyler }),
    magentaBright: createStylerProperty(coreCodes.magentaBright, { createStyler }),
    cyanBright: createStylerProperty(coreCodes.cyanBright, { createStyler }),
    whiteBright: createStylerProperty(coreCodes.whiteBright, { createStyler }),

    // Background colors
    bgBlack: createStylerProperty(coreCodes.bgBlack, { createStyler }),
    bgRed: createStylerProperty(coreCodes.bgRed, { createStyler }),
    bgGreen: createStylerProperty(coreCodes.bgGreen, { createStyler }),
    bgYellow: createStylerProperty(coreCodes.bgYellow, { createStyler }),
    bgBlue: createStylerProperty(coreCodes.bgBlue, { createStyler }),
    bgMagenta: createStylerProperty(coreCodes.bgMagenta, { createStyler }),
    bgCyan: createStylerProperty(coreCodes.bgCyan, { createStyler }),
    bgWhite: createStylerProperty(coreCodes.bgWhite, { createStyler }),
    bgGray: createStylerProperty(coreCodes.bgGray, { createStyler }),
    bgGrey: createStylerProperty(coreCodes.bgGrey, { createStyler }),

    // Bright background colors
    bgBlackBright: createStylerProperty(coreCodes.bgBlackBright, { createStyler }),
    bgRedBright: createStylerProperty(coreCodes.bgRedBright, { createStyler }),
    bgGreenBright: createStylerProperty(coreCodes.bgGreenBright, { createStyler }),
    bgYellowBright: createStylerProperty(coreCodes.bgYellowBright, { createStyler }),
    bgBlueBright: createStylerProperty(coreCodes.bgBlueBright, { createStyler }),
    bgMagentaBright: createStylerProperty(coreCodes.bgMagentaBright, { createStyler }),
    bgCyanBright: createStylerProperty(coreCodes.bgCyanBright, { createStyler }),
    bgWhiteBright: createStylerProperty(coreCodes.bgWhiteBright, { createStyler }),
})

export const corePlugin: StylePlugin = {
    name: 'core',

    /**
     * Handle property access for core color functionality
     */
    handleProperty(_target: Styler, prop: string, codes: AnsiCodes[], accumulatedText: string, options?: { createStyler?: Function }): Styler | undefined {
        // Handle common color properties for better performance
        if (options?.createStyler) {
            // Handle root styler (no codes, no accumulated text)
            if (codes.length === 0 && accumulatedText === '') {
                switch (prop) {
                    case 'red':
                        return (options.createStyler as Function)([coreCodes.red], '')
                    case 'green':
                        return (options.createStyler as Function)([coreCodes.green], '')
                    case 'blue':
                        return (options.createStyler as Function)([coreCodes.blue], '')
                    case 'yellow':
                        return (options.createStyler as Function)([coreCodes.yellow], '')
                    case 'magenta':
                        return (options.createStyler as Function)([coreCodes.magenta], '')
                    case 'cyan':
                        return (options.createStyler as Function)([coreCodes.cyan], '')
                    case 'white':
                        return (options.createStyler as Function)([coreCodes.white], '')
                    case 'black':
                        return (options.createStyler as Function)([coreCodes.black], '')
                    case 'gray':
                    case 'grey':
                        return (options.createStyler as Function)([coreCodes.gray], '')
                    default:
                        // Handle other properties that might exist in coreCodes but aren't explicitly listed
                        if (coreCodes.hasOwnProperty(prop)) {
                            return (options.createStyler as Function)([coreCodes[prop as keyof typeof coreCodes]], '')
                        }
                }
            }
            // Handle chaining (when there are already codes)
            else {
                switch (prop) {
                    case 'red':
                        return (options.createStyler as Function)([...codes, coreCodes.red], accumulatedText)
                    case 'green':
                        return (options.createStyler as Function)([...codes, coreCodes.green], accumulatedText)
                    case 'blue':
                        return (options.createStyler as Function)([...codes, coreCodes.blue], accumulatedText)
                    case 'yellow':
                        return (options.createStyler as Function)([...codes, coreCodes.yellow], accumulatedText)
                    case 'magenta':
                        return (options.createStyler as Function)([...codes, coreCodes.magenta], accumulatedText)
                    case 'cyan':
                        return (options.createStyler as Function)([...codes, coreCodes.cyan], accumulatedText)
                    case 'white':
                        return (options.createStyler as Function)([...codes, coreCodes.white], accumulatedText)
                    case 'black':
                        return (options.createStyler as Function)([...codes, coreCodes.black], accumulatedText)
                    case 'gray':
                    case 'grey':
                        return (options.createStyler as Function)([...codes, coreCodes.gray], accumulatedText)
                    default:
                        // Handle other properties that might exist in coreCodes but aren't explicitly listed
                        if (coreCodes.hasOwnProperty(prop)) {
                            return (options.createStyler as Function)([...codes, coreCodes[prop as keyof typeof coreCodes]], accumulatedText)
                        }
                }
            }
        }

        // Core plugin doesn't need special handling methods for better performance in other cases
        return undefined
    },

    /**
     * Attach core color properties directly to a styler function
     * This provides better performance than proxy-based property access
     */
    attachProperties(stylerFunction: Function, options: AttachPropertiesOptions): void {
        const { createStyler } = options

        // Attach foreground colors
        Object.defineProperties(stylerFunction, {
            red: createStylerProperty(coreCodes.red, { createStyler }),
            green: createStylerProperty(coreCodes.green, { createStyler }),
            blue: createStylerProperty(coreCodes.blue, { createStyler }),
            yellow: createStylerProperty(coreCodes.yellow, { createStyler }),
            magenta: createStylerProperty(coreCodes.magenta, { createStyler }),
            cyan: createStylerProperty(coreCodes.cyan, { createStyler }),
            white: createStylerProperty(coreCodes.white, { createStyler }),
            black: createStylerProperty(coreCodes.black, { createStyler }),
            gray: createStylerProperty(coreCodes.gray, { createStyler }),
            grey: createStylerProperty(coreCodes.gray, { createStyler })
        })

        // Attach bright foreground colors
        Object.defineProperties(stylerFunction, {
            redBright: createStylerProperty(coreCodes.redBright, { createStyler }),
            greenBright: createStylerProperty(coreCodes.greenBright, { createStyler }),
            blueBright: createStylerProperty(coreCodes.blueBright, { createStyler }),
            yellowBright: createStylerProperty(coreCodes.yellowBright, { createStyler }),
            magentaBright: createStylerProperty(coreCodes.magentaBright, { createStyler }),
            cyanBright: createStylerProperty(coreCodes.cyanBright, { createStyler }),
            whiteBright: createStylerProperty(coreCodes.whiteBright, { createStyler }),
            blackBright: createStylerProperty(coreCodes.blackBright, { createStyler })
        })

        // Attach background colors
        Object.defineProperties(stylerFunction, {
            bgRed: createStylerProperty(coreCodes.bgRed, { createStyler }),
            bgGreen: createStylerProperty(coreCodes.bgGreen, { createStyler }),
            bgBlue: createStylerProperty(coreCodes.bgBlue, { createStyler }),
            bgYellow: createStylerProperty(coreCodes.bgYellow, { createStyler }),
            bgMagenta: createStylerProperty(coreCodes.bgMagenta, { createStyler }),
            bgCyan: createStylerProperty(coreCodes.bgCyan, { createStyler }),
            bgWhite: createStylerProperty(coreCodes.bgWhite, { createStyler }),
            bgBlack: createStylerProperty(coreCodes.bgBlack, { createStyler }),
            bgGray: createStylerProperty(coreCodes.bgGray, { createStyler }),
            bgGrey: createStylerProperty(coreCodes.bgGray, { createStyler })
        })

        // Attach bright background colors
        Object.defineProperties(stylerFunction, {
            bgRedBright: createStylerProperty(coreCodes.bgRedBright, { createStyler }),
            bgGreenBright: createStylerProperty(coreCodes.bgGreenBright, { createStyler }),
            bgBlueBright: createStylerProperty(coreCodes.bgBlueBright, { createStyler }),
            bgYellowBright: createStylerProperty(coreCodes.bgYellowBright, { createStyler }),
            bgMagentaBright: createStylerProperty(coreCodes.bgMagentaBright, { createStyler }),
            bgCyanBright: createStylerProperty(coreCodes.bgCyanBright, { createStyler }),
            bgWhiteBright: createStylerProperty(coreCodes.bgWhiteBright, { createStyler }),
            bgBlackBright: createStylerProperty(coreCodes.bgBlackBright, { createStyler })
        })
    }
}

// Self-register the plugin when imported
register(corePlugin)

// Augment the Styler interface with core color properties
// This provides IntelliSense for the core colors
declare module '../styler' {
    interface Styler {
        // Foreground colors
        black: Styler
        red: Styler
        green: Styler
        yellow: Styler
        blue: Styler
        magenta: Styler
        cyan: Styler
        white: Styler
        gray: Styler
        grey: Styler

        // Bright foreground colors
        blackBright: Styler
        redBright: Styler
        greenBright: Styler
        yellowBright: Styler
        blueBright: Styler
        magentaBright: Styler
        cyanBright: Styler
        whiteBright: Styler

        // Background colors
        bgBlack: Styler
        bgRed: Styler
        bgGreen: Styler
        bgYellow: Styler
        bgBlue: Styler
        bgMagenta: Styler
        bgCyan: Styler
        bgWhite: Styler
        bgGray: Styler
        bgGrey: Styler

        // Bright background colors
        bgBlackBright: Styler
        bgRedBright: Styler
        bgGreenBright: Styler
        bgYellowBright: Styler
        bgBlueBright: Styler
        bgMagentaBright: Styler
        bgCyanBright: Styler
        bgWhiteBright: Styler
    }
}