/**
 * Color utilities plugin
 * Provides hex, rgb, bgHex, bgRgb color utilities with proper TypeScript augmentation
 */
import type { StylePlugin } from './base'
import type { AnsiCodes } from '../ansi'
import { Styler, createStyler } from '../styler'
import { register, plugins } from '../registry'

/**
 * Create RGB foreground ANSI code
 */
function createRgbCode(r: number, g: number, b: number): AnsiCodes {
  return {
    open: `\x1b[38;2;${r};${g};${b}m`,
    close: '\x1b[39m',
  }
}

/**
 * Create RGB background ANSI code
 */
function createBgRgbCode(r: number, g: number, b: number): AnsiCodes {
  return {
    open: `\x1b[48;2;${r};${g};${b}m`,
    close: '\x1b[49m',
  }
}

/**
 * Parse hex color string to RGB values
 */
function parseHex(hex: string): [number, number, number] {
  // Remove # if present
  hex = hex.replace(/^#/, '')

  // Expand shorthand (e.g., "03F" to "0033FF")
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }

  if (hex.length !== 6) {
    throw new Error(`Invalid hex color: ${hex}`)
  }

  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    throw new Error(`Invalid hex color: ${hex}`)
  }

  return [r, g, b]
}

/**
 * Validate RGB values
 */
function validateRgb(r: number, g: number, b: number): void {
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    throw new Error(`RGB values must be between 0 and 255. Got: ${r}, ${g}, ${b}`)
  }
}

/**
 * Convert HSL to RGB
 * @param h Hue (0-360)
 * @param s Saturation (0-100)
 * @param l Lightness (0-100)
 */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h = h % 360
  if (h < 0) h += 360
  s = Math.max(0, Math.min(100, s))
  l = Math.max(0, Math.min(100, l))

  const c = (1 - Math.abs(2 * l / 100 - 1)) * s / 100
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l / 100 - c / 2

  let r = 0, g = 0, b = 0

  if (h < 60) {
    r = c
    g = x
    b = 0
  } else if (h < 120) {
    r = x
    g = c
    b = 0
  } else if (h < 180) {
    r = 0
    g = c
    b = x
  } else if (h < 240) {
    r = 0
    g = x
    b = c
  } else if (h < 300) {
    r = x
    g = 0
    b = c
  } else {
    r = c
    g = 0
    b = x
  }

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ]
}

// Function to dynamically get BG_MODE_CODE_MARKER from bg plugin
function getBgModeCodeMarker(): string | undefined {
  // Find the bg plugin in the plugins array
  const bgPlugin = plugins.find(plugin => plugin.name === 'bg')

  // If the bg plugin is found and has the marker, return it
  if (bgPlugin && (bgPlugin as any).BG_MODE_CODE_MARKER) {
    return (bgPlugin as any).BG_MODE_CODE_MARKER
  }

  return undefined
}

// Define color utility properties directly on the Styler prototype
Object.defineProperties(Styler.prototype, {
  hex: {
    get() {
      const handler = (color: string) => {
        const [r, g, b] = parseHex(color)
        const rgbCode = createRgbCode(r, g, b)
        return createStyler([rgbCode], '')
      }
      return handler
    },
    enumerable: true,
    configurable: true
  },

  h: {
    get() {
      const handler = (color: string) => {
        const [r, g, b] = parseHex(color)
        const rgbCode = createRgbCode(r, g, b)
        return createStyler([rgbCode], '')
      }
      return handler
    },
    enumerable: true,
    configurable: true
  },

  bgHex: {
    get() {
      const handler = (color: string) => {
        const [r, g, b] = parseHex(color)
        const rgbCode = createBgRgbCode(r, g, b)
        return createStyler([rgbCode], '')
      }
      return handler
    },
    enumerable: true,
    configurable: true
  },

  rgb: {
    get() {
      const handler = (r: number, g: number, b: number) => {
        validateRgb(r, g, b)
        const rgbCode = createRgbCode(r, g, b)
        return createStyler([rgbCode], '')
      }
      return handler
    },
    enumerable: true,
    configurable: true
  },

  bgRgb: {
    get() {
      const handler = (r: number, g: number, b: number) => {
        validateRgb(r, g, b)
        const rgbCode = createBgRgbCode(r, g, b)
        return createStyler([rgbCode], '')
      }
      return handler
    },
    enumerable: true,
    configurable: true
  }
})

// Export the utility functions so they can be imported directly
export { createRgbCode, createBgRgbCode, parseHex, validateRgb, hslToRgb }

export const utilPlugin: StylePlugin = {
  name: 'util',

  /**
   * Handle property access for color utilities
   * Return undefined to let the core system handle it through ansiCodes
   */
  handleProperty(_target: Styler, prop: string, codes: AnsiCodes[], accumulatedText: string, options?: { createStyler?: Function, ansiCodes?: Record<string, AnsiCodes>, pluginRegistry?: any }): Styler | undefined {
    // Use the passed createStyler function to avoid circular dependencies
    if (!options?.createStyler) {
      return undefined
    }

    // Handle hex color utility
    if (prop === 'hex' || prop === 'h') {
      const handler = (color: string) => {
        const [r, g, b] = parseHex(color)
        // Check if we're in background-color mode
        const bgModeMarker = getBgModeCodeMarker()
        const bgMode = bgModeMarker ? codes.some(code => code.open === bgModeMarker) : false
        // In bg-mode, use background RGB code
        const rgbCode = bgMode ? createBgRgbCode(r, g, b) : createRgbCode(r, g, b)
        return (options.createStyler as Function)([...codes, rgbCode], accumulatedText)
      }
      return handler as unknown as Styler
    }

    // Handle bgHex color utility (explicit background, ignores bg-mode)
    if (prop === 'bgHex') {
      const handler = (color: string) => {
        const [r, g, b] = parseHex(color)
        const rgbCode = createBgRgbCode(r, g, b)
        return (options.createStyler as Function)([...codes, rgbCode], accumulatedText)
      }
      return handler as unknown as Styler
    }

    // Handle rgb color utility
    if (prop === 'rgb') {
      const handler = (r: number, g: number, b: number) => {
        validateRgb(r, g, b)
        // Check if we're in background-color mode
        const bgModeMarker = getBgModeCodeMarker()
        const bgMode = bgModeMarker ? codes.some(code => code.open === bgModeMarker) : false
        // In bg-mode, use background RGB code
        const rgbCode = bgMode ? createBgRgbCode(r, g, b) : createRgbCode(r, g, b)
        return (options.createStyler as Function)([...codes, rgbCode], accumulatedText)
      }
      return handler as unknown as Styler
    }

    // Handle bgRgb color utility (explicit background, ignores bg-mode)
    if (prop === 'bgRgb') {
      const handler = (r: number, g: number, b: number) => {
        validateRgb(r, g, b)
        const rgbCode = createBgRgbCode(r, g, b)
        return (options.createStyler as Function)([...codes, rgbCode], accumulatedText)
      }
      return handler as unknown as Styler
    }

    return undefined
  },
}

// Self-register the plugin when imported
register(utilPlugin)

// Augment the Styler interface with color utility properties
// This provides IntelliSense for the color utilities
declare module '../styler' {
  interface Styler {
    // Color utilities
    hex: (color: string) => Styler
    h: (color: string) => Styler
    bgHex: (color: string) => Styler
    rgb: (r: number, g: number, b: number) => Styler
    bgRgb: (r: number, g: number, b: number) => Styler
  }
}