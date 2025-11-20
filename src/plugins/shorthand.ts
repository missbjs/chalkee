/**
 * Shorthand aliases plugin
 * Provides shorthand properties like .b, .i, .u, etc.
 */
import type { StylePlugin } from './base'
import type { AnsiCodes } from '../ansi'
import type { StyledFunction } from '../types'
import { ansiCodes } from '../ansi'
import { pluginRegistry } from './registry-instance'
import { BG_MODE_CODE_MARKER } from './bg-mode'
import { AUTO_SPACE_CODE_MARKER } from './auto-space'

export const shorthandPlugin: StylePlugin = {
  name: 'shorthand',

  handleProperty(_target: StyledFunction, prop: string, codes: AnsiCodes[], accumulatedText: string, options?: { createStyler?: Function, ansiCodes?: Record<string, AnsiCodes>, pluginRegistry?: any }) {
    // Handle shorthand aliases
    if (prop === 'r' || prop === 'b' || prop === 'i' || prop === 'u' || prop === 's' || prop === 'd') {
      // Use the passed createStyler function to avoid circular dependencies
      if (options?.createStyler) {
        if (prop === 'r') {
          // Use the passed pluginRegistry or the ansiCodes directly
          const resetCode = ansiCodes.reset
          // Filter out mode markers from other plugins
          const codesWithoutModes = codes.filter(code =>
            code.open !== AUTO_SPACE_CODE_MARKER && code.open !== BG_MODE_CODE_MARKER
          )
          // Add the reset code
          const resetCodes = [...codesWithoutModes, resetCode]
          return (options.createStyler as Function)(resetCodes, accumulatedText)
        }
        if (prop === 'b') {
          return (options.createStyler as Function)([...codes, ansiCodes.bold], accumulatedText)
        }
        if (prop === 'i') {
          return (options.createStyler as Function)([...codes, ansiCodes.italic], accumulatedText)
        }
        if (prop === 'u') {
          return (options.createStyler as Function)([...codes, ansiCodes.underline], accumulatedText)
        }
        if (prop === 's') {
          return (options.createStyler as Function)([...codes, ansiCodes.strikethrough], accumulatedText)
        }
        if (prop === 'd') {
          return (options.createStyler as Function)([...codes, ansiCodes.dim], accumulatedText)
        }
      }
    }

    return undefined
  },

  registerCodes() {
    // No additional ANSI codes to register
    return {}
  },

  transformCodes(_codes, _propName) {
    // No transformation needed in this plugin
    return undefined
  }
}

// Self-register the plugin when imported
pluginRegistry.register(shorthandPlugin)