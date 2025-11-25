/**
 * Plugin registry for managing Crayon extensions
 */
import type { StylePlugin } from './plugins/base';
import type { AnsiCodes } from './ansi';
import type { StyledFunction } from './types';
export declare let plugins: StylePlugin[];
export declare let registeredCodes: Record<string, AnsiCodes>;
/** Register ANSI codes */
export declare function registerCodes(newCodes: Record<string, AnsiCodes>): void;
/** Register a new plugin */
export declare function register(plugin: StylePlugin): void;
/** Handle property access through registered plugins */
export declare function handleProperty(target: StyledFunction, prop: string, codes: AnsiCodes[], accumulatedText: string, options?: {
    createStyler?: Function;
    ansiCodes?: Record<string, AnsiCodes>;
    pluginRegistry?: any;
}): StyledFunction | undefined;
/** Filter out marker codes that don't produce visual output */
export declare function filterMarkerCodes(codes: AnsiCodes[]): AnsiCodes[];
/** Let plugins process text with special behaviors (like auto-spacing) */
export declare function processText(codes: AnsiCodes[], text: string, accumulatedText: string): {
    styledText: string;
} | undefined;
//# sourceMappingURL=registry.d.ts.map