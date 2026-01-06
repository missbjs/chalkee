import { ChalkeeBase } from './ChalkeeBase'
import { createStyleState } from "./styler"
import { type Chalkee, createStyledFunction } from './Chalkee'
import { setModifierLookup } from './styler'

// ANSI modifier codes
export const ANSI_MODIFIERS: Record<string, number> = {
    reset: 0,
    bold: 1,
    dim: 2,
    italic: 3,
    underline: 4,
    inverse: 7,
    hidden: 8,
    strikethrough: 9,
}

/**
 * Get ANSI code for a modifier
 * @param modifierName The name of the modifier
 * @returns The ANSI modifier code or undefined if not found
 */
export function getModifier(modifierName: string): number | undefined {
    return ANSI_MODIFIERS[modifierName]
}

// Register the modifier lookup function with the styler to break circular dependency
setModifierLookup(getModifier)

// Extend the ChalkeeBase interface with modifier methods
declare module './ChalkeeBase' {
    interface ChalkeeBase {
        // Modifiers
        bold: Chalkee
        dim: Chalkee
        italic: Chalkee
        underline: Chalkee
        strikethrough: Chalkee
        inverse: Chalkee
        hidden: Chalkee

        // Shorthand aliases
        b: Chalkee // bold
        d: Chalkee // dim
        i: Chalkee // italic
        u: Chalkee // underline
        s: Chalkee // strikethrough
        r: Chalkee // reset

        // Special methods
        hex: (color: string) => Chalkee
        rgb: (r: number, g: number, b: number) => Chalkee
        bgHex: (color: string) => Chalkee
        bgRgb: (r: number, g: number, b: number) => Chalkee
        bg: Chalkee // background mode
        as: Chalkee // auto-spacing

        // Reset
        reset: Chalkee

        // Utils methods
        createBgMode(): Chalkee

        // Callable-helpers methods
        createColor(colorName: string, text?: string): Chalkee
        createModifier(modifier: string): Chalkee
    }
}

// Helper function to define modifier properties that create new instances
const defineModifierInstanceProperty = (name: string, creatorMethod: string) => {
    Object.defineProperty(ChalkeeBase.prototype, name, {
        get: function (this: Chalkee) {
            // @ts-ignore
            return this[creatorMethod](name)
        },
        enumerable: true,
        configurable: true
    })
}

// Helper function to define alias properties
const defineAliasProperty = (name: string, aliasedProperty: string) => {
    Object.defineProperty(ChalkeeBase.prototype, name, {
        get: function (this: Chalkee) {
            // @ts-ignore
            return this[aliasedProperty]
        },
        enumerable: true,
        configurable: true
    })
}

// Helper function to define special instance properties
const defineSpecialInstanceProperty = (name: string, creatorMethod: string) => {
    Object.defineProperty(ChalkeeBase.prototype, name, {
        get: function (this: Chalkee) {
            // @ts-ignore
            return this[creatorMethod]()
        },
        enumerable: true,
        configurable: true
    })
}

// Helper function to define value properties (methods that take parameters)
const defineValueProperty = (name: string, creatorMethod: string) => {
    Object.defineProperty(ChalkeeBase.prototype, name, {
        get: function (this: Chalkee) {
            // @ts-ignore
            return (...args: any[]) => this[creatorMethod](...args)
        },
        enumerable: true,
        configurable: true
    })
}

// Attach modifier methods to ChalkeeBase prototype
function attachModifierMethods(ChalkeeBaseClass: typeof ChalkeeBase) {
    // Core modifier methods
    const modifiers = ['bold', 'dim', 'italic', 'underline', 'strikethrough', 'inverse', 'hidden']
    for (const modifier of modifiers) {
        defineModifierInstanceProperty(modifier, 'createModifier')
    }

    // Shorthand aliases
    defineAliasProperty('b', 'bold')
    defineAliasProperty('d', 'dim')
    defineAliasProperty('i', 'italic')
    defineAliasProperty('u', 'underline')
    defineAliasProperty('s', 'strikethrough')

    // Reset method
    defineSpecialInstanceProperty('reset', 'createReset')
    defineAliasProperty('r', 'reset')

    // Special methods
    defineSpecialInstanceProperty('as', 'createAutoSpacing')

    // Background mode method with debug log (kept as explicit definition due to debug log)
    Object.defineProperty(ChalkeeBase.prototype, 'bg', {
        get: function (this: Chalkee) {
            return this.createBgMode()
        },
        enumerable: true,
        configurable: true
    })

    // Color methods that take parameters
    defineValueProperty('hex', 'createHexColor')
    defineValueProperty('rgb', 'createRgbColor')
    defineValueProperty('bgHex', 'createBgHexColor')
    defineValueProperty('bgRgb', 'createBgRgbColor')
}

// Automatically attach the methods when this module is imported
attachModifierMethods(ChalkeeBase)

// Create the empty state once and reuse it throughout the module
const emptyState = createStyleState()

// Export modifier methods - reuse emptyState
// @ts-ignore - bold, dim, etc. are augmented at runtime via module extension
export const bold = createStyledFunction('', emptyState).bold
export const dim = createStyledFunction('', emptyState).dim
export const italic = createStyledFunction('', emptyState).italic
export const underline = createStyledFunction('', emptyState).underline
export const strikethrough = createStyledFunction('', emptyState).strikethrough
export const inverse = createStyledFunction('', emptyState).inverse
export const hidden = createStyledFunction('', emptyState).hidden
export const reset = createStyledFunction('', emptyState).reset

// Export shorthand aliases
export const b = createStyledFunction('', emptyState).b
export const d = createStyledFunction('', emptyState).d
export const i = createStyledFunction('', emptyState).i
export const u = createStyledFunction('', emptyState).u
export const s = createStyledFunction('', emptyState).s
export const r = createStyledFunction('', emptyState).r

// Export special methods
export const as = createStyledFunction('', emptyState).as
export const bg = createStyledFunction('', emptyState).bg

// Export hex and RGB methods
export const hex = createStyledFunction('', emptyState).hex
export const rgb = createStyledFunction('', emptyState).rgb
export const bgHex = createStyledFunction('', emptyState).bgHex
export const bgRgb = createStyledFunction('', emptyState).bgRgb
