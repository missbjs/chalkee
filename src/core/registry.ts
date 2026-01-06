/**
 * Color registry for managing ANSI color codes
 */

import { ColorDefinition } from '../types'

// ANSI color codes
export const ANSI_COLORS: Record<string, ColorDefinition> = {
    // Foreground colors
    black: { name: 'black', ansiCode: 30, type: 'foreground' },
    red: { name: 'red', ansiCode: 31, type: 'foreground' },
    green: { name: 'green', ansiCode: 32, type: 'foreground' },
    yellow: { name: 'yellow', ansiCode: 33, type: 'foreground' },
    blue: { name: 'blue', ansiCode: 34, type: 'foreground' },
    magenta: { name: 'magenta', ansiCode: 35, type: 'foreground' },
    cyan: { name: 'cyan', ansiCode: 36, type: 'foreground' },
    white: { name: 'white', ansiCode: 37, type: 'foreground' },
    blackBright: { name: 'blackBright', ansiCode: 90, type: 'foreground' },
    redBright: { name: 'redBright', ansiCode: 91, type: 'foreground' },
    greenBright: { name: 'greenBright', ansiCode: 92, type: 'foreground' },
    yellowBright: { name: 'yellowBright', ansiCode: 93, type: 'foreground' },
    blueBright: { name: 'blueBright', ansiCode: 94, type: 'foreground' },
    magentaBright: { name: 'magentaBright', ansiCode: 95, type: 'foreground' },
    cyanBright: { name: 'cyanBright', ansiCode: 96, type: 'foreground' },
    whiteBright: { name: 'whiteBright', ansiCode: 97, type: 'foreground' },

    // Background colors
    bgBlack: { name: 'bgBlack', ansiCode: 40, type: 'background' },
    bgRed: { name: 'bgRed', ansiCode: 41, type: 'background' },
    bgGreen: { name: 'bgGreen', ansiCode: 42, type: 'background' },
    bgYellow: { name: 'bgYellow', ansiCode: 43, type: 'background' },
    bgBlue: { name: 'bgBlue', ansiCode: 44, type: 'background' },
    bgMagenta: { name: 'bgMagenta', ansiCode: 45, type: 'background' },
    bgCyan: { name: 'bgCyan', ansiCode: 46, type: 'background' },
    bgWhite: { name: 'bgWhite', ansiCode: 47, type: 'background' },
    bgBlackBright: { name: 'bgBlackBright', ansiCode: 100, type: 'background' },
    bgRedBright: { name: 'bgRedBright', ansiCode: 101, type: 'background' },
    bgGreenBright: { name: 'bgGreenBright', ansiCode: 102, type: 'background' },
    bgYellowBright: { name: 'bgYellowBright', ansiCode: 103, type: 'background' },
    bgBlueBright: { name: 'bgBlueBright', ansiCode: 104, type: 'background' },
    bgMagentaBright: { name: 'bgMagentaBright', ansiCode: 105, type: 'background' },
    bgCyanBright: { name: 'bgCyanBright', ansiCode: 106, type: 'background' },
    bgWhiteBright: { name: 'bgWhiteBright', ansiCode: 107, type: 'background' },
}

/**
 * Get ANSI code for a color
 * @param colorName The name of the color
 * @returns The ANSI color definition or undefined if not found
 */
const colorCache = new Map<string, ColorDefinition | undefined>()
export function getColor(colorName: string): ColorDefinition | undefined {
    // Check cache first
    if (colorCache.has(colorName)) {
        return colorCache.get(colorName)
    }

    const color = ANSI_COLORS[colorName]
    colorCache.set(colorName, color)
    return color
}

/**
 * Parse a hex color string to RGB values
 * @param hex The hex color string (e.g., '#ff0000')
 * @returns RGB values as an array [r, g, b]
 */
export function parseHex(hex: string): [number, number, number] {
    // Remove # if present
    const cleanedHex = hex.replace('#', '')

    // Handle 3-digit hex (e.g., #f00)
    if (cleanedHex.length === 3) {
        const r = parseInt(cleanedHex[0] + cleanedHex[0], 16)
        const g = parseInt(cleanedHex[1] + cleanedHex[1], 16)
        const b = parseInt(cleanedHex[2] + cleanedHex[2], 16)
        return [r, g, b]
    }

    // Handle 6-digit hex (e.g., #ff0000)
    if (cleanedHex.length === 6) {
        const r = parseInt(cleanedHex.substring(0, 2), 16)
        const g = parseInt(cleanedHex.substring(2, 4), 16)
        const b = parseInt(cleanedHex.substring(4, 6), 16)
        return [r, g, b]
    }

    // Default to black if invalid
    return [0, 0, 0]
}

/**
 * Convert RGB values to the closest ANSI 256 color
 * @param r Red value (0-255)
 * @param g Green value (0-255)
 * @param b Blue value (0-255)
 * @returns The ANSI 256 color code
 */
export function rgbToAnsi256(r: number, g: number, b: number): number {
    // If all values are equal, use grayscale
    if (r === g && g === b) {
        if (r < 8) return 16
        if (r > 248) return 231
        return Math.round(((r - 8) / 247) * 24) + 232
    }

    // Otherwise, use color cube
    const red = Math.round((r / 255) * 5)
    const green = Math.round((g / 255) * 5)
    const blue = Math.round((b / 255) * 5)

    return 16 + (36 * red) + (6 * green) + blue
}   