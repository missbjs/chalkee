import { b as registerCodes, r as register } from "../registry-B3Mmv60z.js";
const coreCodes = {
  // Foreground colors
  black: { open: "\x1B[30m", close: "\x1B[39m" },
  red: { open: "\x1B[31m", close: "\x1B[39m" },
  green: { open: "\x1B[32m", close: "\x1B[39m" },
  yellow: { open: "\x1B[33m", close: "\x1B[39m" },
  blue: { open: "\x1B[34m", close: "\x1B[39m" },
  magenta: { open: "\x1B[35m", close: "\x1B[39m" },
  cyan: { open: "\x1B[36m", close: "\x1B[39m" },
  white: { open: "\x1B[37m", close: "\x1B[39m" },
  gray: { open: "\x1B[90m", close: "\x1B[39m" },
  grey: { open: "\x1B[90m", close: "\x1B[39m" },
  // Bright foreground colors
  blackBright: { open: "\x1B[90m", close: "\x1B[39m" },
  redBright: { open: "\x1B[91m", close: "\x1B[39m" },
  greenBright: { open: "\x1B[92m", close: "\x1B[39m" },
  yellowBright: { open: "\x1B[93m", close: "\x1B[39m" },
  blueBright: { open: "\x1B[94m", close: "\x1B[39m" },
  magentaBright: { open: "\x1B[95m", close: "\x1B[39m" },
  cyanBright: { open: "\x1B[96m", close: "\x1B[39m" },
  whiteBright: { open: "\x1B[97m", close: "\x1B[39m" },
  // Background colors
  bgBlack: { open: "\x1B[40m", close: "\x1B[49m" },
  bgRed: { open: "\x1B[41m", close: "\x1B[49m" },
  bgGreen: { open: "\x1B[42m", close: "\x1B[49m" },
  bgYellow: { open: "\x1B[43m", close: "\x1B[49m" },
  bgBlue: { open: "\x1B[44m", close: "\x1B[49m" },
  bgMagenta: { open: "\x1B[45m", close: "\x1B[49m" },
  bgCyan: { open: "\x1B[46m", close: "\x1B[49m" },
  bgWhite: { open: "\x1B[47m", close: "\x1B[49m" },
  // Bright background colors
  bgBlackBright: { open: "\x1B[100m", close: "\x1B[49m" },
  bgRedBright: { open: "\x1B[101m", close: "\x1B[49m" },
  bgGreenBright: { open: "\x1B[102m", close: "\x1B[49m" },
  bgYellowBright: { open: "\x1B[103m", close: "\x1B[49m" },
  bgBlueBright: { open: "\x1B[104m", close: "\x1B[49m" },
  bgMagentaBright: { open: "\x1B[105m", close: "\x1B[49m" },
  bgCyanBright: { open: "\x1B[106m", close: "\x1B[49m" },
  bgWhiteBright: { open: "\x1B[107m", close: "\x1B[49m" }
};
registerCodes(coreCodes);
const corePlugin = {
  name: "core"
  // Core plugin doesn't need special handling methods for better performance
};
register(corePlugin);
export {
  corePlugin
};
//# sourceMappingURL=core.mjs.map
