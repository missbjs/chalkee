/**
 * Core plugin
 * Provides core ANSI color codes with proper TypeScript augmentation
 */
import type { StylePlugin } from './base';
export declare const corePlugin: StylePlugin;
declare module '../types' {
    interface StyledFunction {
        black: StyledFunction;
        red: StyledFunction;
        green: StyledFunction;
        yellow: StyledFunction;
        blue: StyledFunction;
        magenta: StyledFunction;
        cyan: StyledFunction;
        white: StyledFunction;
        gray: StyledFunction;
        grey: StyledFunction;
        blackBright: StyledFunction;
        redBright: StyledFunction;
        greenBright: StyledFunction;
        yellowBright: StyledFunction;
        blueBright: StyledFunction;
        magentaBright: StyledFunction;
        cyanBright: StyledFunction;
        whiteBright: StyledFunction;
        bgBlack: StyledFunction;
        bgRed: StyledFunction;
        bgGreen: StyledFunction;
        bgYellow: StyledFunction;
        bgBlue: StyledFunction;
        bgMagenta: StyledFunction;
        bgCyan: StyledFunction;
        bgWhite: StyledFunction;
        bgBlackBright: StyledFunction;
        bgRedBright: StyledFunction;
        bgGreenBright: StyledFunction;
        bgYellowBright: StyledFunction;
        bgBlueBright: StyledFunction;
        bgMagentaBright: StyledFunction;
        bgCyanBright: StyledFunction;
        bgWhiteBright: StyledFunction;
    }
}
//# sourceMappingURL=core.d.ts.map