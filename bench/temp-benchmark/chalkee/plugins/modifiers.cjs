"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const registry = require("../registry-CaklLkpo.cjs");
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
const modifiersPlugin = {
  name: "modifiers",
  /**
   * Handle property access for modifier functionality and shorthand aliases
   */
  handleProperty(_target, prop, codes, accumulatedText, options) {
    if (prop === "r" || prop === "b" || prop === "i" || prop === "u" || prop === "s" || prop === "d") {
      if (options == null ? void 0 : options.createStyler) {
        if (prop === "r") {
          const resetCodes = handleReset(codes, modifierCodes.reset);
          return options.createStyler(resetCodes, accumulatedText);
        }
        if (prop === "b" && modifierCodes.bold) {
          return options.createStyler([...codes, modifierCodes.bold], accumulatedText);
        }
        if (prop === "i" && modifierCodes.italic) {
          return options.createStyler([...codes, modifierCodes.italic], accumulatedText);
        }
        if (prop === "u" && modifierCodes.underline) {
          return options.createStyler([...codes, modifierCodes.underline], accumulatedText);
        }
        if (prop === "s" && modifierCodes.strikethrough) {
          return options.createStyler([...codes, modifierCodes.strikethrough], accumulatedText);
        }
        if (prop === "d" && modifierCodes.dim) {
          return options.createStyler([...codes, modifierCodes.dim], accumulatedText);
        }
      }
    }
    return void 0;
  }
};
registry.register(modifiersPlugin);
exports.modifiersPlugin = modifiersPlugin;
//# sourceMappingURL=modifiers.cjs.map
