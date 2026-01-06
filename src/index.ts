/**
 * Chalkee - Advanced terminal styling with plugin architecture, tree-shaking, and template literal chaining
 */

import { createStyleState } from "./core/styler"
import { createStyledFunction } from './core/Chalkee'
export { Chalkee } from './core/Chalkee'
import {
    parseHex,
    rgbToAnsi256
} from './core/registry'

// Import side-effect modules to attach methods to ChalkeeBase
import './core/callable-helpers'
import './core/ansi-colors'
import './core/modifiers'

// Create the initial chalkee instance
const chalkee = createStyledFunction('', createStyleState())// as Chalkee

// Export the default chalkee instance
export default chalkee

// Re-export colors from ansi-colors module
export {
    red,
    green,
    blue,
    yellow,
    magenta,
    cyan,
    white,
    black,
    gray,
    grey,
    redBright,
    greenBright,
    blueBright,
    yellowBright,
    magentaBright,
    cyanBright,
    whiteBright,
    blackBright,
    bgRed,
    bgGreen,
    bgBlue,
    bgYellow,
    bgMagenta,
    bgCyan,
    bgWhite,
    bgBlack,
    bgRedBright,
    bgGreenBright,
    bgBlueBright,
    bgYellowBright,
    bgMagentaBright,
    bgCyanBright,
    bgWhiteBright,
    bgBlackBright
} from './core/ansi-colors'

// Re-export modifier methods from modifiers module
export {
    bold,
    dim,
    italic,
    underline,
    strikethrough,
    inverse,
    hidden,
    reset,
    b,
    d,
    i,
    u,
    s,
    r,
    as,
    bg,
    hex,
    rgb,
    bgHex,
    bgRgb
} from './core/modifiers'

// Export utility functions
export { parseHex, rgbToAnsi256 }

// Export types
export type { StyleChainState } from './types'