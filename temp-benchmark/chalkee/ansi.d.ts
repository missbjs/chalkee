/**
 * ANSI escape code definitions and utilities
 */
export declare const ansiCodes: {};
export interface AnsiCodes {
    open: string;
    close: string;
}
export type StyleName = keyof typeof ansiCodes;
/**
 * Check if colors should be enabled based on environment
 */
export declare function isColorSupported(): boolean;
//# sourceMappingURL=ansi.d.ts.map