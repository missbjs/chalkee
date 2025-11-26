import {
  type AnsiCodes,
  isColorSupported,
} from './ansi'
import {
  handleProperty,
  processText,
  filterMarkerCodes,
  registeredCodes,
} from './registry'

// Cache for proxy objects to improve performance
const proxyCache = new Map<string, any>()

/**
 * Generate a cache key for proxy objects
 */
function generateCacheKey(codes: AnsiCodes[], accumulatedText: string): string {
  if (codes.length === 0) {
    return `text:${accumulatedText}`
  }
  const codesKey = codes.map((c) => `${c.open}|${c.close}`).join(',')
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
 * Styler class that encapsulates the styling functionality
 */
export class Styler {
  private codes: AnsiCodes[]
  private accumulatedText: string
  // private inspectCustom = Symbol.for('nodejs.util.inspect.custom')

  constructor(codes: AnsiCodes[] = [], accumulatedText: string = '') {
    this.codes = codes
    this.accumulatedText = accumulatedText

    // Initialize symbol properties directly as class properties
    this.initializeSymbolProperties()
  }

  /**
   * Initialize symbol properties for proper string conversion
   */
  private initializeSymbolProperties(): void {
    // Add Symbol.toPrimitive for proper string conversion
    (this as any)[Symbol.toPrimitive] = (hint: string) => {
      if (hint === 'string' || hint === 'default') {
        return this.accumulatedText
      }
      return this.accumulatedText
    }

    // Add toStringTag for better object representation
    (this as any)[Symbol.toStringTag] = 'Crayon';

    // Add custom inspect method for Node.js util.inspect
    (this as any)[Symbol.for('nodejs.util.inspect.custom')] = () => {
      return this.accumulatedText
    }
  }

  /**
   * Convert to string representation
   */
  public toString(): string {
    return this.accumulatedText
  }

  /**
   * Convert to primitive value
   */
  public valueOf(): string {
    return this.accumulatedText
  }

  /**
   * Convert to primitive value for string conversion
   */
  public [Symbol.toPrimitive](hint: string): string {
    if (hint === 'string' || hint === 'default') {
      return this.accumulatedText
    }
    return this.accumulatedText
  }

  /**
   * Main method that handles both regular calls and template literals
   */
  public call(...args: [string] | [TemplateStringsArray, ...unknown[]]): Styler {
    // Handle template literal call
    if (Array.isArray(args[0]) && 'raw' in args[0]) {
      const strings = args[0] as TemplateStringsArray
      const values = args.slice(1)
      const text = strings.reduce(
        (result, str, i) => result + str + (values[i] !== undefined ? String(values[i]) : ''),
        ''
      )

      // Let plugins handle special mode behaviors
      const pluginResult = processText(this.codes, text, this.accumulatedText)
      let styledText = ''

      if (pluginResult) {
        styledText = pluginResult.styledText
      } else {
        // Fallback to default behavior - apply styles to the text (excluding markers)
        styledText = applyStyle(text, filterMarkerCodes(this.codes))
      }

      // Return a new styler with accumulated text
      return createStyler(this.codes, this.accumulatedText + styledText)
    }

    // Handle regular function call
    const text = String(args[0] ?? '')

    // Let plugins handle special mode behaviors
    const pluginResult = processText(this.codes, text, this.accumulatedText)
    let styledText = ''

    if (pluginResult) {
      styledText = pluginResult.styledText
    } else {
      // Fallback to default behavior - apply styles to the text (excluding markers)
      styledText = applyStyle(text, filterMarkerCodes(this.codes))
    }

    // Return a new styler with accumulated text
    return createStyler(this.codes, this.accumulatedText + styledText)
  }

}

/**
 * Create a styler function with the specified ANSI codes and accumulated text
 * This is the main entry point for creating styled text functions
 */
export function createStyler(codes: AnsiCodes[] = [], accumulatedText: string = ''): any {
  const cacheKey = generateCacheKey(codes, accumulatedText)

  // Check cache first for performance
  if (proxyCache.has(cacheKey)) {
    return proxyCache.get(cacheKey)
  }

  // Create the main function that handles both regular calls and template literals
  const stylerFunction = function (...args: [string] | [TemplateStringsArray, ...unknown[]]) {
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
  } as any

  // Add Symbol.toStringTag for better object representation
  Object.defineProperty(stylerFunction, Symbol.toStringTag, {
    value: 'Crayon',
    enumerable: false
  })

  // Create proxy to handle property access through plugins
  const proxy = new Proxy(stylerFunction, {
    get: (target, prop) => {
      // Handle symbol properties
      if (typeof prop === 'symbol') {
        return target[prop]
      }

      // Handle built-in methods
      if (prop === 'toString' || prop === 'valueOf') {
        return () => accumulatedText
      }

      // Handle Symbol.toPrimitive
      if (typeof prop === 'symbol' && prop === Symbol.toPrimitive) {
        return (hint: string) => {
          if (hint === 'string' || hint === 'default') {
            return accumulatedText
          }
          return accumulatedText
        }
      }

      // Handle Node.js util.inspect
      const inspectCustom = Symbol.for('nodejs.util.inspect.custom')
      if (typeof prop === 'symbol' && prop === inspectCustom) {
        return () => accumulatedText
      }

      // Let plugins handle property access
      const pluginOptions = {
        createStyler,
        ansiCodes: registeredCodes
      }

      const pluginResult = handleProperty(
        target,
        prop,
        codes,
        accumulatedText,
        pluginOptions
      )

      if (pluginResult !== undefined) {
        return pluginResult
      }

      // Handle registered ANSI codes
      if (prop in registeredCodes) {
        return createStyler([...codes, registeredCodes[prop]], accumulatedText)
      }

      // Property not found
      return undefined
    }
  })

  // Add custom inspect method for Node.js util.inspect
  const inspectCustom = Symbol.for('nodejs.util.inspect.custom')
  Object.defineProperty(proxy, inspectCustom, {
    value: () => accumulatedText,
    enumerable: false,
    writable: true,
    configurable: true
  })

  // Cache the proxy for performance
  proxyCache.set(cacheKey, proxy)

  return proxy
}