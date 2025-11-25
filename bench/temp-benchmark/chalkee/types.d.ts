/**
 * Type definitions for Crayon
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
export interface Crayon extends StyledFunction {
}
//# sourceMappingURL=types.d.ts.map