/**
 * Styler engine for applying ANSI escape codes to text
 */

import { StyleChainState } from '../types'
import { parseHex, rgbToAnsi256 } from './registry'
import { ChalkeeBase } from './ChalkeeBase'

// Modifier lookup function to be set by modifiers module to avoid circular dependencies
let modifierLookup: (name: string) => number | undefined

/**
 * Set the modifier lookup function
 * @param fn The lookup function
 */
export function setModifierLookup(fn: (name: string) => number | undefined): void {
    modifierLookup = fn
}

// Cache for ANSI code generation to avoid redundant string concatenation
const ansiCodeCache = new Map<string, string>()

/**
 * Convert a style chain state to ANSI escape codes with caching
 * @param state The style chain state
 * @returns The ANSI escape code string
 */
export function styleStateToAnsi(state: StyleChainState): string {
    // Check for hex/rgb color codes first (they override normal colors)
    if ((state as any).hexColorCode) {
        return (state as any).hexColorCode
    }
    if ((state as any).rgbColorCode) {
        return (state as any).rgbColorCode
    }
    if ((state as any).bgHexColorCode) {
        return (state as any).bgHexColorCode
    }
    if ((state as any).bgRgbColorCode) {
        return (state as any).bgRgbColorCode
    }

    const codes: number[] = []

    // Add modifier codes
    for (const modifier of state.modifiers) {
        const code = modifierLookup ? modifierLookup(modifier) : undefined
        if (code !== undefined) {
            codes.push(code)
        }
    }

    // Add foreground color codes
    for (const color of state.colors) {
        codes.push(color.ansiCode)
    }

    // Add background color codes
    for (const color of state.backgroundColors) {
        codes.push(color.ansiCode)
    }

    // If no codes, return empty string
    if (codes.length === 0) {
        return ''
    }

    // Create cache key from codes
    const cacheKey = codes.join(';')

    // Check cache first
    if (ansiCodeCache.has(cacheKey)) {
        return ansiCodeCache.get(cacheKey)!
    }

    // Generate and cache the ANSI escape sequence
    const ansiCode = `\x1b[${cacheKey}m`
    ansiCodeCache.set(cacheKey, ansiCode)
    return ansiCode
}

/**
 * Create a reset ANSI escape code
 * @returns The reset ANSI escape code
 */
export function createReset(): string {
    return '\x1b[0m'
}

/**
 * Create a hex color ANSI escape code
 * @param hex The hex color string
 * @param isBackground Whether this is a background color
 * @returns The ANSI escape code for the hex color
 */
export function createHexCode(hex: string, isBackground: boolean = false): string {
    const [r, g, b] = parseHex(hex)
    const ansi256 = rgbToAnsi256(r, g, b)
    const code = isBackground ? 48 : 38
    return `\x1b[${code};5;${ansi256}m`
}

/**
 * Create an RGB color ANSI escape code
 * @param r Red value (0-255)
 * @param g Green value (0-255)
 * @param b Blue value (0-255)
 * @param isBackground Whether this is a background color
 * @returns The ANSI escape code for the RGB color
 */
export function createRgbCode(r: number, g: number, b: number, isBackground: boolean = false): string {
    const ansi256 = rgbToAnsi256(r, g, b)
    const code = isBackground ? 48 : 38
    return `\x1b[${code};5;${ansi256}m`
}

/**
 * Apply styling to text based on the current state
 * @param text The text to style
 * @param state The current style state
 * @returns The styled text with ANSI escape codes
 */
export function applyStyle(text: string, state: StyleChainState): string {
    // Use ChalkeeBase.noColor to control color output
    if (ChalkeeBase.noColor) {
        return text
    }

    const open = styleStateToAnsi(state)
    const close = createReset()

    // If auto-spacing is enabled, add a space before the text (except for the first element)
    // Only add space if previousStyles has actual styles applied
    if (state.autoSpacing && state.previousStyles && (state.previousStyles.colors.length > 0 || state.previousStyles.modifiers.length > 0 || state.previousStyles.backgroundColors.length > 0)) {
        // For auto-spacing, the space should not have any styling per user requirement
        // Spaces should be visually neutral
        const spaceOpen = '' // No styling on space
        // Apply full styling to the actual text
        const textOpen = styleStateToAnsi(state)
        // The space should be part of the styled text, not a separate element
        return spaceOpen + ' ' + textOpen + text + close
    }

    return open + text + close
}

/**
 * Merge two style states with structural sharing
 * Only creates new arrays when styles actually change
 * @param base The base style state
 * @param overlay The overlay style state
 * @returns The merged style state
 */
export function mergeStyleStates(base: StyleChainState, overlay: StyleChainState): StyleChainState {
    // Optimize: if overlay has no modifiers, reuse base modifiers array
    let mergedModifiers = base.modifiers
    if (overlay.modifiers.length > 0) {
        // Only create a new array if we need to merge
        const allModifiers = overlay.modifiers.length > 0
            ? [...base.modifiers, ...overlay.modifiers]
            : base.modifiers
        // Use Set to deduplicate, then convert back to array
        mergedModifiers = allModifiers.length > 0 && new Set(allModifiers).size < allModifiers.length
            ? [...new Set(allModifiers)]
            : allModifiers
    }

    const merged: any = {
        colors: base.colors.length > 0 || overlay.colors.length > 0
            ? [...base.colors, ...overlay.colors]
            : base.colors,
        modifiers: mergedModifiers,
        backgroundColors: base.backgroundColors.length > 0 || overlay.backgroundColors.length > 0
            ? [...base.backgroundColors, ...overlay.backgroundColors]
            : base.backgroundColors,
        isOpen: overlay.isOpen,
        previousStyles: base,
        autoSpacing: overlay.autoSpacing
    }

    // Preserve hex/rgb color codes from overlay
    if ((overlay as any).hexColorCode) {
        merged.hexColorCode = (overlay as any).hexColorCode
    }
    if ((overlay as any).rgbColorCode) {
        merged.rgbColorCode = (overlay as any).rgbColorCode
    }
    if ((overlay as any).bgHexColorCode) {
        merged.bgHexColorCode = (overlay as any).bgHexColorCode
    }
    if ((overlay as any).bgRgbColorCode) {
        merged.bgRgbColorCode = (overlay as any).bgRgbColorCode
    }

    return merged as StyleChainState
}
/**
 * Create a new style chain state
 * @returns A new style chain state
 */

export function createStyleState(): StyleChainState {
    return {
        colors: [],
        modifiers: [],
        backgroundColors: [],
        isOpen: false,
        autoSpacing: false
    }
}
