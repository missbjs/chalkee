/**
 * Plugin registry for managing Crayon extensions
 */
import type { StylePlugin } from './plugins/base';
import type { AnsiCodes } from './ansi';
import type { Styler } from './styler';
export declare let plugins: StylePlugin[];
export declare let registeredCodes: Record<string, AnsiCodes>;
/** Register ANSI codes */
export declare function registerCodes(newCodes: Record<string, AnsiCodes>): void;
/** Register a new plugin */
export declare function register(plugin: StylePlugin): void;
/**
 * Helper function to create styler properties
 * This is a shared utility function used by plugins to attach properties directly to styler functions
 */
export declare const createStylerProperty: (ansiCode: AnsiCodes, options: {
    createStyler: Function;
}) => {
    get(): any;
    enumerable: boolean;
    configurable: boolean;
};
/** Handle property access through registered plugins */
export declare function handleProperty(target: Styler, prop: string, codes: AnsiCodes[], accumulatedText: string, options?: {
    createStyler?: Function;
    ansiCodes?: Record<string, AnsiCodes>;
    pluginRegistry?: any;
}): Styler | undefined;
/** Filter out marker codes that don't produce visual output */
export declare function filterMarkerCodes(codes: AnsiCodes[]): AnsiCodes[];
/** Let plugins process text with special behaviors (like auto-spacing) */
export declare function processText(codes: AnsiCodes[], text: string, accumulatedText: string): {
    styledText: string;
} | undefined;
//# sourceMappingURL=registry.d.ts.map