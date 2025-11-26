"use strict";
let plugins = [];
if (typeof globalThis !== "undefined") {
  globalThis.__CRAYON_PLUGINS__ = plugins;
}
let registeredCodes = {};
function registerCodes(newCodes) {
  Object.assign(registeredCodes, newCodes);
}
function register(plugin) {
  plugins.push(plugin);
  if (typeof globalThis !== "undefined") {
    globalThis.__CRAYON_PLUGINS__ = plugins;
  }
}
const createStylerProperty = (ansiCode, options) => ({
  get() {
    return options.createStyler([ansiCode], "");
  },
  enumerable: true,
  configurable: true
});
function handleProperty(target, prop, codes, accumulatedText, options) {
  if (plugins.length === 0) {
    return void 0;
  }
  let hasHandleProperty = false;
  for (let i = 0; i < plugins.length; i++) {
    if (plugins[i].handleProperty) {
      hasHandleProperty = true;
      break;
    }
  }
  if (!hasHandleProperty) {
    return void 0;
  }
  for (let i = 0; i < plugins.length; i++) {
    const plugin = plugins[i];
    if (plugin.handleProperty) {
      const result = plugin.handleProperty(target, prop, codes, accumulatedText, options);
      if (result !== void 0) {
        return result;
      }
    }
  }
  return void 0;
}
function filterMarkerCodes(codes) {
  if (codes.length === 0 || plugins.length === 0) {
    return codes;
  }
  let hasIsMarkerCode = false;
  for (let i = 0; i < plugins.length; i++) {
    if (plugins[i].isMarkerCode) {
      hasIsMarkerCode = true;
      break;
    }
  }
  if (!hasIsMarkerCode) {
    return codes;
  }
  const result = [];
  for (let i = 0; i < codes.length; i++) {
    const code = codes[i];
    let isMarker = false;
    for (let j = 0; j < plugins.length; j++) {
      const plugin = plugins[j];
      if (plugin.isMarkerCode && plugin.isMarkerCode(code)) {
        isMarker = true;
        break;
      }
    }
    if (!isMarker) {
      result.push(code);
    }
  }
  return result;
}
function processText(codes, text, accumulatedText) {
  if (plugins.length === 0) {
    return void 0;
  }
  let hasProcessText = false;
  for (let i = 0; i < plugins.length; i++) {
    if (plugins[i].processText) {
      hasProcessText = true;
      break;
    }
  }
  if (!hasProcessText) {
    return void 0;
  }
  for (let i = 0; i < plugins.length; i++) {
    const plugin = plugins[i];
    if (plugin.processText) {
      const result = plugin.processText(codes, text, accumulatedText, filterMarkerCodes);
      if (result !== void 0) {
        return result;
      }
    }
  }
  return void 0;
}
exports.createStylerProperty = createStylerProperty;
exports.filterMarkerCodes = filterMarkerCodes;
exports.handleProperty = handleProperty;
exports.plugins = plugins;
exports.processText = processText;
exports.register = register;
exports.registerCodes = registerCodes;
exports.registeredCodes = registeredCodes;
//# sourceMappingURL=registry-BrBjFUNx.cjs.map
