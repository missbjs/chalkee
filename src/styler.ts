import {
  type AnsiCodes,
  isColorSupported,
  createRgbCode,
  createBgRgbCode,
  parseHex,
  validateRgb,
} from './ansi'
import type { StyledFunction } from './types'
import { pluginRegistry, ansiCodes } from './plugins/registry-instance'
import { isAutoSpaceMode } from './plugins/auto-space'
import { BG_MODE_CODE_MARKER } from './plugins/bg-mode'

/**
 * Apply ANSI codes to text
 */
function applyStyle(text: string, codes: AnsiCodes[]): string {
  if (!isColorSupported() || codes.length === 0) {
    return text
  }

  const openCodes = codes.map((c) => c.open).join('')
  const closeCodes = codes
    .map((c) => c.close)
    .reverse()
    .join('')

  return `${openCodes}${text}${closeCodes}`
}

/**
 * Create a styled function with chaining support
 * @param codes - Array of ANSI codes to apply
 * @param accumulatedText - Text accumulated from previous calls (for chaining after function calls)
 */
export function createStyler(codes: AnsiCodes[] = [], accumulatedText: string = ''): StyledFunction {
  // Main function that handles both regular calls and template literals
  const stylerFunction = function (
    this: unknown,
    ...args: [string] | [TemplateStringsArray, ...unknown[]]
  ): StyledFunction {
    // Handle template literal call
    if (Array.isArray(args[0]) && 'raw' in args[0]) {
      const strings = args[0] as TemplateStringsArray
      const values = args.slice(1)
      const text = strings.reduce(
        (result, str, i) => result + str + (values[i] !== undefined ? String(values[i]) : ''),
        ''
      )

      // Check if we're in auto-space mode
      const autoSpaceMode = isAutoSpaceMode(codes)
      let processedText = text
      let styledText = ''

      if (autoSpaceMode) {
        // Add a plain space before the text if accumulatedText is not empty
        if (accumulatedText.length > 0 && !accumulatedText.endsWith(' ')) {
          // Apply styles to the space with no styling codes
          const plainSpace = applyStyle(' ', [])
          // Apply styles to the actual text with the normal codes (excluding markers)
          const styledTextContent = applyStyle(processedText, pluginRegistry.filterMarkerCodes(codes))
          styledText = plainSpace + styledTextContent
        } else {
          // Apply styles to the text with the normal codes (excluding markers)
          styledText = applyStyle(processedText, pluginRegistry.filterMarkerCodes(codes))
        }
      } else {
        // Normal behavior - apply styles to the text (excluding markers)
        styledText = applyStyle(processedText, pluginRegistry.filterMarkerCodes(codes))
      }

      // Return a new styler with accumulated text
      return createStyler(codes, accumulatedText + styledText)
    }

    // Handle regular function call
    const text = String(args[0] ?? '')

    // Check if we're in auto-space mode
    const autoSpaceMode = isAutoSpaceMode(codes)
    let processedText = text
    let styledText = ''

    if (autoSpaceMode) {
      // Add a plain space before the text if accumulatedText is not empty
      if (accumulatedText.length > 0 && !accumulatedText.endsWith(' ')) {
        // Apply styles to the space with no styling codes
        const plainSpace = applyStyle(' ', [])
        // Apply styles to the actual text with the normal codes (excluding markers)
        const styledTextContent = applyStyle(processedText, pluginRegistry.filterMarkerCodes(codes))
        styledText = plainSpace + styledTextContent
      } else {
        // Apply styles to the text with the normal codes (excluding markers)
        styledText = applyStyle(processedText, pluginRegistry.filterMarkerCodes(codes))
      }
    } else {
      // Normal behavior - apply styles to the text (excluding markers)
      styledText = applyStyle(processedText, pluginRegistry.filterMarkerCodes(codes))
    }

    // Return a new styler with accumulated text
    return createStyler(codes, accumulatedText + styledText)
  }

  // Override toString and valueOf to return accumulated text
  stylerFunction.toString = () => accumulatedText
  stylerFunction.valueOf = () => accumulatedText

  // Add Symbol.toPrimitive for proper string conversion
  Object.defineProperty(stylerFunction, Symbol.toPrimitive, {
    value: (hint: string) => {
      if (hint === 'string' || hint === 'default') {
        return accumulatedText
      }
      return accumulatedText
    },
    enumerable: false,
  })

  // Create proxy to intercept property access for chaining
  const proxy = new Proxy(stylerFunction, {
    get: (target, prop: string | symbol) => {
      if (typeof prop === 'symbol') {
        // @ts-expect-error - Accessing symbol properties on function
        return target[prop]
      }

      // Special properties for string conversion
      if (prop === 'toString' || prop === 'valueOf') {
        return target[prop]
      }

      // Prepare options for plugins
      const pluginOptions = {
        createStyler,
        ansiCodes,
        pluginRegistry
      }

      // Let plugins handle property access
      const pluginResult = pluginRegistry.handleProperty(
        stylerFunction as unknown as StyledFunction,
        prop as string,
        codes,
        accumulatedText,
        pluginOptions
      )
      if (pluginResult !== undefined) {
        return pluginResult
      }

      // Check if it's a standard style in our combined ansiCodes
      if (prop in ansiCodes) {
        return createStyler([...codes, ansiCodes[prop as keyof typeof ansiCodes]], accumulatedText)
      }

      // Handle hex color utility
      if (prop === 'hex' || prop === 'h') {
        return (color: string) => {
          const [r, g, b] = parseHex(color)
          // Check if we're in background-color mode
          const bgMode = codes.some(code => code.open === BG_MODE_CODE_MARKER)
          // In bg-mode, use background RGB code
          const rgbCode = bgMode ? createBgRgbCode(r, g, b) : createRgbCode(r, g, b)
          return createStyler([...codes, rgbCode], accumulatedText)
        }
      }

      // Handle bgHex color utility (explicit background, ignores bg-mode)
      if (prop === 'bgHex') {
        return (color: string) => {
          const [r, g, b] = parseHex(color)
          const rgbCode = createBgRgbCode(r, g, b)
          return createStyler([...codes, rgbCode], accumulatedText)
        }
      }

      // Handle rgb color utility
      if (prop === 'rgb') {
        return (r: number, g: number, b: number) => {
          validateRgb(r, g, b)
          // Check if we're in background-color mode
          const bgMode = codes.some(code => code.open === BG_MODE_CODE_MARKER)
          // In bg-mode, use background RGB code
          const rgbCode = bgMode ? createBgRgbCode(r, g, b) : createRgbCode(r, g, b)
          return createStyler([...codes, rgbCode], accumulatedText)
        }
      }

      // Handle bgRgb color utility (explicit background, ignores bg-mode)
      if (prop === 'bgRgb') {
        return (r: number, g: number, b: number) => {
          validateRgb(r, g, b)
          const rgbCode = createBgRgbCode(r, g, b)
          return createStyler([...codes, rgbCode], accumulatedText)
        }
      }

      return undefined
    },
  })

  // @ts-expect-error - Proxy wraps the function with style properties
  return proxy as StyledFunction
}