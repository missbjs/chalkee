"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const styler = require("../styler-5ElJggkC.cjs");
const registry = require("../registry-BrBjFUNx.cjs");
const customCodes = {
  // Custom foreground colors
  pink: { open: "\x1B[38;5;201m", close: "\x1B[39m" },
  orange: { open: "\x1B[38;5;208m", close: "\x1B[39m" },
  purple: { open: "\x1B[38;5;129m", close: "\x1B[39m" },
  lime: { open: "\x1B[38;5;118m", close: "\x1B[39m" },
  coral: { open: "\x1B[38;5;204m", close: "\x1B[39m" },
  teal: { open: "\x1B[38;5;37m", close: "\x1B[39m" },
  // Custom background colors
  bgPink: { open: "\x1B[48;5;201m", close: "\x1B[49m" },
  bgOrange: { open: "\x1B[48;5;208m", close: "\x1B[49m" },
  bgPurple: { open: "\x1B[48;5;129m", close: "\x1B[49m" },
  bgLime: { open: "\x1B[48;5;118m", close: "\x1B[49m" },
  bgCoral: { open: "\x1B[48;5;204m", close: "\x1B[49m" },
  bgTeal: { open: "\x1B[48;5;37m", close: "\x1B[49m" },
  // Custom modifiers
  blink: { open: "\x1B[5m", close: "\x1B[25m" },
  overline: { open: "\x1B[53m", close: "\x1B[55m" },
  doubleUnderline: { open: "\x1B[21m", close: "\x1B[24m" }
};
registry.registerCodes(customCodes);
Object.defineProperties(styler.Styler.prototype, {
  // Custom foreground colors
  pink: registry.createStylerProperty(customCodes.pink, { createStyler: styler.Styler }),
  orange: registry.createStylerProperty(customCodes.orange, { createStyler: styler.Styler }),
  purple: registry.createStylerProperty(customCodes.purple, { createStyler: styler.Styler }),
  lime: registry.createStylerProperty(customCodes.lime, { createStyler: styler.Styler }),
  coral: registry.createStylerProperty(customCodes.coral, { createStyler: styler.Styler }),
  teal: registry.createStylerProperty(customCodes.teal, { createStyler: styler.Styler }),
  // Custom background colors
  bgPink: registry.createStylerProperty(customCodes.bgPink, { createStyler: styler.Styler }),
  bgOrange: registry.createStylerProperty(customCodes.bgOrange, { createStyler: styler.Styler }),
  bgPurple: registry.createStylerProperty(customCodes.bgPurple, { createStyler: styler.Styler }),
  bgLime: registry.createStylerProperty(customCodes.bgLime, { createStyler: styler.Styler }),
  bgCoral: registry.createStylerProperty(customCodes.bgCoral, { createStyler: styler.Styler }),
  bgTeal: registry.createStylerProperty(customCodes.bgTeal, { createStyler: styler.Styler }),
  // Custom modifiers
  blink: registry.createStylerProperty(customCodes.blink, { createStyler: styler.Styler }),
  overline: registry.createStylerProperty(customCodes.overline, { createStyler: styler.Styler }),
  doubleUnderline: registry.createStylerProperty(customCodes.doubleUnderline, { createStyler: styler.Styler })
});
const customColorsPlugin = {
  name: "customColors"
};
registry.register(customColorsPlugin);
exports.customColorsPlugin = customColorsPlugin;
//# sourceMappingURL=ext-colors.cjs.map
