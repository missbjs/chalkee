/**
 * Chalkee - Advanced terminal styling with plugin architecture, tree-shaking, and template literal chaining
 */

import { Chalkee, StyleChainState } from './types';
import { createStyleState, createReset } from './plugins/styler';
import { createStyledFunction } from './plugins/template-handler';
import { 
    ANSI_COLORS, 
    ANSI_MODIFIERS, 
    parseHex, 
    rgbToAnsi256 
} from './plugins/registry';

// Create the initial chalkee instance
const chalkee: Chalkee = createStyledFunction('', createStyleState()) as Chalkee;

// Export the default chalkee instance
export default chalkee;

// Export individual color methods
export const red = chalkee.red;
export const green = chalkee.green;
export const blue = chalkee.blue;
export const yellow = chalkee.yellow;
export const magenta = chalkee.magenta;
export const cyan = chalkee.cyan;
export const white = chalkee.white;
export const black = chalkee.black;
export const gray = chalkee.gray;
export const grey = chalkee.grey;
export const redBright = chalkee.redBright;
export const greenBright = chalkee.greenBright;
export const blueBright = chalkee.blueBright;
export const yellowBright = chalkee.yellowBright;
export const magentaBright = chalkee.magentaBright;
export const cyanBright = chalkee.cyanBright;
export const whiteBright = chalkee.whiteBright;
export const blackBright = chalkee.blackBright;

// Export background color methods
export const bgRed = chalkee.bgRed;
export const bgGreen = chalkee.bgGreen;
export const bgBlue = chalkee.bgBlue;
export const bgYellow = chalkee.bgYellow;
export const bgMagenta = chalkee.bgMagenta;
export const bgCyan = chalkee.bgCyan;
export const bgWhite = chalkee.bgWhite;
export const bgBlack = chalkee.bgBlack;
export const bgRedBright = chalkee.bgRedBright;
export const bgGreenBright = chalkee.bgGreenBright;
export const bgBlueBright = chalkee.bgBlueBright;
export const bgYellowBright = chalkee.bgYellowBright;
export const bgMagentaBright = chalkee.bgMagentaBright;
export const bgCyanBright = chalkee.bgCyanBright;
export const bgWhiteBright = chalkee.bgWhiteBright;
export const bgBlackBright = chalkee.bgBlackBright;

// Export modifier methods
export const bold = chalkee.bold;
export const dim = chalkee.dim;
export const italic = chalkee.italic;
export const underline = chalkee.underline;
export const strikethrough = chalkee.strikethrough;
export const inverse = chalkee.inverse;
export const hidden = chalkee.hidden;
export const reset = chalkee.reset;

// Export shorthand aliases
export const b = chalkee.b; // bold
export const d = chalkee.d; // dim
export const i = chalkee.i; // italic
export const u = chalkee.u; // underline
export const s = chalkee.s; // strikethrough
export const r = chalkee.r; // reset

// Export special methods
export const as = chalkee.as; // auto-spacing

// Export hex and RGB methods
export const hex = chalkee.hex;
export const rgb = chalkee.rgb;
export const bgHex = chalkee.bgHex;
export const bgRgb = chalkee.bgRgb;

// Export utility functions
export { parseHex, rgbToAnsi256 };

// Export types
export type { Chalkee, StyleChainState } from './types';