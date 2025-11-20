/**
 * Crayon - Terminal string styling with ANSI escape codes
 * Main entry point with all styles
 */

// Import all plugins to register them
import './plugins/bg-mode'
import './plugins/auto-space'
import './plugins/colors'
import './plugins/shorthand'
import './plugins/emoji'

import { createStyler } from './styler'
import type { Crayon } from './types'
import { createRgbCode, createBgRgbCode, hslToRgb, parseHex, validateRgb } from './ansi'

// Create the main crayon instance
const crayon = createStyler() as Crayon

// Export default crayon object
export default crayon

// Export individual styles for tree-shaking
export const reset = createStyler().reset
export const bold = createStyler().bold
export const dim = createStyler().dim
export const italic = createStyler().italic
export const underline = createStyler().underline
export const inverse = createStyler().inverse
export const hidden = createStyler().hidden
export const strikethrough = createStyler().strikethrough

// Auto-space function
export const as = createStyler().as

// Background color namespace function
export const bg = createStyler().bg

// Foreground colors
export const black = createStyler().black
export const red = createStyler().red
export const green = createStyler().green
export const yellow = createStyler().yellow
export const blue = createStyler().blue
export const magenta = createStyler().magenta
export const cyan = createStyler().cyan
export const white = createStyler().white
export const gray = createStyler().gray
export const grey = createStyler().grey

// Bright foreground colors
export const blackBright = createStyler().blackBright
export const redBright = createStyler().redBright
export const greenBright = createStyler().greenBright
export const yellowBright = createStyler().yellowBright
export const blueBright = createStyler().blueBright
export const magentaBright = createStyler().magentaBright
export const cyanBright = createStyler().cyanBright
export const whiteBright = createStyler().whiteBright

// Background colors
export const bgBlack = createStyler().bgBlack
export const bgRed = createStyler().bgRed
export const bgGreen = createStyler().bgGreen
export const bgYellow = createStyler().bgYellow
export const bgBlue = createStyler().bgBlue
export const bgMagenta = createStyler().bgMagenta
export const bgCyan = createStyler().bgCyan
export const bgWhite = createStyler().bgWhite

// Bright background colors
export const bgBlackBright = createStyler().bgBlackBright
export const bgRedBright = createStyler().bgRedBright
export const bgGreenBright = createStyler().bgGreenBright
export const bgYellowBright = createStyler().bgYellowBright
export const bgBlueBright = createStyler().bgBlueBright
export const bgMagentaBright = createStyler().bgMagentaBright
export const bgCyanBright = createStyler().bgCyanBright
export const bgWhiteBright = createStyler().bgWhiteBright

// Color utilities
export const hex = createStyler().hex
export const rgb = createStyler().rgb
export const bgHex = createStyler().bgHex
export const bgRgb = createStyler().bgRgb

// Shorthand aliases
export const h = createStyler().h // hex
export const r = createStyler().r // reset
export const b = createStyler().b // bold
export const i = createStyler().i // italic
export const u = createStyler().u // underline
export const s = createStyler().s // strikethrough
export const d = createStyler().d // dim

// Export types
export type { StyledFunction, Crayon } from './types'

// Export utility functions
export { createRgbCode, createBgRgbCode, hslToRgb, parseHex, validateRgb }