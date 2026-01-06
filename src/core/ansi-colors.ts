import { ChalkeeBase } from './ChalkeeBase'
import { createStyleState } from "./styler"
import { mergeStyleStates } from './styler'
import { type Chalkee, createStyledFunction } from './Chalkee'
import { getColor } from './registry'

// Extend the ChalkeeBase interface with ANSI color methods
declare module './ChalkeeBase' {
    interface ChalkeeBase {
        // Core colors
        red: Chalkee
        green: Chalkee
        blue: Chalkee
        yellow: Chalkee
        magenta: Chalkee
        cyan: Chalkee
        white: Chalkee
        black: Chalkee
        gray: Chalkee
        grey: Chalkee
        redBright: Chalkee
        greenBright: Chalkee
        blueBright: Chalkee
        yellowBright: Chalkee
        magentaBright: Chalkee
        cyanBright: Chalkee
        whiteBright: Chalkee
        blackBright: Chalkee

        // Background colors
        bgRed: Chalkee
        bgGreen: Chalkee
        bgBlue: Chalkee
        bgYellow: Chalkee
        bgMagenta: Chalkee
        bgCyan: Chalkee
        bgWhite: Chalkee
        bgBlack: Chalkee
        bgRedBright: Chalkee
        bgGreenBright: Chalkee
        bgBlueBright: Chalkee
        bgYellowBright: Chalkee
        bgMagentaBright: Chalkee
        bgCyanBright: Chalkee
        bgWhiteBright: Chalkee
        bgBlackBright: Chalkee
    }
}

// Helper function to define color properties
const defineColorProperty = (name: string, isBackground = false) => {
    Object.defineProperty(ChalkeeBase.prototype, name, {
        get: function (this: Chalkee) {
            return isBackground ? this.createBgColor(name) : this.createColor(name)
        },
        enumerable: true,
        configurable: true
    })
}

// Attach ANSI color methods to ChalkeeBase prototype
function attachAnsiColorMethods() {
    // Core color methods
    const coreColors = [
        'red', 'green', 'blue', 'yellow', 'magenta', 'cyan', 'white', 'black',
        'gray', 'grey',
        'redBright', 'greenBright', 'blueBright', 'yellowBright',
        'magentaBright', 'cyanBright', 'whiteBright', 'blackBright'
    ]

    // Background color methods
    const bgColors = [
        'bgRed', 'bgGreen', 'bgBlue', 'bgYellow', 'bgMagenta', 'bgCyan', 'bgWhite', 'bgBlack',
        'bgRedBright', 'bgGreenBright', 'bgBlueBright', 'bgYellowBright',
        'bgMagentaBright', 'bgCyanBright', 'bgWhiteBright', 'bgBlackBright'
    ]

    // Define core color properties
    for (const color of coreColors) {
        defineColorProperty(color, false)
    }

    // Define background color properties
    for (const color of bgColors) {
        defineColorProperty(color, true)
    }
}

// Automatically attach the methods when this module is imported
attachAnsiColorMethods()

// Create the empty state once and reuse it throughout the module
const emptyState = createStyleState()

// Helper function to create a styled function with initial color state
function createColorFunction(colorName: string): Chalkee {
    const colorDef = getColor(colorName)
    if (!colorDef) {
        return createStyledFunction('', emptyState)
    }

    const initialState = mergeStyleStates(emptyState, {
        ...emptyState,
        colors: [colorDef],
        isOpen: true,
        autoSpacing: false
    })

    return createStyledFunction('', initialState)
}

// Export core colors
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

// Export background colors
export const bgRed = createStyledFunction('', emptyState).bgRed
export const bgGreen = createStyledFunction('', emptyState).bgGreen
export const bgBlue = createStyledFunction('', emptyState).bgBlue
export const bgYellow = createStyledFunction('', emptyState).bgYellow
export const bgMagenta = createStyledFunction('', emptyState).bgMagenta
export const bgCyan = createStyledFunction('', emptyState).bgCyan
export const bgWhite = createStyledFunction('', emptyState).bgWhite
export const bgBlack = createStyledFunction('', emptyState).bgBlack
export const bgRedBright = createStyledFunction('', emptyState).bgRedBright
export const bgGreenBright = createStyledFunction('', emptyState).bgGreenBright
export const bgBlueBright = createStyledFunction('', emptyState).bgBlueBright
export const bgYellowBright = createStyledFunction('', emptyState).bgYellowBright
export const bgMagentaBright = createStyledFunction('', emptyState).bgMagentaBright
export const bgCyanBright = createStyledFunction('', emptyState).bgCyanBright
export const bgWhiteBright = createStyledFunction('', emptyState).bgWhiteBright
export const bgBlackBright = createStyledFunction('', emptyState).bgBlackBright
