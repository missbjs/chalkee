/**
 * Crayon - Minimal entry point
 * Only includes core functionality, plugins must be imported separately
 */
import { createStyler } from './styler'
import type { Crayon } from './types'
import { register } from './registry'

// Create the main crayon instance
const crayon = createStyler() as Crayon

// Export default crayon object
export default crayon

// Export types
export type { StyledFunction, Crayon } from './types'

// Export utility functions
export { register }