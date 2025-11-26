"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const styler = require("../styler-5ElJggkC.cjs");
const registry = require("../registry-BrBjFUNx.cjs");
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
registry.registerCodes(coreCodes);
Object.defineProperties(styler.Styler.prototype, {
  // Foreground colors
  black: registry.createStylerProperty(coreCodes.black, { createStyler: styler.createStyler }),
  red: registry.createStylerProperty(coreCodes.red, { createStyler: styler.createStyler }),
  green: registry.createStylerProperty(coreCodes.green, { createStyler: styler.createStyler }),
  yellow: registry.createStylerProperty(coreCodes.yellow, { createStyler: styler.createStyler }),
  blue: registry.createStylerProperty(coreCodes.blue, { createStyler: styler.createStyler }),
  magenta: registry.createStylerProperty(coreCodes.magenta, { createStyler: styler.createStyler }),
  cyan: registry.createStylerProperty(coreCodes.cyan, { createStyler: styler.createStyler }),
  white: registry.createStylerProperty(coreCodes.white, { createStyler: styler.createStyler }),
  gray: registry.createStylerProperty(coreCodes.gray, { createStyler: styler.createStyler }),
  grey: registry.createStylerProperty(coreCodes.gray, { createStyler: styler.createStyler }),
  // Bright foreground colors
  blackBright: registry.createStylerProperty(coreCodes.blackBright, { createStyler: styler.createStyler }),
  redBright: registry.createStylerProperty(coreCodes.redBright, { createStyler: styler.createStyler }),
  greenBright: registry.createStylerProperty(coreCodes.greenBright, { createStyler: styler.createStyler }),
  yellowBright: registry.createStylerProperty(coreCodes.yellowBright, { createStyler: styler.createStyler }),
  blueBright: registry.createStylerProperty(coreCodes.blueBright, { createStyler: styler.createStyler }),
  magentaBright: registry.createStylerProperty(coreCodes.magentaBright, { createStyler: styler.createStyler }),
  cyanBright: registry.createStylerProperty(coreCodes.cyanBright, { createStyler: styler.createStyler }),
  whiteBright: registry.createStylerProperty(coreCodes.whiteBright, { createStyler: styler.createStyler }),
  // Background colors
  bgBlack: registry.createStylerProperty(coreCodes.bgBlack, { createStyler: styler.createStyler }),
  bgRed: registry.createStylerProperty(coreCodes.bgRed, { createStyler: styler.createStyler }),
  bgGreen: registry.createStylerProperty(coreCodes.bgGreen, { createStyler: styler.createStyler }),
  bgYellow: registry.createStylerProperty(coreCodes.bgYellow, { createStyler: styler.createStyler }),
  bgBlue: registry.createStylerProperty(coreCodes.bgBlue, { createStyler: styler.createStyler }),
  bgMagenta: registry.createStylerProperty(coreCodes.bgMagenta, { createStyler: styler.createStyler }),
  bgCyan: registry.createStylerProperty(coreCodes.bgCyan, { createStyler: styler.createStyler }),
  bgWhite: registry.createStylerProperty(coreCodes.bgWhite, { createStyler: styler.createStyler }),
  bgGray: registry.createStylerProperty(coreCodes.bgGray, { createStyler: styler.createStyler }),
  bgGrey: registry.createStylerProperty(coreCodes.bgGrey, { createStyler: styler.createStyler }),
  // Bright background colors
  bgBlackBright: registry.createStylerProperty(coreCodes.bgBlackBright, { createStyler: styler.createStyler }),
  bgRedBright: registry.createStylerProperty(coreCodes.bgRedBright, { createStyler: styler.createStyler }),
  bgGreenBright: registry.createStylerProperty(coreCodes.bgGreenBright, { createStyler: styler.createStyler }),
  bgYellowBright: registry.createStylerProperty(coreCodes.bgYellowBright, { createStyler: styler.createStyler }),
  bgBlueBright: registry.createStylerProperty(coreCodes.bgBlueBright, { createStyler: styler.createStyler }),
  bgMagentaBright: registry.createStylerProperty(coreCodes.bgMagentaBright, { createStyler: styler.createStyler }),
  bgCyanBright: registry.createStylerProperty(coreCodes.bgCyanBright, { createStyler: styler.createStyler }),
  bgWhiteBright: registry.createStylerProperty(coreCodes.bgWhiteBright, { createStyler: styler.createStyler })
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
registry.register(corePlugin);
exports.corePlugin = corePlugin;
//# sourceMappingURL=core.cjs.map
