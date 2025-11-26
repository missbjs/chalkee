/**
 * Modifiers plugin
 * Provides ANSI modifier codes (bold, italic, underline, etc.) with proper TypeScript augmentation
 */
import type { StylePlugin } from './base';
export declare const modifiersPlugin: StylePlugin;
declare module '../styler' {
    interface Styler {
        reset: Styler;
        bold: Styler;
        dim: Styler;
        italic: Styler;
        underline: Styler;
        inverse: Styler;
        hidden: Styler;
        strikethrough: Styler;
        r: Styler;
        b: Styler;
        i: Styler;
        u: Styler;
        s: Styler;
        d: Styler;
    }
}
//# sourceMappingURL=modifiers.d.ts.map