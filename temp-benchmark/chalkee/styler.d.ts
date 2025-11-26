import { type AnsiCodes } from './ansi';
/**
 * Styler class that encapsulates the styling functionality
 */
export declare class Styler {
    private codes;
    private accumulatedText;
    constructor(codes?: AnsiCodes[], accumulatedText?: string);
    /**
     * Initialize symbol properties for proper string conversion
     */
    private initializeSymbolProperties;
    /**
     * Convert to string representation
     */
    toString(): string;
    /**
     * Convert to primitive value
     */
    valueOf(): string;
    /**
     * Convert to primitive value for string conversion
     */
    [Symbol.toPrimitive](hint: string): string;
    /**
     * Main method that handles both regular calls and template literals
     */
    call(...args: [string] | [TemplateStringsArray, ...unknown[]]): Styler;
}
/**
 * Create a styler function with the specified ANSI codes and accumulated text
 * This is the main entry point for creating styled text functions
 */
export declare function createStyler(codes?: AnsiCodes[], accumulatedText?: string): any;
//# sourceMappingURL=styler.d.ts.map