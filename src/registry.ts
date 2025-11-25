/**
 * Plugin registry for managing Crayon extensions
 */
import type { StylePlugin } from './plugins/base'
import type { AnsiCodes } from './ansi'
import type { StyledFunction } from './types'

// Plugin storage
export let plugins: StylePlugin[] = []

// Flag to track if plugins have changed

// Storage for registered codes
export let registeredCodes: Record<string, AnsiCodes> = {}

/** Register ANSI codes */
export function registerCodes(newCodes: Record<string, AnsiCodes>): void {
  Object.assign(registeredCodes, newCodes)
}

/** Register a new plugin */
export function register(plugin: StylePlugin): void {
  plugins.push(plugin)
}

/** Handle property access through registered plugins */
export function handleProperty(
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
  // Quick exit if no plugins
  if (plugins.length === 0) {
    return undefined
  }

  // Quick exit if no plugins have handleProperty method
  let hasHandleProperty = false
  for (let i = 0; i < plugins.length; i++) {
    if (plugins[i].handleProperty) {
      hasHandleProperty = true
      break
    }
  }

  if (!hasHandleProperty) {
    return undefined
  }

  // Process plugins that have handleProperty method
  for (let i = 0; i < plugins.length; i++) {
    const plugin = plugins[i]
    if (plugin.handleProperty) {
      const result = plugin.handleProperty(target, prop, codes, accumulatedText, options)
      if (result !== undefined) {
        return result
      }
    }
  }
  return undefined
}

/** Filter out marker codes that don't produce visual output */
export function filterMarkerCodes(codes: AnsiCodes[]): AnsiCodes[] {
  // Quick exit if no codes or no plugins
  if (codes.length === 0 || plugins.length === 0) {
    return codes
  }

  // Quick exit if no plugins have isMarkerCode method
  let hasIsMarkerCode = false
  for (let i = 0; i < plugins.length; i++) {
    if (plugins[i].isMarkerCode) {
      hasIsMarkerCode = true
      break
    }
  }

  if (!hasIsMarkerCode) {
    return codes
  }

  const result: AnsiCodes[] = []
  for (let i = 0; i < codes.length; i++) {
    const code = codes[i]
    let isMarker = false
    // Ask each plugin if this is a marker code
    for (let j = 0; j < plugins.length; j++) {
      const plugin = plugins[j]
      if (plugin.isMarkerCode && plugin.isMarkerCode(code)) {
        isMarker = true
        break
      }
    }
    if (!isMarker) {
      result.push(code)
    }
  }
  return result
}

/** Let plugins process text with special behaviors (like auto-spacing) */
export function processText(codes: AnsiCodes[], text: string, accumulatedText: string): { styledText: string } | undefined {
  // Quick exit if no plugins
  if (plugins.length === 0) {
    return undefined
  }

  // Quick exit if no plugins have processText method
  let hasProcessText = false
  for (let i = 0; i < plugins.length; i++) {
    if (plugins[i].processText) {
      hasProcessText = true
      break
    }
  }

  if (!hasProcessText) {
    return undefined
  }

  // Let each plugin process the text if they have a processText method
  for (let i = 0; i < plugins.length; i++) {
    const plugin = plugins[i]
    if (plugin.processText) {
      const result = plugin.processText(codes, text, accumulatedText, filterMarkerCodes)
      if (result !== undefined) {
        return result
      }
    }
  }
  return undefined
}