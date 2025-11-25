/**
 * Custom colors plugin
 * Provides extended color codes with proper TypeScript augmentation
 */
import type { StylePlugin } from './base'
import { register, registerCodes } from '../registry'

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

export const customColorsPlugin: StylePlugin = {
    name: 'customColors',
}

// Self-register the plugin when imported
register(customColorsPlugin)

// Augment the StyledFunction interface with custom color properties
// This provides IntelliSense for the custom colors
declare module '../types' {
    interface StyledFunction {
        // Core color functions
        hex: (color: string) => StyledFunction
        rgb: (r: number, g: number, b: number) => StyledFunction
        bgHex: (color: string) => StyledFunction
        bgRgb: (r: number, g: number, b: number) => StyledFunction
        h: (color: string) => StyledFunction

        // Custom foreground colors
        pink: StyledFunction
        orange: StyledFunction
        purple: StyledFunction
        lime: StyledFunction
        coral: StyledFunction
        teal: StyledFunction

        // Custom background colors
        bgPink: StyledFunction
        bgOrange: StyledFunction
        bgPurple: StyledFunction
        bgLime: StyledFunction
        bgCoral: StyledFunction
        bgTeal: StyledFunction

        // Custom modifiers
        blink: StyledFunction
        overline: StyledFunction
        doubleUnderline: StyledFunction
    }
}