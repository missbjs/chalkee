/**
 * Custom colors plugin
 * Provides extended color codes with proper TypeScript augmentation
 */
import type { StylePlugin } from './base'
import { Styler } from '../styler'
import { register, registerCodes, createStylerProperty } from '../registry'

// Custom ANSI codes - defined at module level
const customCodes = {
    // Custom foreground colors
    pink: { open: '\x1b[38;5;201m', close: '\x1b[39m' },
    orange: { open: '\x1b[38;5;208m', close: '\x1b[39m' },
    purple: { open: '\x1b[38;5;129m', close: '\x1b[39m' },
    lime: { open: '\x1b[38;5;118m', close: '\x1b[39m' },
    coral: { open: '\x1b[38;5;204m', close: '\x1b[39m' },
    teal: { open: '\x1b[38;5;37m', close: '\x1b[39m' },

    // Custom background colors
    bgPink: { open: '\x1b[48;5;201m', close: '\x1b[49m' },
    bgOrange: { open: '\x1b[48;5;208m', close: '\x1b[49m' },
    bgPurple: { open: '\x1b[48;5;129m', close: '\x1b[49m' },
    bgLime: { open: '\x1b[48;5;118m', close: '\x1b[49m' },
    bgCoral: { open: '\x1b[48;5;204m', close: '\x1b[49m' },
    bgTeal: { open: '\x1b[48;5;37m', close: '\x1b[49m' },

    // Custom modifiers
    blink: { open: '\x1b[5m', close: '\x1b[25m' },
    overline: { open: '\x1b[53m', close: '\x1b[55m' },
    doubleUnderline: { open: '\x1b[21m', close: '\x1b[24m' }
}

// Register custom codes when module is imported
registerCodes(customCodes)

// Define custom color properties directly on the Styler prototype
Object.defineProperties(Styler.prototype, {
    // Custom foreground colors
    pink: createStylerProperty(customCodes.pink, { createStyler: Styler }),
    orange: createStylerProperty(customCodes.orange, { createStyler: Styler }),
    purple: createStylerProperty(customCodes.purple, { createStyler: Styler }),
    lime: createStylerProperty(customCodes.lime, { createStyler: Styler }),
    coral: createStylerProperty(customCodes.coral, { createStyler: Styler }),
    teal: createStylerProperty(customCodes.teal, { createStyler: Styler }),

    // Custom background colors
    bgPink: createStylerProperty(customCodes.bgPink, { createStyler: Styler }),
    bgOrange: createStylerProperty(customCodes.bgOrange, { createStyler: Styler }),
    bgPurple: createStylerProperty(customCodes.bgPurple, { createStyler: Styler }),
    bgLime: createStylerProperty(customCodes.bgLime, { createStyler: Styler }),
    bgCoral: createStylerProperty(customCodes.bgCoral, { createStyler: Styler }),
    bgTeal: createStylerProperty(customCodes.bgTeal, { createStyler: Styler }),

    // Custom modifiers
    blink: createStylerProperty(customCodes.blink, { createStyler: Styler }),
    overline: createStylerProperty(customCodes.overline, { createStyler: Styler }),
    doubleUnderline: createStylerProperty(customCodes.doubleUnderline, { createStyler: Styler })
})

export const customColorsPlugin: StylePlugin = {
    name: 'customColors',
}

// Self-register the plugin when imported
register(customColorsPlugin)

// Augment the Styler interface with custom color properties
// This provides IntelliSense for the custom colors
declare module '../styler' {
    interface Styler {
        // Core color functions
        hex: (color: string) => Styler
        rgb: (r: number, g: number, b: number) => Styler
        bgHex: (color: string) => Styler
        bgRgb: (r: number, g: number, b: number) => Styler
        h: (color: string) => Styler

        // Custom foreground colors
        pink: Styler
        orange: Styler
        purple: Styler
        lime: Styler
        coral: Styler
        teal: Styler

        // Custom background colors
        bgPink: Styler
        bgOrange: Styler
        bgPurple: Styler
        bgLime: Styler
        bgCoral: Styler
        bgTeal: Styler

        // Custom modifiers
        blink: Styler
        overline: Styler
        doubleUnderline: Styler
    }
}