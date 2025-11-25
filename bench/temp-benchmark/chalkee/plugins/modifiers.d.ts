/**
 * Modifiers plugin
 * Provides ANSI modifier codes (bold, italic, underline, etc.) with proper TypeScript augmentation
 */
import type { StylePlugin } from './base';
export declare const modifiersPlugin: StylePlugin;
declare module '../types' {
    interface StyledFunction {
        reset: StyledFunction;
        bold: StyledFunction;
        dim: StyledFunction;
        italic: StyledFunction;
        underline: StyledFunction;
        inverse: StyledFunction;
        hidden: StyledFunction;
        strikethrough: StyledFunction;
        r: StyledFunction;
        b: StyledFunction;
        i: StyledFunction;
        u: StyledFunction;
        s: StyledFunction;
        d: StyledFunction;
    }
}
//# sourceMappingURL=modifiers.d.ts.map