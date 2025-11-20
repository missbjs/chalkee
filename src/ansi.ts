/**
 * ANSI escape code definitions and utilities
 */

export interface AnsiCodes {
  open: string
  close: string
}

export const ansiCodes = {
  // Modifiers
  reset: { open: '\x1b[0m', close: '\x1b[0m' },
  bold: { open: '\x1b[1m', close: '\x1b[22m' },
  dim: { open: '\x1b[2m', close: '\x1b[22m' },
  italic: { open: '\x1b[3m', close: '\x1b[23m' },
  underline: { open: '\x1b[4m', close: '\x1b[24m' },
  inverse: { open: '\x1b[7m', close: '\x1b[27m' },
  hidden: { open: '\x1b[8m', close: '\x1b[28m' },
  strikethrough: { open: '\x1b[9m', close: '\x1b[29m' },

  // Foreground colors
  black: { open: '\x1b[30m', close: '\x1b[39m' },
  red: { open: '\x1b[31m', close: '\x1b[39m' },
  green: { open: '\x1b[32m', close: '\x1b[39m' },
  yellow: { open: '\x1b[33m', close: '\x1b[39m' },
  blue: { open: '\x1b[34m', close: '\x1b[39m' },
  magenta: { open: '\x1b[35m', close: '\x1b[39m' },
  cyan: { open: '\x1b[36m', close: '\x1b[39m' },
  white: { open: '\x1b[37m', close: '\x1b[39m' },
  gray: { open: '\x1b[90m', close: '\x1b[39m' },
  grey: { open: '\x1b[90m', close: '\x1b[39m' },

  // Bright foreground colors
  blackBright: { open: '\x1b[90m', close: '\x1b[39m' },
  redBright: { open: '\x1b[91m', close: '\x1b[39m' },
  greenBright: { open: '\x1b[92m', close: '\x1b[39m' },
  yellowBright: { open: '\x1b[93m', close: '\x1b[39m' },
  blueBright: { open: '\x1b[94m', close: '\x1b[39m' },
  magentaBright: { open: '\x1b[95m', close: '\x1b[39m' },
  cyanBright: { open: '\x1b[96m', close: '\x1b[39m' },
  whiteBright: { open: '\x1b[97m', close: '\x1b[39m' },

  // Background colors
  bgBlack: { open: '\x1b[40m', close: '\x1b[49m' },
  bgRed: { open: '\x1b[41m', close: '\x1b[49m' },
  bgGreen: { open: '\x1b[42m', close: '\x1b[49m' },
  bgYellow: { open: '\x1b[43m', close: '\x1b[49m' },
  bgBlue: { open: '\x1b[44m', close: '\x1b[49m' },
  bgMagenta: { open: '\x1b[45m', close: '\x1b[49m' },
  bgCyan: { open: '\x1b[46m', close: '\x1b[49m' },
  bgWhite: { open: '\x1b[47m', close: '\x1b[49m' },

  // Bright background colors
  bgBlackBright: { open: '\x1b[100m', close: '\x1b[49m' },
  bgRedBright: { open: '\x1b[101m', close: '\x1b[49m' },
  bgGreenBright: { open: '\x1b[102m', close: '\x1b[49m' },
  bgYellowBright: { open: '\x1b[103m', close: '\x1b[49m' },
  bgBlueBright: { open: '\x1b[104m', close: '\x1b[49m' },
  bgMagentaBright: { open: '\x1b[105m', close: '\x1b[49m' },
  bgCyanBright: { open: '\x1b[106m', close: '\x1b[49m' },
  bgWhiteBright: { open: '\x1b[107m', close: '\x1b[49m' },
} as const

export type StyleName = keyof typeof ansiCodes

/**
 * Check if colors should be enabled based on environment
 */
export function isColorSupported(): boolean {
  // NO_COLOR environment variable disables colors
  if (process.env.NO_COLOR) {
    return false
  }

  // Check for common CI environments
  if (process.env.CI && !process.env.COLORTERM) {
    return false
  }

  // If FORCE_COLOR is set, enable colors
  if (process.env.FORCE_COLOR) {
    return true
  }

  // Check if running in a TTY
  if (typeof process !== 'undefined' && process.stdout && !process.stdout.isTTY) {
    return false
  }

  return true
}

/**
 * Create RGB foreground ANSI code
 */
export function createRgbCode(r: number, g: number, b: number): AnsiCodes {
  return {
    open: `\x1b[38;2;${r};${g};${b}m`,
    close: '\x1b[39m',
  }
}

/**
 * Create RGB background ANSI code
 */
export function createBgRgbCode(r: number, g: number, b: number): AnsiCodes {
  return {
    open: `\x1b[48;2;${r};${g};${b}m`,
    close: '\x1b[49m',
  }
}

/**
 * Parse hex color string to RGB values
 */
export function parseHex(hex: string): [number, number, number] {
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
export function validateRgb(r: number, g: number, b: number): void {
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
export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h = h % 360
  if (h < 0) h += 360
  s = Math.max(0, Math.min(100, s))
  l = Math.max(0, Math.min(100, l))

  const c = (1 - Math.abs(2 * l / 100 - 1)) * s / 100
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l / 100 - c / 2

  let r = 0, g = 0, b = 0
  if (h < 60) {
    r = c; g = x; b = 0
  } else if (h < 120) {
    r = x; g = c; b = 0
  } else if (h < 180) {
    r = 0; g = c; b = x
  } else if (h < 240) {
    r = 0; g = x; b = c
  } else if (h < 300) {
    r = x; g = 0; b = c
  } else {
    r = c; g = 0; b = x
  }

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ]
}