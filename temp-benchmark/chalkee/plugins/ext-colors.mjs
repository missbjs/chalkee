import { S as Styler } from "../styler-BcJeFoA3.js";
import { b as registerCodes, c as createStylerProperty, r as register } from "../registry-TWy_tVye.js";
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
registerCodes(customCodes);
Object.defineProperties(Styler.prototype, {
  // Custom foreground colors
  pink: createStylerProperty(customCodes.pink, { createStyler: Styler }),
  orange: createStylerProperty(customCodes.orange, { createStyler: Styler }),
  purple: createStylerProperty(customCodes.purple, { createStyler: Styler }),
  lime: createStylerProperty(customCodes.lime, { createStyler: Styler }),
  coral: createStylerProperty(customCodes.coral, { createStyler: Styler }),
  teal: createStylerProperty(customCodes.teal, { createStyler: Styler }),
  // Custom background colors
  bgPink: createStylerProperty(customCodes.bgPink, { createStyler: Styler }),
  bgOrange: createStylerProperty(customCodes.bgOrange, { createStyler: Styler }),
  bgPurple: createStylerProperty(customCodes.bgPurple, { createStyler: Styler }),
  bgLime: createStylerProperty(customCodes.bgLime, { createStyler: Styler }),
  bgCoral: createStylerProperty(customCodes.bgCoral, { createStyler: Styler }),
  bgTeal: createStylerProperty(customCodes.bgTeal, { createStyler: Styler }),
  // Custom modifiers
  blink: createStylerProperty(customCodes.blink, { createStyler: Styler }),
  overline: createStylerProperty(customCodes.overline, { createStyler: Styler }),
  doubleUnderline: createStylerProperty(customCodes.doubleUnderline, { createStyler: Styler })
});
const customColorsPlugin = {
  name: "customColors"
};
register(customColorsPlugin);
export {
  customColorsPlugin
};
//# sourceMappingURL=ext-colors.mjs.map
