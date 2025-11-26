"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
require("./plugins/bg.cjs");
require("./plugins/space.cjs");
require("./plugins/core.cjs");
require("./plugins/ext-colors.cjs");
const plugins_util = require("./plugins/util.cjs");
require("./plugins/modifiers.cjs");
require("./plugins/emoji.cjs");
const styler = require("./styler-5ElJggkC.cjs");
const registry = require("./registry-BrBjFUNx.cjs");
const crayon = styler.createStyler();
const registerPluginExternal = (plugin) => {
  if (plugin && typeof plugin === "object" && plugin.name) {
    registry.register(plugin);
  }
};
const createCrayon = (options) => {
  const instance = styler.createStyler();
  if (options == null ? void 0 : options.plugins) {
    options.plugins.forEach((plugin) => {
      if (plugin && typeof plugin === "object" && plugin.name) {
        registry.register(plugin);
      }
    });
  }
  return instance;
};
exports.createRgbCode = plugins_util.createRgbCode;
exports.hslToRgb = plugins_util.hslToRgb;
exports.register = registry.register;
exports.registeredCodes = registry.registeredCodes;
exports.createCrayon = createCrayon;
exports.default = crayon;
exports.registerPluginExternal = registerPluginExternal;
//# sourceMappingURL=index.cjs.map
