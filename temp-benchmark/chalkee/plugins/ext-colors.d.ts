/**
 * Custom colors plugin
 * Provides extended color codes with proper TypeScript augmentation
 */
import type { StylePlugin } from './base';
export declare const customColorsPlugin: StylePlugin;
declare module '../styler' {
    interface Styler {
        hex: (color: string) => Styler;
        rgb: (r: number, g: number, b: number) => Styler;
        bgHex: (color: string) => Styler;
        bgRgb: (r: number, g: number, b: number) => Styler;
        h: (color: string) => Styler;
        pink: Styler;
        orange: Styler;
        purple: Styler;
        lime: Styler;
        coral: Styler;
        teal: Styler;
        bgPink: Styler;
        bgOrange: Styler;
        bgPurple: Styler;
        bgLime: Styler;
        bgCoral: Styler;
        bgTeal: Styler;
        blink: Styler;
        overline: Styler;
        doubleUnderline: Styler;
    }
}
//# sourceMappingURL=ext-colors.d.ts.map