import {
  type AnsiCodes,
  isColorSupported,
} from './ansi'
import type { StyledFunction } from './types'
import {
  handleProperty,
  processText,
  filterMarkerCodes,
  registeredCodes
} from './registry'

// Proxy cache to reuse proxy objects for the same code combinations
// Use a more efficient cache key generation
const proxyCache = new Map<string, StyledFunction>()

/**
 * Generate an efficient cache key
 * Instead of JSON.stringify, we use a simpler approach
 */
function generateCacheKey(codes: AnsiCodes[], accumulatedText: string): string {
  // For empty codes, just use accumulated text
  if (codes.length === 0) {
    return `text:${accumulatedText}`
  }

  // For codes, create a simple string representation
  const codesKey = codes.map(c => `${c.open}|${c.close}`).join(',')
  return `${codesKey}|${accumulatedText}`
}

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
  // Create a more efficient cache key
  const cacheKey = generateCacheKey(codes, accumulatedText)

  // Check if we have a cached proxy for this combination
  if (proxyCache.has(cacheKey)) {
    return proxyCache.get(cacheKey)!
  }

  // Define the custom inspect symbol
  const inspectCustom = Symbol.for('nodejs.util.inspect.custom')

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

      // Let plugins handle special mode behaviors
      const pluginResult = processText(codes, text, accumulatedText)
      let styledText = ''

      if (pluginResult) {
        styledText = pluginResult.styledText
      } else {
        // Fallback to default behavior - apply styles to the text (excluding markers)
        styledText = applyStyle(text, filterMarkerCodes(codes))
      }

      // Return a new styler with accumulated text
      return createStyler(codes, accumulatedText + styledText)
    }

    // Handle regular function call
    const text = String(args[0] ?? '')

    // Let plugins handle special mode behaviors
    const pluginResult = processText(codes, text, accumulatedText)
    let styledText = ''

    if (pluginResult) {
      styledText = pluginResult.styledText
    } else {
      // Fallback to default behavior - apply styles to the text (excluding markers)
      styledText = applyStyle(text, filterMarkerCodes(codes))
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

  // Custom inspect is defined on the proxy

  // Add toStringTag for better object representation
  Object.defineProperty(stylerFunction, Symbol.toStringTag, {
    value: 'Crayon',
    enumerable: false,
  })

  // Create proxy to intercept property access for chaining
  const proxy = new Proxy(stylerFunction, {
    get: (target, prop: string | symbol) => {
      if (typeof prop === 'symbol') {
        // @ts-expect-error - Accessing symbol properties on function
        return target[prop as any]
      }

      // Special properties for string conversion
      if (prop === 'toString' || prop === 'valueOf') {
        return target[prop]
      }

      // Handle Symbol.toPrimitive
      if (typeof prop === 'symbol' && prop === Symbol.toPrimitive) {
        return target[prop]
      }

      // Handle util.inspect.custom
      const inspectCustom = Symbol.for('nodejs.util.inspect.custom')
      if (typeof prop === 'symbol' && prop === inspectCustom) {
        return () => accumulatedText
      }

      // Prepare options for plugins
      const pluginOptions = {
        createStyler,
        ansiCodes: registeredCodes,
      }

      // Let plugins handle property access
      const pluginResult = handleProperty(
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
      if (prop in registeredCodes) {
        return createStyler([...codes, registeredCodes[prop as keyof typeof registeredCodes]], accumulatedText)
      }

      return undefined
    },
  })

  // Add custom inspect method directly to the proxy
  Object.defineProperty(proxy, inspectCustom, {
    value: () => accumulatedText,
    enumerable: false,
    writable: true,
    configurable: true
  })

  // Cache the proxy for reuse
  const styledFunction = proxy as unknown as StyledFunction
  proxyCache.set(cacheKey, styledFunction)

  return styledFunction
}