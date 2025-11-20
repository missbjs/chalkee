/**
 * Background color mode plugin
 * Makes bg. a persistent mode where all color properties become background colors
 */
import type { StylePlugin } from './base'
import type { AnsiCodes } from '../ansi'
import type { StyledFunction } from '../types'
import { pluginRegistry } from './registry-instance'
import { ansiCodes as coreAnsiCodes } from '../ansi'

// Background mode marker
const BG_MODE_MARKER = '\x00BG\x00'

export const bgModePlugin: StylePlugin = {
  name: 'bgMode',

  handleProperty(_target: StyledFunction, prop: string, codes: AnsiCodes[], accumulatedText: string, options?: { createStyler?: Function, ansiCodes?: Record<string, AnsiCodes>, pluginRegistry?: any }) {
    // Handle bg namespace - creates a persistent background-color mode
    if (prop === 'bg') {
      // Use the passed createStyler function to avoid circular dependencies
      if (options?.createStyler) {
        // Create a special marker for background-color mode
        const bgModeCode = { open: BG_MODE_MARKER, close: '' }
        return (options.createStyler as Function)([...codes, bgModeCode], accumulatedText)
      }
    }

    // Check if we're in background-color mode
    const bgMode = codes.some(code => code.open === BG_MODE_MARKER)

    // If in bg-mode and accessing a foreground color, convert to background color
    if (bgMode && prop in coreAnsiCodes && !prop.startsWith('bg')) {
      // Check if it's a foreground color (not a modifier like bold, italic, etc.)
      const isForegroundColor = [
        'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray', 'grey',
        'blackBright', 'redBright', 'greenBright', 'yellowBright', 'blueBright', 'magentaBright', 'cyanBright', 'whiteBright'
      ].includes(prop)

      if (isForegroundColor) {
        // Convert to background color: red -> bgRed, redBright -> bgRedBright
        const bgStyleName = ('bg' + prop.charAt(0).toUpperCase() + prop.slice(1)) as keyof typeof coreAnsiCodes
        if (bgStyleName in coreAnsiCodes && options?.createStyler) {
          return (options.createStyler as Function)([...codes, coreAnsiCodes[bgStyleName]], accumulatedText)
        }
      }
    }

    return undefined
  },

  registerCodes() {
    // BG mode plugin doesn't add new ANSI codes, it transforms existing ones
    return {}
  },

  transformCodes(_codes: AnsiCodes[], _propName: string) {
    // No transformation needed in this plugin
    return undefined
  },

  isMarkerCode(code: AnsiCodes) {
    // Identify our bg-mode marker code
    return code.open === BG_MODE_MARKER
  }
}

// Self-register the plugin when imported
pluginRegistry.register(bgModePlugin)

// Export the marker for other plugins to use
export const BG_MODE_CODE_MARKER = BG_MODE_MARKER