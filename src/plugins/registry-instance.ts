/**
 * Global plugin registry instance
 */
import { StylePluginRegistry } from './registry'
import { ansiCodes as coreAnsiCodes } from '../ansi'

// Create global plugin registry singleton
export const pluginRegistry = new StylePluginRegistry()

// Get combined ANSI codes from all plugins and core codes
export const getAnsiCodes = () => ({
  ...coreAnsiCodes,
  ...pluginRegistry.getAdditionalCodes()
})

// Export ansiCodes - will be dynamically updated as plugins register
export const ansiCodes = new Proxy({} as Record<string, any>, {
  get(_target, prop: string | symbol) {
    if (typeof prop === 'symbol') return undefined
    const codes = getAnsiCodes()
    return codes[prop as keyof typeof codes]
  },
  has(_target, prop: string | symbol) {
    if (typeof prop === 'symbol') return false
    const codes = getAnsiCodes()
    return prop in codes
  },
  ownKeys(_target) {
    return Object.keys(getAnsiCodes())
  },
  getOwnPropertyDescriptor(_target, prop: string | symbol) {
    if (typeof prop === 'symbol') return undefined
    const codes = getAnsiCodes()
    if (prop in codes) {
      return {
        enumerable: true,
        configurable: true,
        value: codes[prop as keyof typeof codes]
      }
    }
    return undefined
  }
})