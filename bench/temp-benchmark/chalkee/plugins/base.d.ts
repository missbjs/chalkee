/**
 * Base plugin interface for extending Crayon functionality
 */
import type { AnsiCodes } from '../ansi';
import type { StyledFunction } from '../types';
export interface StylePlugin {
    /** Unique name of the plugin */
    name: string;
    /**
     * Handle property access in the proxy
     * Return undefined to let other plugins or core handle it
     */
    handleProperty?(target: StyledFunction, prop: string, codes: AnsiCodes[], accumulatedText: string, options?: {
        createStyler?: Function;
    }): StyledFunction | undefined;
    /**
     * Check if a code is a marker code that should be filtered when rendering
     * Marker codes are used for mode tracking but don't produce visual output
     */
    isMarkerCode?(code: AnsiCodes): boolean;
    /**
     * Process text with special behaviors (like auto-spacing)
     * Return processed text or undefined to use default behavior
     */
    processText?(codes: AnsiCodes[], text: string, accumulatedText: string, filterMarkerCodes: (codes: AnsiCodes[]) => AnsiCodes[]): {
        styledText: string;
    } | undefined;
}
//# sourceMappingURL=base.d.ts.map