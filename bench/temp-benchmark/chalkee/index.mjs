import { c as createStyler } from "./styler-C521A9y3.js";
import { r as register } from "./registry-B3Mmv60z.js";
import { createBgRgbCode, createRgbCode, hslToRgb, parseHex, validateRgb } from "./plugins/util.mjs";
const crayon = createStyler();
const red = crayon.red;
const green = crayon.green;
const blue = crayon.blue;
const yellow = crayon.yellow;
const magenta = crayon.magenta;
const cyan = crayon.cyan;
const white = crayon.white;
const black = crayon.black;
const gray = crayon.gray;
const grey = crayon.grey;
const redBright = crayon.redBright;
const greenBright = crayon.greenBright;
const blueBright = crayon.blueBright;
const yellowBright = crayon.yellowBright;
const magentaBright = crayon.magentaBright;
const cyanBright = crayon.cyanBright;
const whiteBright = crayon.whiteBright;
const blackBright = crayon.blackBright;
const bgRed = crayon.bgRed;
const bgGreen = crayon.bgGreen;
const bgBlue = crayon.bgBlue;
const bgYellow = crayon.bgYellow;
const bgMagenta = crayon.bgMagenta;
const bgCyan = crayon.bgCyan;
const bgWhite = crayon.bgWhite;
const bgBlack = crayon.bgBlack;
const bgRedBright = crayon.bgRedBright;
const bgGreenBright = crayon.bgGreenBright;
const bgBlueBright = crayon.bgBlueBright;
const bgYellowBright = crayon.bgYellowBright;
const bgMagentaBright = crayon.bgMagentaBright;
const bgCyanBright = crayon.bgCyanBright;
const bgWhiteBright = crayon.bgWhiteBright;
const bgBlackBright = crayon.bgBlackBright;
const bold = crayon.bold;
const dim = crayon.dim;
const italic = crayon.italic;
const underline = crayon.underline;
const inverse = crayon.inverse;
const hidden = crayon.hidden;
const strikethrough = crayon.strikethrough;
const reset = crayon.reset;
const b = crayon.b;
const i = crayon.i;
const u = crayon.u;
const s = crayon.s;
const d = crayon.d;
const r = crayon.r;
const h = crayon.h;
const hex = crayon.hex;
const rgb = crayon.rgb;
const bgHex = crayon.bgHex;
const bgRgb = crayon.bgRgb;
const as = crayon.as;
const bg = crayon.bg;
const registerPluginExternal = (plugin) => {
  if (plugin && typeof plugin === "object" && plugin.name) {
    register(plugin);
  }
};
const createCrayon = (options) => {
  const instance = createStyler();
  if (options == null ? void 0 : options.plugins) {
    options.plugins.forEach((plugin) => {
      if (plugin && typeof plugin === "object" && plugin.name) {
        register(plugin);
      }
    });
  }
  return instance;
};
export {
  as,
  b,
  bg,
  bgBlack,
  bgBlackBright,
  bgBlue,
  bgBlueBright,
  bgCyan,
  bgCyanBright,
  bgGreen,
  bgGreenBright,
  bgHex,
  bgMagenta,
  bgMagentaBright,
  bgRed,
  bgRedBright,
  bgRgb,
  bgWhite,
  bgWhiteBright,
  bgYellow,
  bgYellowBright,
  black,
  blackBright,
  blue,
  blueBright,
  bold,
  createBgRgbCode,
  createCrayon,
  createRgbCode,
  cyan,
  cyanBright,
  d,
  crayon as default,
  dim,
  gray,
  green,
  greenBright,
  grey,
  h,
  hex,
  hidden,
  hslToRgb,
  i,
  inverse,
  italic,
  magenta,
  magentaBright,
  parseHex,
  r,
  red,
  redBright,
  register,
  registerPluginExternal,
  reset,
  rgb,
  s,
  strikethrough,
  u,
  underline,
  validateRgb,
  white,
  whiteBright,
  yellow,
  yellowBright
};
//# sourceMappingURL=index.mjs.map
