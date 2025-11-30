/**
 * Type definitions for Chalkee
 */

/**
 * A function that styles text and can be chained with other styles
 * Supports multiple calling patterns:
 * 1. Regular function call: red('text')
 * 2. Template literal: red`text`
 * 3. Curried function calls: red('text')(value)(value2)
 */
export interface StyledFunction {
    (text: string): StyledFunction & string;
    (strings: TemplateStringsArray, ...values: unknown[]): StyledFunction & string;
    (...args: any[]): StyledFunction & string;
}

/**
 * Style chain state that maintains the current styling context
 */
export interface StyleChainState {
    colors: ColorDefinition[];
    modifiers: string[];
    backgroundColors: ColorDefinition[];
    isOpen: boolean;
    previousStyles?: StyleChainState;
    autoSpacing: boolean;
}

/**
 * Color definition with ANSI code information
 */
export interface ColorDefinition {
    name: string;
    ansiCode: number;
    type: 'foreground' | 'background';
}

/**
 * Main Chalkee interface that extends StyledFunction
 */
export interface Chalkee extends StyledFunction {
    // Core colors
    red: Chalkee;
    green: Chalkee;
    blue: Chalkee;
    yellow: Chalkee;
    magenta: Chalkee;
    cyan: Chalkee;
    white: Chalkee;
    black: Chalkee;
    gray: Chalkee;
    grey: Chalkee;
    redBright: Chalkee;
    greenBright: Chalkee;
    blueBright: Chalkee;
    yellowBright: Chalkee;
    magentaBright: Chalkee;
    cyanBright: Chalkee;
    whiteBright: Chalkee;
    blackBright: Chalkee;
    
    // Background colors
    bgRed: Chalkee;
    bgGreen: Chalkee;
    bgBlue: Chalkee;
    bgYellow: Chalkee;
    bgMagenta: Chalkee;
    bgCyan: Chalkee;
    bgWhite: Chalkee;
    bgBlack: Chalkee;
    bgRedBright: Chalkee;
    bgGreenBright: Chalkee;
    bgBlueBright: Chalkee;
    bgYellowBright: Chalkee;
    bgMagentaBright: Chalkee;
    bgCyanBright: Chalkee;
    bgWhiteBright: Chalkee;
    bgBlackBright: Chalkee;
    
    // Modifiers
    bold: Chalkee;
    dim: Chalkee;
    italic: Chalkee;
    underline: Chalkee;
    strikethrough: Chalkee;
    inverse: Chalkee;
    hidden: Chalkee;
    
    // Shorthand aliases
    b: Chalkee; // bold
    d: Chalkee; // dim
    i: Chalkee; // italic
    u: Chalkee; // underline
    s: Chalkee; // strikethrough
    r: Chalkee; // reset
    
    // Special methods
    hex: (color: string) => Chalkee;
    rgb: (r: number, g: number, b: number) => Chalkee;
    bgHex: (color: string) => Chalkee;
    bgRgb: (r: number, g: number, b: number) => Chalkee;
    as: Chalkee; // auto-spacing
    
    // Reset
    reset: Chalkee;
}