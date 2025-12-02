/**
 * Chalkee - Advanced terminal styling with plugin architecture, tree-shaking, and template literal chaining
 */

import { Chalkee, StyleChainState } from './types'
import { createStyleState, createReset } from './plugins/styler'
import { createStyledFunction } from './plugins/template-handler'
import {
    ANSI_COLORS,
    ANSI_MODIFIERS,
    parseHex,
    rgbToAnsi256
} from './plugins/registry'

// Create the initial chalkee instance
const chalkee: Chalkee = createStyledFunction('', createStyleState()) as Chalkee

// Export the default chalkee instance
export default chalkee

// Export individual color methods by creating new instances with the appropriate styling
import { getColor } from './plugins/registry'
import { mergeStyleStates } from './plugins/styler'

// Helper function to create a styled function with initial color state
function createColorFunction(colorName: string) {
    const colorDef = getColor(colorName)
    if (!colorDef) {
        return createStyledFunction('', createStyleState())
    }

    const initialState = mergeStyleStates(createStyleState(), {
        ...createStyleState(),
        colors: [colorDef],
        isOpen: true,
        autoSpacing: false
    })

    return createStyledFunction('', initialState)
}

export const red = createColorFunction('red')
export const green = createColorFunction('green')
export const blue = createColorFunction('blue')
export const yellow = createColorFunction('yellow')
export const magenta = createColorFunction('magenta')
export const cyan = createColorFunction('cyan')
export const white = createColorFunction('white')
export const black = createColorFunction('black')
export const gray = createColorFunction('gray')
export const grey = createColorFunction('grey')
export const redBright = createColorFunction('redBright')
export const greenBright = createColorFunction('greenBright')
export const blueBright = createColorFunction('blueBright')
export const yellowBright = createColorFunction('yellowBright')
export const magentaBright = createColorFunction('magentaBright')
export const cyanBright = createColorFunction('cyanBright')
export const whiteBright = createColorFunction('whiteBright')
export const blackBright = createColorFunction('blackBright')

// Export background color methods
export const bgRed = createStyledFunction('', createStyleState()).bgRed
export const bgGreen = createStyledFunction('', createStyleState()).bgGreen
export const bgBlue = createStyledFunction('', createStyleState()).bgBlue
export const bgYellow = createStyledFunction('', createStyleState()).bgYellow
export const bgMagenta = createStyledFunction('', createStyleState()).bgMagenta
export const bgCyan = createStyledFunction('', createStyleState()).bgCyan
export const bgWhite = createStyledFunction('', createStyleState()).bgWhite
export const bgBlack = createStyledFunction('', createStyleState()).bgBlack
export const bgRedBright = createStyledFunction('', createStyleState()).bgRedBright
export const bgGreenBright = createStyledFunction('', createStyleState()).bgGreenBright
export const bgBlueBright = createStyledFunction('', createStyleState()).bgBlueBright
export const bgYellowBright = createStyledFunction('', createStyleState()).bgYellowBright
export const bgMagentaBright = createStyledFunction('', createStyleState()).bgMagentaBright
export const bgCyanBright = createStyledFunction('', createStyleState()).bgCyanBright
export const bgWhiteBright = createStyledFunction('', createStyleState()).bgWhiteBright
export const bgBlackBright = createStyledFunction('', createStyleState()).bgBlackBright

// Export modifier methods
export const bold = createStyledFunction('', createStyleState()).bold
export const dim = createStyledFunction('', createStyleState()).dim
export const italic = createStyledFunction('', createStyleState()).italic
export const underline = createStyledFunction('', createStyleState()).underline
export const strikethrough = createStyledFunction('', createStyleState()).strikethrough
export const inverse = createStyledFunction('', createStyleState()).inverse
export const hidden = createStyledFunction('', createStyleState()).hidden
export const reset = createStyledFunction('', createStyleState()).reset

// Export shorthand aliases
export const b = createStyledFunction('', createStyleState()).b // bold
export const d = createStyledFunction('', createStyleState()).d // dim
export const i = createStyledFunction('', createStyleState()).i // italic
export const u = createStyledFunction('', createStyleState()).u // underline
export const s = createStyledFunction('', createStyleState()).s // strikethrough
export const r = createStyledFunction('', createStyleState()).r // reset

// Export special methods
export const as = createStyledFunction('', createStyleState()).as // auto-spacing

// Export hex and RGB methods
export const hex = createStyledFunction('', createStyleState()).hex
export const rgb = createStyledFunction('', createStyleState()).rgb
export const bgHex = createStyledFunction('', createStyleState()).bgHex
export const bgRgb = createStyledFunction('', createStyleState()).bgRgb

// Export utility functions
export { parseHex, rgbToAnsi256 }

// Export types
export type { Chalkee, StyleChainState } from './types'