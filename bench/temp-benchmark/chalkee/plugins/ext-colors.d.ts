/**
 * Custom colors plugin
 * Provides extended color codes with proper TypeScript augmentation
 */
import type { StylePlugin } from './base';
export declare const customColorsPlugin: StylePlugin;
declare module '../types' {
    interface StyledFunction {
        hex: (color: string) => StyledFunction;
        rgb: (r: number, g: number, b: number) => StyledFunction;
        bgHex: (color: string) => StyledFunction;
        bgRgb: (r: number, g: number, b: number) => StyledFunction;
        h: (color: string) => StyledFunction;
        pink: StyledFunction;
        orange: StyledFunction;
        purple: StyledFunction;
        lime: StyledFunction;
        coral: StyledFunction;
        teal: StyledFunction;
        bgPink: StyledFunction;
        bgOrange: StyledFunction;
        bgPurple: StyledFunction;
        bgLime: StyledFunction;
        bgCoral: StyledFunction;
        bgTeal: StyledFunction;
        blink: StyledFunction;
        overline: StyledFunction;
        doubleUnderline: StyledFunction;
    }
}
//# sourceMappingURL=ext-colors.d.ts.map