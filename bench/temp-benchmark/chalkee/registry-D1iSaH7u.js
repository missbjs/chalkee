let plugins = [];
let registeredCodes = {};
function registerCodes(newCodes) {
  Object.assign(registeredCodes, newCodes);
}
function register(plugin) {
  plugins.push(plugin);
}
function handleProperty(target, prop, codes, accumulatedText, options) {
  for (const plugin of plugins) {
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
  return codes.filter((code) => {
    for (const plugin of plugins) {
      if (plugin.isMarkerCode && plugin.isMarkerCode(code)) {
        return false;
      }
    }
    return true;
  });
}
function processText(codes, text, accumulatedText) {
  for (const plugin of plugins) {
    if (plugin.processText) {
      const result = plugin.processText(codes, text, accumulatedText, filterMarkerCodes);
      if (result !== void 0) {
        return result;
      }
    }
  }
  return void 0;
}
export {
  registeredCodes as a,
  registerCodes as b,
  processText as c,
  filterMarkerCodes as f,
  handleProperty as h,
  plugins as p,
  register as r
};
//# sourceMappingURL=registry-D1iSaH7u.js.map
