/**
 * Emoji plugin
 * Adds emoji support to styling
 */
import type { StylePlugin } from './base'
import { pluginRegistry } from './registry-instance'

export const emojiPlugin: StylePlugin = {
  name: 'emoji',

  handleProperty(_target, _prop, _codes, _accumulatedText) {
    // Emoji plugin doesn't handle property access directly
    // It provides a utility function that can be called later
    // But we need to use the parameters to avoid TS6133 warnings
    return undefined
  },

  registerCodes() {
    // Emoji plugin doesn't add new ANSI codes
    return {}
  },

  transformCodes(_codes, _propName) {
    // No transformation needed in this plugin
    return undefined
  }
}

// Self-register the plugin when imported
pluginRegistry.register(emojiPlugin)