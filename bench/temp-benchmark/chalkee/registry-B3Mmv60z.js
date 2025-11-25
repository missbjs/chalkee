let plugins = [];
let registeredCodes = {};
function registerCodes(newCodes) {
  Object.assign(registeredCodes, newCodes);
}
function register(plugin) {
  plugins.push(plugin);
}
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
export {
  registeredCodes as a,
  registerCodes as b,
  processText as c,
  filterMarkerCodes as f,
  handleProperty as h,
  plugins as p,
  register as r
};
//# sourceMappingURL=registry-B3Mmv60z.js.map
