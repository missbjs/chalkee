import { createStyler } from './styler'
import type { Styler } from './styler'
// Import core plugin only for minimal build
import './plugins/core'

// Create the main crayon instance
const crayon = createStyler() as Styler

// Export default crayon object
export default crayon

// Export types
export type { Styler } from './styler'