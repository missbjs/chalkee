/**
 * Base plugin interface for extending Crayon functionality
 */
import type { AnsiCodes } from '../ansi'
import type { StyledFunction } from '../types'

export interface StylePlugin {
  /** Unique name of the plugin */
  name: string

  /** 
   * Handle property access in the proxy
   * Return undefined to let other plugins or core handle it
   */
  handleProperty?(
    target: StyledFunction,
    prop: string,
    codes: AnsiCodes[],
    accumulatedText: string,
    options?: {
      createStyler?: Function,
      ansiCodes?: Record<string, AnsiCodes>,
      pluginRegistry?: any
    }
  ): StyledFunction | undefined

  /** 
   * Register new ANSI codes 
   * Return additional ANSI codes to be merged with core codes
   */
  registerCodes?(): Record<string, AnsiCodes>

  /**
   * Transform existing codes (e.g., mode conversions)
   * Return transformed codes or undefined to use original
   */
  transformCodes?(codes: AnsiCodes[], propName: string): AnsiCodes[] | undefined

  /**
   * Check if a code is a marker code that should be filtered when rendering
   * Marker codes are used for mode tracking but don't produce visual output
   */
  isMarkerCode?(code: AnsiCodes): boolean
}