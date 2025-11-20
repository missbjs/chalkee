/**
 * Plugin registry for managing Crayon extensions
 */
import type { StylePlugin } from './base'
import type { AnsiCodes } from '../ansi'
import type { StyledFunction } from '../types'

export class StylePluginRegistry {
  private plugins: StylePlugin[] = [];

  /** Register a new plugin */
  register(plugin: StylePlugin): void {
    this.plugins.push(plugin)
  }

  /** Handle property access through registered plugins */
  handleProperty(
    target: StyledFunction,
    prop: string,
    codes: AnsiCodes[],
    accumulatedText: string,
    options?: {
      createStyler?: Function,
      ansiCodes?: Record<string, AnsiCodes>,
      pluginRegistry?: any
    }
  ): StyledFunction | undefined {
    for (const plugin of this.plugins) {
      if (plugin.handleProperty) {
        const result = plugin.handleProperty(target, prop, codes, accumulatedText, options)
        if (result !== undefined) {
          return result
        }
      }
    }
    return undefined
  }

  /** Get additional ANSI codes from all plugins */
  getAdditionalCodes(): Record<string, AnsiCodes> {
    const codes: Record<string, AnsiCodes> = {}
    for (const plugin of this.plugins) {
      if (plugin.registerCodes) {
        Object.assign(codes, plugin.registerCodes())
      }
    }
    return codes
  }

  /** Transform codes through registered plugins */
  transformCodes(codes: AnsiCodes[], propName: string): AnsiCodes[] {
    let transformedCodes = codes
    for (const plugin of this.plugins) {
      if (plugin.transformCodes) {
        const result = plugin.transformCodes(transformedCodes, propName)
        if (result !== undefined) {
          transformedCodes = result
        }
      }
    }
    return transformedCodes
  }

  /** Handle reset operation - clear special mode markers and add reset code */
  handleReset(codes: AnsiCodes[], resetCode: AnsiCodes): AnsiCodes[] {
    // Filter out mode markers by asking each plugin
    const codesWithoutModes = codes.filter(code => {
      // Ask each plugin if this is a marker code
      for (const plugin of this.plugins) {
        if (plugin.isMarkerCode && plugin.isMarkerCode(code)) {
          return false // This is a marker, filter it out
        }
      }
      return true // Not a marker, keep it
    })
    // Add the reset code
    return [...codesWithoutModes, resetCode]
  }

  /** Filter out marker codes that don't produce visual output */
  filterMarkerCodes(codes: AnsiCodes[]): AnsiCodes[] {
    return codes.filter(code => {
      // Ask each plugin if this is a marker code
      for (const plugin of this.plugins) {
        if (plugin.isMarkerCode && plugin.isMarkerCode(code)) {
          return false // This is a marker, filter it out
        }
      }
      return true // Not a marker, keep it
    })
  }

  /** Check if any code in the list is a specific marker (by asking plugins) */
  hasMarkerMode(codes: AnsiCodes[], markerCheck: (code: AnsiCodes) => boolean): boolean {
    return codes.some(markerCheck)
  }
}