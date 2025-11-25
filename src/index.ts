import { createStyler } from './styler'
import type { Crayon } from './types'
import { register } from './registry'

// Import core and modifiers plugins to ensure they are registered
import './plugins/core'
import './plugins/modifiers'

// Import utility functions from the util plugin
import { createRgbCode, createBgRgbCode, parseHex, validateRgb, hslToRgb } from './plugins/util'

// Create the main crayon instance
const crayon = createStyler() as Crayon

// Export default crayon object
export default crayon

// Create named exports for common styles to enable tree-shaking
// These are accessed through the main crayon object but exported for convenience
export const red = crayon.red
export const green = crayon.green
export const blue = crayon.blue
export const yellow = crayon.yellow
export const magenta = crayon.magenta
export const cyan = crayon.cyan
export const white = crayon.white
export const black = crayon.black
export const gray = crayon.gray
export const grey = crayon.grey

// Bright colors
export const redBright = crayon.redBright
export const greenBright = crayon.greenBright
export const blueBright = crayon.blueBright
export const yellowBright = crayon.yellowBright
export const magentaBright = crayon.magentaBright
export const cyanBright = crayon.cyanBright
export const whiteBright = crayon.whiteBright
export const blackBright = crayon.blackBright

// Background colors
export const bgRed = crayon.bgRed
export const bgGreen = crayon.bgGreen
export const bgBlue = crayon.bgBlue
export const bgYellow = crayon.bgYellow
export const bgMagenta = crayon.bgMagenta
export const bgCyan = crayon.bgCyan
export const bgWhite = crayon.bgWhite
export const bgBlack = crayon.bgBlack

// Bright background colors
export const bgRedBright = crayon.bgRedBright
export const bgGreenBright = crayon.bgGreenBright
export const bgBlueBright = crayon.bgBlueBright
export const bgYellowBright = crayon.bgYellowBright
export const bgMagentaBright = crayon.bgMagentaBright
export const bgCyanBright = crayon.bgCyanBright
export const bgWhiteBright = crayon.bgWhiteBright
export const bgBlackBright = crayon.bgBlackBright

// Modifiers
export const bold = crayon.bold
export const dim = crayon.dim
export const italic = crayon.italic
export const underline = crayon.underline
export const inverse = crayon.inverse
export const hidden = crayon.hidden
export const strikethrough = crayon.strikethrough
export const reset = crayon.reset

// Shorthand aliases
export const b = crayon.b
export const i = crayon.i
export const u = crayon.u
export const s = crayon.s
export const d = crayon.d
export const r = crayon.r
export const h = crayon.h

// Color utilities
export const hex = crayon.hex
export const rgb = crayon.rgb
export const bgHex = crayon.bgHex
export const bgRgb = crayon.bgRgb

// Special properties
export const as = crayon.as
export const bg = crayon.bg

// Export types
export type { StyledFunction, Crayon } from './types'

// Export utility functions and plugin registry
export { createRgbCode, createBgRgbCode, parseHex, validateRgb, hslToRgb, register }

// Method to register plugins externally
export const registerPluginExternal = (plugin: any) => {
    // This allows external registration of plugins
    // Plugins can be registered by importing and calling this method
    if (plugin && typeof plugin === 'object' && plugin.name) {
        register(plugin)
    }
}

// Method to create a styler with specific options
export const createCrayon = (options?: {
    plugins?: any[],
    // Add other options as needed
}) => {
    // Create a new styler instance
    const instance = createStyler() as Crayon

    // Register any provided plugins
    if (options?.plugins) {
        options.plugins.forEach(plugin => {
            if (plugin && typeof plugin === 'object' && plugin.name) {
                register(plugin)
            }
        })
    }

    return instance
}