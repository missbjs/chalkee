/// <reference types="node" />

/**
 * Styler engine for applying ANSI escape codes to text
 */

import { StyleChainState, ColorDefinition } from '../types';
import { getColor, getModifier, parseHex, rgbToAnsi256 } from './registry';

/**
 * Convert a style chain state to ANSI escape codes
 * @param state The style chain state
 * @returns The ANSI escape code string
 */
export function styleStateToAnsi(state: StyleChainState): string {
    const codes: number[] = [];
    
    // Add modifier codes
    for (const modifier of state.modifiers) {
        const code = getModifier(modifier);
        if (code !== undefined) {
            codes.push(code);
        }
    }
    
    // Add foreground color codes
    for (const color of state.colors) {
        codes.push(color.ansiCode);
    }
    
    // Add background color codes
    for (const color of state.backgroundColors) {
        codes.push(color.ansiCode);
    }
    
    // If no codes, return empty string
    if (codes.length === 0) {
        return '';
    }
    
    // Return the ANSI escape sequence
    return `\x1b[${codes.join(';')}m`;
}

/**
 * Create a reset ANSI escape code
 * @returns The reset ANSI escape code
 */
export function createReset(): string {
    return '\x1b[0m';
}

/**
 * Create a hex color ANSI escape code
 * @param hex The hex color string
 * @param isBackground Whether this is a background color
 * @returns The ANSI escape code for the hex color
 */
export function createHexCode(hex: string, isBackground: boolean = false): string {
    const [r, g, b] = parseHex(hex);
    const ansi256 = rgbToAnsi256(r, g, b);
    const code = isBackground ? 48 : 38;
    return `\x1b[${code};5;${ansi256}m`;
}

/**
 * Create an RGB color ANSI escape code
 * @param r Red value (0-255)
 * @param g Green value (0-255)
 * @param b Blue value (0-255)
 * @param isBackground Whether this is a background color
 * @returns The ANSI escape code for the RGB color
 */
export function createRgbCode(r: number, g: number, b: number, isBackground: boolean = false): string {
    const ansi256 = rgbToAnsi256(r, g, b);
    const code = isBackground ? 48 : 38;
    return `\x1b[${code};5;${ansi256}m`;
}

/**
 * Apply styling to text based on the current state
 * @param text The text to style
 * @param state The current style state
 * @returns The styled text with ANSI escape codes
 */
export function applyStyle(text: string, state: StyleChainState): string {
    // If NO_COLOR is set, return plain text
    if ((process as any).env.NO_COLOR) {
        return text;
    }
    
    // If FORCE_COLOR is set to 0, return plain text
    if ((process as any).env.FORCE_COLOR === '0') {
        return text;
    }
    
    const open = styleStateToAnsi(state);
    const close = createReset();
    
    // If auto-spacing is enabled, add a space before the text (except for the first element)
    if (state.autoSpacing && state.previousStyles) {
        text = ' ' + text;
    }
    
    return open + text + close;
}

/**
 * Merge two style states
 * @param base The base style state
 * @param overlay The overlay style state
 * @returns The merged style state
 */
export function mergeStyleStates(base: StyleChainState, overlay: StyleChainState): StyleChainState {
    return {
        colors: [...base.colors, ...overlay.colors],
        modifiers: [...base.modifiers, ...overlay.modifiers],
        backgroundColors: [...base.backgroundColors, ...overlay.backgroundColors],
        isOpen: overlay.isOpen,
        previousStyles: base,
        autoSpacing: overlay.autoSpacing
    };
}

/**
 * Create a new style chain state
 * @returns A new style chain state
 */
export function createStyleState(): StyleChainState {
    return {
        colors: [],
        modifiers: [],
        backgroundColors: [],
        isOpen: false,
        autoSpacing: false
    };
}