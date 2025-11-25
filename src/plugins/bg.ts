import type { StylePlugin } from './base'
import type { StyledFunction } from '../types'
import type { AnsiCodes } from '../ansi'
import { registeredCodes, register } from '../registry'
// Removed direct import of coreColorsPlugin to avoid circular dependencies

// Background mode marker
const BG_MODE_MARKER = '\x00BG\x00'

export const bgPlugin: StylePlugin = {
  name: 'bg',

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

    // Get core ANSI codes from the registry instead of directly importing coreColorsPlugin
    const coreAnsiCodes = registeredCodes

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

  isMarkerCode(code: AnsiCodes) {
    // Identify our bg-mode marker code
    return code.open === BG_MODE_MARKER
  }
}

// Self-register the plugin when imported
register(bgPlugin)

// Add BG_MODE_CODE_MARKER as a property of the plugin so other plugins can access it
Object.assign(bgPlugin, { BG_MODE_CODE_MARKER: BG_MODE_MARKER })

// Augment the StyledFunction interface with bg mode property
declare module '../types' {
  interface StyledFunction {
    // Nested namespace for background colors
    bg: {
      black: StyledFunction
      red: StyledFunction
      green: StyledFunction
      yellow: StyledFunction
      blue: StyledFunction
      magenta: StyledFunction
      cyan: StyledFunction
      white: StyledFunction
      blackBright: StyledFunction
      redBright: StyledFunction
      greenBright: StyledFunction
      yellowBright: StyledFunction
      blueBright: StyledFunction
      magentaBright: StyledFunction
      cyanBright: StyledFunction
      whiteBright: StyledFunction

    }
  }
}