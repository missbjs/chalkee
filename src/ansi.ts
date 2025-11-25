/**
 * ANSI escape code definitions and utilities
 */

// Export the core ANSI codes object for direct access
// Core ANSI codes are now handled by the core-colors plugin
export const ansiCodes = {} as const

export interface AnsiCodes {
  open: string
  close: string
}

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

// Color utility functions are now handled by the color-utilities plugin