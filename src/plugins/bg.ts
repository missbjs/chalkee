import type { StylePlugin, AttachPropertiesOptions } from './base'
import { Styler } from '../styler'
import type { AnsiCodes } from '../ansi'
import { registeredCodes, register } from '../registry'
// Removed direct import of coreColorsPlugin to avoid circular dependencies

// Background mode marker
const BG_MODE_MARKER = '\x00BG\x00'

// Define background color properties directly on the Styler prototype
Object.defineProperties(Styler.prototype, {
  // bg namespace for dynamic background colors
  bg: {
    get() {
      // Create a special marker for background-color mode
      const bgModeCode = { open: BG_MODE_MARKER, close: '' }
      return new Styler([bgModeCode], '')
    },
    enumerable: true,
    configurable: true
  }
})

export const bgPlugin: StylePlugin = {
  name: 'bg',

  handleProperty(_target: Styler, prop: string, codes: AnsiCodes[], accumulatedText: string, options?: { createStyler?: Function, ansiCodes?: Record<string, AnsiCodes> }) {
    // Handle bg namespace - creates a persistent background-color mode
    if (prop === 'bg') {
      // Use the passed createStyler function to avoid circular dependencies
      if (options?.createStyler) {
        // Create a special marker for background-color mode
        const bgModeCode = { open: BG_MODE_MARKER, close: '' }
        return (options.createStyler as Function)([...codes, bgModeCode], accumulatedText)
      }
    }

    // Handle .as property when in bg-mode
    if (prop === 'as') {
      // Check if we're in background-color mode
      const bgMode = codes.some(code => code.open === BG_MODE_MARKER)
      if (bgMode) {
        // Remove bg-mode marker codes and create a new styler without bg-mode
        // This new styler should then have its .as property accessed
        const nonBgModeCodes = codes.filter(code => code.open !== BG_MODE_MARKER)
        if (options?.createStyler) {
          // Create a styler without bg-mode, preserving the accumulated text
          const stylerWithoutBgMode = (options.createStyler as Function)(nonBgModeCodes, accumulatedText)
          return stylerWithoutBgMode
        }
      }
    }

    // Check if we're in background-color mode
    const bgMode = codes.some(code => code.open === BG_MODE_MARKER)

    // Get core ANSI codes from the registry instead of directly importing coreColorsPlugin
    const coreAnsiCodes = registeredCodes

    // If in bg-mode and accessing a foreground color, convert to background color
    if (bgMode && options?.ansiCodes && prop in options.ansiCodes && !prop.startsWith('bg')) {
      // Check if it's a foreground color (not a modifier like bold, italic, etc.)
      const isForegroundColor = [
        'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray', 'grey',
        'blackBright', 'redBright', 'greenBright', 'yellowBright', 'blueBright', 'magentaBright', 'cyanBright', 'whiteBright'
      ].includes(prop)

      if (isForegroundColor) {
        // Convert to background color: red -> bgRed, redBright -> bgRedBright
        const bgStyleName = ('bg' + prop.charAt(0).toUpperCase() + prop.slice(1)) as keyof typeof coreAnsiCodes
        if (bgStyleName in coreAnsiCodes && options.createStyler) {
          return (options.createStyler as Function)([...codes, coreAnsiCodes[bgStyleName]], accumulatedText)
        }
      }
    }

    return undefined
  },

  /**
   * Attach bg properties directly to a styler function
   * This provides better performance than proxy-based property access
   */
  attachProperties(stylerFunction: Function, options: AttachPropertiesOptions): void {
    const { createStyler } = options

    // Attach bg property
    Object.defineProperty(stylerFunction, 'bg', {
      get() {
        // Create a special marker for background-color mode
        const bgModeCode = { open: BG_MODE_MARKER, close: '' }
        return createStyler([bgModeCode], '')
      },
      enumerable: true,
      configurable: true
    })
  },

  isMarkerCode(code: AnsiCodes) {
    // Identify our bg-mode marker code
    return code.open === BG_MODE_MARKER
  },

}

// Self-register the plugin when imported
register(bgPlugin)

// Add BG_MODE_CODE_MARKER as a property of the plugin so other plugins can access it
Object.assign(bgPlugin, { BG_MODE_CODE_MARKER: BG_MODE_MARKER })

// Augment the Styler interface with bg mode property
declare module '../styler' {
  interface Styler {
    // Nested namespace for background colors
    bg: {
      black: Styler
      red: Styler
      green: Styler
      yellow: Styler
      blue: Styler
      magenta: Styler
      cyan: Styler
      white: Styler
      blackBright: Styler
      redBright: Styler
      greenBright: Styler
      yellowBright: Styler
      blueBright: Styler
      magentaBright: Styler
      cyanBright: Styler
      whiteBright: Styler
    }
  }
}