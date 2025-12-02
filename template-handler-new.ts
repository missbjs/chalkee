/**
 * Template literal handler for processing tagged template calls
 */

import { StyleChainState, Chalkee } from '../types'
import { getColor, getModifier } from './registry'
import { inspect } from 'util'

// Get the inspect.custom symbol (following your pattern from debug-esm.chain.ts)
const customInspect = inspect.custom ?? Symbol('custom.inspect')

/**
 * Create a styled function that maintains the current state and can be chained
 * Following the pattern from debug-esm.chain.ts
 */
class CallableChalkee {
    // Store state as class properties
    private _colors: any[] = []
    private _modifiers: string[] = []
    private _backgroundColors: any[] = []
    private _isOpen: boolean = false
    private _autoSpacing: boolean = false
    private _text: string = ''
