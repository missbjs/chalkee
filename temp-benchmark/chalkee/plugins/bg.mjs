import { S as Styler } from "../styler-BcJeFoA3.js";
import { r as register, a as registeredCodes } from "../registry-TWy_tVye.js";
const BG_MODE_MARKER = "\0BG\0";
Object.defineProperties(Styler.prototype, {
  // bg namespace for dynamic background colors
  bg: {
    get() {
      const bgModeCode = { open: BG_MODE_MARKER, close: "" };
      return new Styler([bgModeCode], "");
    },
    enumerable: true,
    configurable: true
  }
});
const bgPlugin = {
  name: "bg",
  handleProperty(_target, prop, codes, accumulatedText, options) {
    if (prop === "bg") {
      if (options == null ? void 0 : options.createStyler) {
        const bgModeCode = { open: BG_MODE_MARKER, close: "" };
        return options.createStyler([...codes, bgModeCode], accumulatedText);
      }
    }
    const bgMode = codes.some((code) => code.open === BG_MODE_MARKER);
    const coreAnsiCodes = registeredCodes;
    if (bgMode && (options == null ? void 0 : options.ansiCodes) && prop in options.ansiCodes && !prop.startsWith("bg")) {
      const isForegroundColor = [
        "black",
        "red",
        "green",
        "yellow",
        "blue",
        "magenta",
        "cyan",
        "white",
        "gray",
        "grey",
        "blackBright",
        "redBright",
        "greenBright",
        "yellowBright",
        "blueBright",
        "magentaBright",
        "cyanBright",
        "whiteBright"
      ].includes(prop);
      if (isForegroundColor) {
        const bgStyleName = "bg" + prop.charAt(0).toUpperCase() + prop.slice(1);
        if (bgStyleName in coreAnsiCodes && options.createStyler) {
          return options.createStyler([...codes, coreAnsiCodes[bgStyleName]], accumulatedText);
        }
      }
    }
    return void 0;
  },
  isMarkerCode(code) {
    return code.open === BG_MODE_MARKER;
  }
};
register(bgPlugin);
Object.assign(bgPlugin, { BG_MODE_CODE_MARKER: BG_MODE_MARKER });
export {
  bgPlugin
};
//# sourceMappingURL=bg.mjs.map
