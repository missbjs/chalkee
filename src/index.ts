import { createStyler } from './styler'
import type { Styler } from './styler'

// Import modifiers plugin first, then core plugin to ensure modifier codes are registered
// before the core plugin tries to access them
import './plugins/modifiers'
import './plugins/core'
import './plugins/ext-colors'
import './plugins/bg'
import './plugins/util'
import './plugins/space'
import './plugins/emoji'

// Create the main crayon instance
const crayon = createStyler() as Styler

// Export default crayon object
export default crayon

// For now, let's not export named properties to avoid the initialization issue
// We'll focus on making sure the default export works correctly

// Export types
export type { Styler } from './styler'

// Export utility functions and plugin registry
import { register } from './registry'
export { register, registeredCodes } from './registry'
export { createRgbCode, hslToRgb } from './plugins/util'

// Method to register plugins externally
export const registerPluginExternal = (plugin: any) => {
    // This allows external registration of plugins
    // Plugins can be registered by importing and calling this method
    if (plugin && typeof plugin === 'object' && plugin.name) {
        register(plugin)
    }
}

// Method to create a styler with specific options
export const createCrayon = (options?: {
    plugins?: any[],
    // Add other options as needed
}) => {
    // Create a new styler instance
    const instance = createStyler() as Styler

    // Register any provided plugins
    if (options?.plugins) {
        options.plugins.forEach(plugin => {
            if (plugin && typeof plugin === 'object' && plugin.name) {
                register(plugin)
            }
        })
    }

    return instance
}