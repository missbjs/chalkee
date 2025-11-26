"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const styler = require("../styler-5ElJggkC.cjs");
const registry = require("../registry-BrBjFUNx.cjs");
function handleReset(codes, resetCode) {
  let hasIsMarkerCode = false;
  for (let i = 0; i < registry.plugins.length; i++) {
    if (registry.plugins[i].isMarkerCode) {
      hasIsMarkerCode = true;
      break;
    }
  }
  if (!hasIsMarkerCode) {
    return [...codes, resetCode];
  }
  const codesWithoutModes = [];
  for (let i = 0; i < codes.length; i++) {
    const code = codes[i];
    let isMarker = false;
    for (let j = 0; j < registry.plugins.length; j++) {
      const plugin = registry.plugins[j];
      if (plugin.isMarkerCode && plugin.isMarkerCode(code)) {
        isMarker = true;
        break;
      }
    }
    if (!isMarker) {
      codesWithoutModes.push(code);
    }
  }
  return [...codesWithoutModes, resetCode];
}
const modifierCodes = {
  // Modifiers
  reset: { open: "\x1B[0m", close: "\x1B[0m" },
  bold: { open: "\x1B[1m", close: "\x1B[22m" },
  dim: { open: "\x1B[2m", close: "\x1B[22m" },
  italic: { open: "\x1B[3m", close: "\x1B[23m" },
  underline: { open: "\x1B[4m", close: "\x1B[24m" },
  inverse: { open: "\x1B[7m", close: "\x1B[27m" },
  hidden: { open: "\x1B[8m", close: "\x1B[28m" },
  strikethrough: { open: "\x1B[9m", close: "\x1B[29m" }
};
registry.registerCodes(modifierCodes);
const propertyCodeMap = {
  // Standard modifiers
  "bold": modifierCodes.bold,
  "dim": modifierCodes.dim,
  "italic": modifierCodes.italic,
  "underline": modifierCodes.underline,
  "inverse": modifierCodes.inverse,
  "hidden": modifierCodes.hidden,
  "strikethrough": modifierCodes.strikethrough,
  "reset": modifierCodes.reset,
  // Shorthand aliases
  "b": modifierCodes.bold,
  "d": modifierCodes.dim,
  "i": modifierCodes.italic,
  "u": modifierCodes.underline,
  "s": modifierCodes.strikethrough,
  "r": modifierCodes.reset
};
Object.defineProperties(styler.Styler.prototype, {
  // Modifiers
  reset: registry.createStylerProperty(modifierCodes.reset, { createStyler: styler.createStyler }),
  bold: registry.createStylerProperty(modifierCodes.bold, { createStyler: styler.createStyler }),
  dim: registry.createStylerProperty(modifierCodes.dim, { createStyler: styler.createStyler }),
  italic: registry.createStylerProperty(modifierCodes.italic, { createStyler: styler.createStyler }),
  underline: registry.createStylerProperty(modifierCodes.underline, { createStyler: styler.createStyler }),
  inverse: registry.createStylerProperty(modifierCodes.inverse, { createStyler: styler.createStyler }),
  hidden: registry.createStylerProperty(modifierCodes.hidden, { createStyler: styler.createStyler }),
  strikethrough: registry.createStylerProperty(modifierCodes.strikethrough, { createStyler: styler.createStyler }),
  // Shorthand aliases
  r: registry.createStylerProperty(modifierCodes.reset, { createStyler: styler.createStyler }),
  b: registry.createStylerProperty(modifierCodes.bold, { createStyler: styler.createStyler }),
  i: registry.createStylerProperty(modifierCodes.italic, { createStyler: styler.createStyler }),
  u: registry.createStylerProperty(modifierCodes.underline, { createStyler: styler.createStyler }),
  s: registry.createStylerProperty(modifierCodes.strikethrough, { createStyler: styler.createStyler }),
  d: registry.createStylerProperty(modifierCodes.dim, { createStyler: styler.createStyler })
});
const modifiersPlugin = {
  name: "modifiers",
  /**
   * Handle property access for modifier functionality and shorthand aliases
   */
  handleProperty(_target, prop, codes, accumulatedText, options) {
    if ((options == null ? void 0 : options.createStyler) && options.ansiCodes) {
      const modifierCode = propertyCodeMap[prop];
      if (codes.length === 0 && accumulatedText === "" && modifierCode) {
        return options.createStyler([modifierCode], "");
      }
      switch (prop) {
        case "r":
        case "reset":
          const resetCodes = handleReset(codes, modifierCodes.reset);
          return options.createStyler(resetCodes, accumulatedText);
        case "b":
        case "bold":
          if (modifierCodes.bold) {
            return options.createStyler([...codes, modifierCodes.bold], accumulatedText);
          }
          break;
        case "i":
        case "italic":
          if (modifierCodes.italic) {
            return options.createStyler([...codes, modifierCodes.italic], accumulatedText);
          }
          break;
        case "u":
        case "underline":
          if (modifierCodes.underline) {
            return options.createStyler([...codes, modifierCodes.underline], accumulatedText);
          }
          break;
        case "s":
        case "strikethrough":
          if (modifierCodes.strikethrough) {
            return options.createStyler([...codes, modifierCodes.strikethrough], accumulatedText);
          }
          break;
        case "d":
        case "dim":
          if (modifierCodes.dim) {
            return options.createStyler([...codes, modifierCodes.dim], accumulatedText);
          }
          break;
        default:
          if (modifierCode) {
            return options.createStyler([...codes, modifierCode], accumulatedText);
          }
      }
    }
    return void 0;
  }
};
registry.register(modifiersPlugin);
exports.modifiersPlugin = modifiersPlugin;
//# sourceMappingURL=modifiers.cjs.map
