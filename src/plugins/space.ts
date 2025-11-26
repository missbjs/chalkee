/**
 * Space mode plugin
 * Adds automatic spacing between chained segments
 */
import type { StylePlugin, AttachPropertiesOptions } from './base'
import type { AnsiCodes } from '../ansi'
import { Styler } from '../styler'
import { register } from '../registry'

// Space mode marker
const SPACE_MARKER = '\x00AS\x00'

export const spacePlugin: StylePlugin = {
  name: 'space',

  handleProperty(_target: Styler, prop: string, codes: AnsiCodes[], accumulatedText: string, options?: { createStyler?: Function, ansiCodes?: Record<string, AnsiCodes>, pluginRegistry?: any }) {
    // Handle space (.as) - creates a persistent mode that adds spaces until reset
    if (prop === 'as') {
      // Use the passed createStyler function to avoid circular dependencies
      if (options?.createStyler) {
        // Create a special ANSI code for space mode
        const spaceCode = { open: SPACE_MARKER, close: '' }
        return (options.createStyler as Function)([...codes, spaceCode], accumulatedText)
      }
    }

    return undefined
  },

  /**
   * Attach space properties directly to a styler function
   * This provides better performance than proxy-based property access
   */
  attachProperties(stylerFunction: Function, options: AttachPropertiesOptions): void {
    const { createStyler } = options

    // Attach space property
    Object.defineProperty(stylerFunction, 'as', {
      get() {
        // Create a special ANSI code for space mode
        const spaceCode = { open: SPACE_MARKER, close: '' }
        return createStyler([spaceCode], '')
      },
      enumerable: true,
      configurable: true
    })
  },

  isMarkerCode(code: AnsiCodes) {
    // Identify our space marker code
    return code.open === SPACE_MARKER
  },

  processText(codes: AnsiCodes[], text: string, accumulatedText: string, filterMarkerCodes: (codes: AnsiCodes[]) => AnsiCodes[]) {
    // Check if we're in auto-space mode
    const autoSpaceMode = codes.some(code => code.open === SPACE_MARKER)

    if (autoSpaceMode) {
      let styledText = ''

      // Add a plain space before the text if accumulatedText is not empty
      if (accumulatedText.length > 0 && !accumulatedText.endsWith(' ')) {
        // Apply styles to the space with no styling codes
        const plainSpace = applyStyle(' ', [])
        // Apply styles to the actual text with the normal codes (excluding markers)
        const styledTextContent = applyStyle(text, filterMarkerCodes(codes))
        styledText = plainSpace + styledTextContent
      } else {
        // Apply styles to the text with the normal codes (excluding markers)
        styledText = applyStyle(text, filterMarkerCodes(codes))
      }

      return { styledText }
    }

    return undefined
  }
}

// Self-register the plugin when imported
register(spacePlugin)

// Export helper to check if codes contain space mode
export function isSpaceMode(codes: AnsiCodes[]): boolean {
  return codes.some(code => code.open === SPACE_MARKER)
}

// Helper to apply ANSI codes to text
function applyStyle(text: string, codes: AnsiCodes[]): string {
  if (codes.length === 0) {
    return text
  }

  const openCodes = codes.map((c) => c.open).join('')
  const closeCodes = codes
    .map((c) => c.close)
    .reverse()
    .join('')

  return `${openCodes}${text}${closeCodes}`
}

// Augment the Styler interface with space property
declare module '../styler' {
  interface Styler {
    // Space method
    as: Styler
  }
}