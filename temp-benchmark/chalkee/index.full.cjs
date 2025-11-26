"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
require("./plugins/bg.cjs");
require("./plugins/space.cjs");
require("./plugins/core.cjs");
require("./plugins/ext-colors.cjs");
const plugins_util = require("./plugins/util.cjs");
require("./plugins/modifiers.cjs");
require("./plugins/emoji.cjs");
const index = require("./index.cjs");
const registry = require("./registry-BrBjFUNx.cjs");
exports.createRgbCode = plugins_util.createRgbCode;
exports.hslToRgb = plugins_util.hslToRgb;
exports.createCrayon = index.createCrayon;
exports.default = index.default;
exports.registerPluginExternal = index.registerPluginExternal;
exports.register = registry.register;
exports.registeredCodes = registry.registeredCodes;
//# sourceMappingURL=index.full.cjs.map
