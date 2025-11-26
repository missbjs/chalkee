import { S as Styler, c as createStyler } from "../styler-BcJeFoA3.js";
import { b as registerCodes, c as createStylerProperty, r as register } from "../registry-TWy_tVye.js";
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
  bgGray: { open: "\x1B[100m", close: "\x1B[49m" },
  bgGrey: { open: "\x1B[100m", close: "\x1B[49m" },
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
Object.defineProperties(Styler.prototype, {
  // Foreground colors
  black: createStylerProperty(coreCodes.black, { createStyler }),
  red: createStylerProperty(coreCodes.red, { createStyler }),
  green: createStylerProperty(coreCodes.green, { createStyler }),
  yellow: createStylerProperty(coreCodes.yellow, { createStyler }),
  blue: createStylerProperty(coreCodes.blue, { createStyler }),
  magenta: createStylerProperty(coreCodes.magenta, { createStyler }),
  cyan: createStylerProperty(coreCodes.cyan, { createStyler }),
  white: createStylerProperty(coreCodes.white, { createStyler }),
  gray: createStylerProperty(coreCodes.gray, { createStyler }),
  grey: createStylerProperty(coreCodes.gray, { createStyler }),
  // Bright foreground colors
  blackBright: createStylerProperty(coreCodes.blackBright, { createStyler }),
  redBright: createStylerProperty(coreCodes.redBright, { createStyler }),
  greenBright: createStylerProperty(coreCodes.greenBright, { createStyler }),
  yellowBright: createStylerProperty(coreCodes.yellowBright, { createStyler }),
  blueBright: createStylerProperty(coreCodes.blueBright, { createStyler }),
  magentaBright: createStylerProperty(coreCodes.magentaBright, { createStyler }),
  cyanBright: createStylerProperty(coreCodes.cyanBright, { createStyler }),
  whiteBright: createStylerProperty(coreCodes.whiteBright, { createStyler }),
  // Background colors
  bgBlack: createStylerProperty(coreCodes.bgBlack, { createStyler }),
  bgRed: createStylerProperty(coreCodes.bgRed, { createStyler }),
  bgGreen: createStylerProperty(coreCodes.bgGreen, { createStyler }),
  bgYellow: createStylerProperty(coreCodes.bgYellow, { createStyler }),
  bgBlue: createStylerProperty(coreCodes.bgBlue, { createStyler }),
  bgMagenta: createStylerProperty(coreCodes.bgMagenta, { createStyler }),
  bgCyan: createStylerProperty(coreCodes.bgCyan, { createStyler }),
  bgWhite: createStylerProperty(coreCodes.bgWhite, { createStyler }),
  bgGray: createStylerProperty(coreCodes.bgGray, { createStyler }),
  bgGrey: createStylerProperty(coreCodes.bgGrey, { createStyler }),
  // Bright background colors
  bgBlackBright: createStylerProperty(coreCodes.bgBlackBright, { createStyler }),
  bgRedBright: createStylerProperty(coreCodes.bgRedBright, { createStyler }),
  bgGreenBright: createStylerProperty(coreCodes.bgGreenBright, { createStyler }),
  bgYellowBright: createStylerProperty(coreCodes.bgYellowBright, { createStyler }),
  bgBlueBright: createStylerProperty(coreCodes.bgBlueBright, { createStyler }),
  bgMagentaBright: createStylerProperty(coreCodes.bgMagentaBright, { createStyler }),
  bgCyanBright: createStylerProperty(coreCodes.bgCyanBright, { createStyler }),
  bgWhiteBright: createStylerProperty(coreCodes.bgWhiteBright, { createStyler })
});
const corePlugin = {
  name: "core",
  /**
   * Handle property access for core color functionality
   */
  handleProperty(_target, prop, codes, accumulatedText, options) {
    if (options == null ? void 0 : options.createStyler) {
      if (codes.length === 0 && accumulatedText === "") {
        switch (prop) {
          case "red":
            return options.createStyler([coreCodes.red], "");
          case "green":
            return options.createStyler([coreCodes.green], "");
          case "blue":
            return options.createStyler([coreCodes.blue], "");
          case "yellow":
            return options.createStyler([coreCodes.yellow], "");
          case "magenta":
            return options.createStyler([coreCodes.magenta], "");
          case "cyan":
            return options.createStyler([coreCodes.cyan], "");
          case "white":
            return options.createStyler([coreCodes.white], "");
          case "black":
            return options.createStyler([coreCodes.black], "");
          case "gray":
          case "grey":
            return options.createStyler([coreCodes.gray], "");
          default:
            if (coreCodes.hasOwnProperty(prop)) {
              return options.createStyler([coreCodes[prop]], "");
            }
        }
      } else {
        switch (prop) {
          case "red":
            return options.createStyler([...codes, coreCodes.red], accumulatedText);
          case "green":
            return options.createStyler([...codes, coreCodes.green], accumulatedText);
          case "blue":
            return options.createStyler([...codes, coreCodes.blue], accumulatedText);
          case "yellow":
            return options.createStyler([...codes, coreCodes.yellow], accumulatedText);
          case "magenta":
            return options.createStyler([...codes, coreCodes.magenta], accumulatedText);
          case "cyan":
            return options.createStyler([...codes, coreCodes.cyan], accumulatedText);
          case "white":
            return options.createStyler([...codes, coreCodes.white], accumulatedText);
          case "black":
            return options.createStyler([...codes, coreCodes.black], accumulatedText);
          case "gray":
          case "grey":
            return options.createStyler([...codes, coreCodes.gray], accumulatedText);
          default:
            if (coreCodes.hasOwnProperty(prop)) {
              return options.createStyler([...codes, coreCodes[prop]], accumulatedText);
            }
        }
      }
    }
    return void 0;
  }
};
register(corePlugin);
export {
  corePlugin
};
//# sourceMappingURL=core.mjs.map
