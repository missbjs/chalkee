import "./plugins/bg.mjs";
import "./plugins/space.mjs";
import "./plugins/core.mjs";
import "./plugins/ext-colors.mjs";
import { createRgbCode, hslToRgb } from "./plugins/util.mjs";
import "./plugins/modifiers.mjs";
import "./plugins/emoji.mjs";
import { c as createStyler } from "./styler-BcJeFoA3.js";
import { r as register } from "./registry-TWy_tVye.js";
import { a } from "./registry-TWy_tVye.js";
const crayon = createStyler();
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
  createCrayon,
  createRgbCode,
  crayon as default,
  hslToRgb,
  register,
  registerPluginExternal,
  a as registeredCodes
};
//# sourceMappingURL=index.mjs.map
