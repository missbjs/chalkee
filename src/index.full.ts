// Import all plugins to register them (backward compatibility)
import './plugins/bg'
import './plugins/space'
import './plugins/core'
import './plugins/ext-colors'
import './plugins/util'
import './plugins/modifiers'
import './plugins/emoji'

// Re-export everything from the main index
export * from './index'
export { default } from './index'

// Create a temporary crayon instance to extract named exports
import crayon from './index'

// Export core color functions as named exports for backward compatibility
// Use getters to safely access properties that might not exist immediately
export const black = crayon.black
export const red = crayon.red
export const green = crayon.green
export const yellow = crayon.yellow
export const blue = crayon.blue
export const magenta = crayon.magenta
export const cyan = crayon.cyan
export const white = crayon.white
export const gray = crayon.gray
export const grey = crayon.grey

// Bright foreground colors
export const blackBright = crayon.blackBright
export const redBright = crayon.redBright
export const greenBright = crayon.greenBright
export const yellowBright = crayon.yellowBright
export const blueBright = crayon.blueBright
export const magentaBright = crayon.magentaBright
export const cyanBright = crayon.cyanBright
export const whiteBright = crayon.whiteBright

// Background colors
export const bgBlack = crayon.bgBlack
export const bgRed = crayon.bgRed
export const bgGreen = crayon.bgGreen
export const bgYellow = crayon.bgYellow
export const bgBlue = crayon.bgBlue
export const bgMagenta = crayon.bgMagenta
export const bgCyan = crayon.bgCyan
export const bgWhite = crayon.bgWhite
export const bgGray = crayon.bgGray
export const bgGrey = crayon.bgGrey

// Bright background colors
export const bgBlackBright = crayon.bgBlackBright
export const bgRedBright = crayon.bgRedBright
export const bgGreenBright = crayon.bgGreenBright
export const bgYellowBright = crayon.bgYellowBright
export const bgBlueBright = crayon.bgBlueBright
export const bgMagentaBright = crayon.bgMagentaBright
export const bgCyanBright = crayon.bgCyanBright
export const bgWhiteBright = crayon.bgWhiteBright

// Modifiers
export const reset = crayon.reset
export const bold = crayon.bold
export const dim = crayon.dim
export const italic = crayon.italic
export const underline = crayon.underline
export const overline = crayon.overline
export const inverse = crayon.inverse
export const hidden = crayon.hidden
export const strikethrough = crayon.strikethrough

// Custom colors (if available)
export const pink = crayon.pink
export const orange = crayon.orange
export const purple = crayon.purple
export const lime = crayon.lime
export const coral = crayon.coral
export const teal = crayon.teal

// Custom background colors (if available)
export const bgPink = crayon.bgPink
export const bgOrange = crayon.bgOrange
export const bgPurple = crayon.bgPurple
export const bgLime = crayon.bgLime
export const bgCoral = crayon.bgCoral
export const bgTeal = crayon.bgTeal

// Custom modifiers (if available)
export const blink = crayon.blink
export const doubleUnderline = crayon.doubleUnderline

// Utility functions (if available)
export const hex = crayon.hex
export const rgb = crayon.rgb
export const bgHex = crayon.bgHex
export const bgRgb = crayon.bgRgb
export const h = crayon.h
export const b = crayon.b
export const i = crayon.i
export const u = crayon.u