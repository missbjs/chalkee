/**
 * Color utilities plugin
 * Provides hex, rgb, bgHex, bgRgb color utilities with proper TypeScript augmentation
 */
import type { StylePlugin } from './base';
import type { AnsiCodes } from '../ansi';
/**
 * Create RGB foreground ANSI code
 */
export declare function createRgbCode(r: number, g: number, b: number): AnsiCodes;
/**
 * Create RGB background ANSI code
 */
export declare function createBgRgbCode(r: number, g: number, b: number): AnsiCodes;
/**
 * Parse hex color string to RGB values
 */
export declare function parseHex(hex: string): [number, number, number];
/**
 * Validate RGB values
 */
export declare function validateRgb(r: number, g: number, b: number): void;
/**
 * Convert HSL to RGB
 * @param h Hue (0-360)
 * @param s Saturation (0-100)
 * @param l Lightness (0-100)
 */
export declare function hslToRgb(h: number, s: number, l: number): [number, number, number];
export declare const utilPlugin: StylePlugin;
declare module '../types' {
    interface StyledFunction {
        hex: (color: string) => StyledFunction;
        h: (color: string) => StyledFunction;
        bgHex: (color: string) => StyledFunction;
        rgb: (r: number, g: number, b: number) => StyledFunction;
        bgRgb: (r: number, g: number, b: number) => StyledFunction;
    }
}
//# sourceMappingURL=util.d.ts.map