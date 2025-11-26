import {
  type AnsiCodes,
  isColorSupported,
} from './ansi'
import {
  processText,
  filterMarkerCodes,
  registeredCodes,
  plugins,
} from './registry'


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
 * Escape ANSI codes in a string so they are displayed as raw text instead of being interpreted
 * Transforms '\x1b[30m' -> '\\x1b[30m'
 */
export function escapeAnsi(text: string): string {
  return text.replace(/\x1b\[/g, '\\\\x1b[')
}

/**
 * Styler class that encapsulates the styling functionality
 */
export class Styler {
  public codes: AnsiCodes[]
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
      return Styler.create(this.codes, this.accumulatedText + styledText)
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
    return Styler.create(this.codes, this.accumulatedText + styledText)
  }

  /**
   * Static factory method to create a new Styler instance that is callable
   */
  static create(codes: AnsiCodes[] = [], accumulatedText: string = ''): Styler {
    // Create a new instance
    const instance = new Styler(codes, accumulatedText)

    // Create a callable function that delegates to the call method
    const fn = ((...args: [string] | [TemplateStringsArray, ...unknown[]]) => {
      return instance.call(...args)
    }) as Styler & ((...args: any[]) => Styler)

    // Set the prototype so the function inherits class methods
    Object.setPrototypeOf(fn, Styler.prototype)

    // Copy the accumulatedText to the function so it can be accessed properly
    fn.toString = () => accumulatedText
    fn.valueOf = () => accumulatedText
    fn[Symbol.toPrimitive] = (hint: string) => {
      if (hint === 'string' || hint === 'default') {
        return accumulatedText
      }
      return accumulatedText
    }

    // Let plugins attach their properties directly to this function
    // This replaces the proxy-based approach with direct property attachment for better performance
    const pluginOptions = {
      createStyler: Styler.create,
      ansiCodes: registeredCodes
    }

    // Allow each plugin to attach its properties directly to the styler function
    for (let i = 0; i < plugins.length; i++) {
      const plugin = plugins[i]
      if (plugin.attachProperties) {
        plugin.attachProperties(fn, pluginOptions)
      }
    }

    // Also attach registered ANSI codes directly as properties
    for (const prop in registeredCodes) {
      if (!(prop in fn)) { // Avoid overriding existing properties
        Object.defineProperty(fn, prop, {
          get() {
            return Styler.create([...codes, registeredCodes[prop]], accumulatedText)
          },
          enumerable: true,
          configurable: true
        })
      }
    }

    return fn
  }
}

/**
 * Create a styler function with the specified ANSI codes and accumulated text
 * This is the main entry point for creating styled text functions
 * Maintains backward compatibility with the existing API
 */
export function createStyler(codes: AnsiCodes[] = [], accumulatedText: string = ''): any {
  return Styler.create(codes, accumulatedText)
}