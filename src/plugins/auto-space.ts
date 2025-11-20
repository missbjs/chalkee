/**
 * Auto-space mode plugin
 * Adds automatic spacing between chained segments
 */
import type { StylePlugin } from './base'
import type { AnsiCodes } from '../ansi'
import type { StyledFunction } from '../types'
import { pluginRegistry } from './registry-instance'

// Auto-space mode marker
const AUTO_SPACE_MARKER = '\x00AS\x00'

export const autoSpacePlugin: StylePlugin = {
  name: 'autoSpace',

  handleProperty(_target: StyledFunction, prop: string, codes: AnsiCodes[], accumulatedText: string, options?: { createStyler?: Function, ansiCodes?: Record<string, AnsiCodes>, pluginRegistry?: any }) {
    // Handle auto-space (.as) - creates a persistent mode that adds spaces until reset
    if (prop === 'as') {
      // Use the passed createStyler function to avoid circular dependencies
      if (options?.createStyler) {
        // Create a special ANSI code for auto-spacing mode
        const autoSpaceCode = { open: AUTO_SPACE_MARKER, close: '' }
        return (options.createStyler as Function)([...codes, autoSpaceCode], accumulatedText)
      }
    }

    return undefined
  },

  registerCodes() {
    // Auto-space plugin doesn't add new ANSI codes
    return {}
  },

  transformCodes(_codes: AnsiCodes[], _propName: string) {
    // No transformation needed in this plugin
    return undefined
  },

  isMarkerCode(code: AnsiCodes) {
    // Identify our auto-space marker code
    return code.open === AUTO_SPACE_MARKER
  }
}

// Self-register the plugin when imported
pluginRegistry.register(autoSpacePlugin)

// Export the marker for other plugins to use
export const AUTO_SPACE_CODE_MARKER = AUTO_SPACE_MARKER

// Export helper to check if codes contain auto-space mode
export function isAutoSpaceMode(codes: AnsiCodes[]): boolean {
  return codes.some(code => code.open === AUTO_SPACE_MARKER)
}