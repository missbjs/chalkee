// Import all plugins to register them (backward compatibility)
import './plugins/bg'
import './plugins/space'
import './plugins/core'
import './plugins/ext-colors'
import './plugins/util'
import './plugins/modifiers'
import './plugins/emoji'

// Re-export everything from the main index
export * from './index'
export { default } from './index'