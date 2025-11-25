import { type AnsiCodes } from './ansi';
import type { StyledFunction } from './types';
/**
 * Create a styled function with chaining support
 * @param codes - Array of ANSI codes to apply
 * @param accumulatedText - Text accumulated from previous calls (for chaining after function calls)
 */
export declare function createStyler(codes?: AnsiCodes[], accumulatedText?: string): StyledFunction;
//# sourceMappingURL=styler.d.ts.map