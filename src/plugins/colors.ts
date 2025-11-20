/**
 * Basic color plugin
 * Provides foreground and background color properties
 */
import type { StylePlugin } from './base'
import type { AnsiCodes } from '../ansi'
import type { StyledFunction } from '../types'
import { ansiCodes } from '../ansi'
import { pluginRegistry } from './registry-instance'

export const colorsPlugin: StylePlugin = {
  name: 'colors',

  handleProperty(_target: StyledFunction, prop: string, codes: AnsiCodes[], accumulatedText: string, options?: { createStyler?: Function, ansiCodes?: Record<string, AnsiCodes>, pluginRegistry?: any }) {
    // Check if it's a standard style
    if (prop in ansiCodes) {
      // Use the passed createStyler function to avoid circular dependencies
      if (options?.createStyler) {
        return (options.createStyler as Function)([...codes, ansiCodes[prop as keyof typeof ansiCodes]], accumulatedText)
      }
    }

    return undefined
  },

  registerCodes() {
    // This will be called during registry initialization
    // We need to import ansiCodes dynamically
    return {}
  },

  transformCodes(_codes: AnsiCodes[], _propName: string) {
    // No transformation needed in this plugin
    return undefined
  }
}

// Self-register the plugin when imported
pluginRegistry.register(colorsPlugin)