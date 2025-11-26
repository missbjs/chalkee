/**
 * Color utilities plugin
 * Provides hex, rgb, bgHex, bgRgb color utilities with proper TypeScript augmentation
 */
import type { StylePlugin } from './base';
import type { AnsiCodes } from '../ansi';
/**
 * Create RGB foreground ANSI code
 */
declare function createRgbCode(r: number, g: number, b: number): AnsiCodes;
/**
 * Create RGB background ANSI code
 */
declare function createBgRgbCode(r: number, g: number, b: number): AnsiCodes;
/**
 * Parse hex color string to RGB values
 */
declare function parseHex(hex: string): [number, number, number];
/**
 * Validate RGB values
 */
declare function validateRgb(r: number, g: number, b: number): void;
/**
 * Convert HSL to RGB
 * @param h Hue (0-360)
 * @param s Saturation (0-100)
 * @param l Lightness (0-100)
 */
declare function hslToRgb(h: number, s: number, l: number): [number, number, number];
export { createRgbCode, createBgRgbCode, parseHex, validateRgb, hslToRgb };
export declare const utilPlugin: StylePlugin;
declare module '../styler' {
    interface Styler {
        hex: (color: string) => Styler;
        h: (color: string) => Styler;
        bgHex: (color: string) => Styler;
        rgb: (r: number, g: number, b: number) => Styler;
        bgRgb: (r: number, g: number, b: number) => Styler;
    }
}
//# sourceMappingURL=util.d.ts.map