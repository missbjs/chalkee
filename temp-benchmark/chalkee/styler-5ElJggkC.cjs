"use strict";
const registry = require("./registry-BrBjFUNx.cjs");
function isColorSupported() {
  if (process.env.NO_COLOR) {
    return false;
  }
  if (process.env.CI && !process.env.COLORTERM) {
    return false;
  }
  if (process.env.FORCE_COLOR) {
    return true;
  }
  if (typeof process !== "undefined" && process.stdout && !process.stdout.isTTY) {
    return false;
  }
  return true;
}
const proxyCache = /* @__PURE__ */ new Map();
function generateCacheKey(codes, accumulatedText) {
  if (codes.length === 0) {
    return `text:${accumulatedText}`;
  }
  const codesKey = codes.map((c) => `${c.open}|${c.close}`).join(",");
  return `${codesKey}|${accumulatedText}`;
}
function applyStyle(text, codes) {
  if (!isColorSupported() || codes.length === 0) {
    return text;
  }
  const openCodes = codes.map((c) => c.open).join("");
  const closeCodes = codes.map((c) => c.close).reverse().join("");
  return `${openCodes}${text}${closeCodes}`;
}
class Styler {
  // private inspectCustom = Symbol.for('nodejs.util.inspect.custom')
  constructor(codes = [], accumulatedText = "") {
    this.codes = codes;
    this.accumulatedText = accumulatedText;
    this.initializeSymbolProperties();
  }
  /**
   * Initialize symbol properties for proper string conversion
   */
  initializeSymbolProperties() {
    this[Symbol.toPrimitive] = (hint) => {
      if (hint === "string" || hint === "default") {
        return this.accumulatedText;
      }
      return this.accumulatedText;
    };
    this[Symbol.toStringTag] = "Crayon";
    this[Symbol.for("nodejs.util.inspect.custom")] = () => {
      return this.accumulatedText;
    };
  }
  /**
   * Convert to string representation
   */
  toString() {
    return this.accumulatedText;
  }
  /**
   * Convert to primitive value
   */
  valueOf() {
    return this.accumulatedText;
  }
  /**
   * Convert to primitive value for string conversion
   */
  [Symbol.toPrimitive](hint) {
    if (hint === "string" || hint === "default") {
      return this.accumulatedText;
    }
    return this.accumulatedText;
  }
  /**
   * Main method that handles both regular calls and template literals
   */
  call(...args) {
    if (Array.isArray(args[0]) && "raw" in args[0]) {
      const strings = args[0];
      const values = args.slice(1);
      const text2 = strings.reduce(
        (result, str, i) => result + str + (values[i] !== void 0 ? String(values[i]) : ""),
        ""
      );
      const pluginResult2 = registry.processText(this.codes, text2, this.accumulatedText);
      let styledText2 = "";
      if (pluginResult2) {
        styledText2 = pluginResult2.styledText;
      } else {
        styledText2 = applyStyle(text2, registry.filterMarkerCodes(this.codes));
      }
      return createStyler(this.codes, this.accumulatedText + styledText2);
    }
    const text = String(args[0] ?? "");
    const pluginResult = registry.processText(this.codes, text, this.accumulatedText);
    let styledText = "";
    if (pluginResult) {
      styledText = pluginResult.styledText;
    } else {
      styledText = applyStyle(text, registry.filterMarkerCodes(this.codes));
    }
    return createStyler(this.codes, this.accumulatedText + styledText);
  }
}
function createStyler(codes = [], accumulatedText = "") {
  const cacheKey = generateCacheKey(codes, accumulatedText);
  if (proxyCache.has(cacheKey)) {
    return proxyCache.get(cacheKey);
  }
  const stylerFunction = function(...args) {
    if (Array.isArray(args[0]) && "raw" in args[0]) {
      const strings = args[0];
      const values = args.slice(1);
      const text2 = strings.reduce(
        (result, str, i) => result + str + (values[i] !== void 0 ? String(values[i]) : ""),
        ""
      );
      const pluginResult2 = registry.processText(codes, text2, accumulatedText);
      let styledText2 = "";
      if (pluginResult2) {
        styledText2 = pluginResult2.styledText;
      } else {
        styledText2 = applyStyle(text2, registry.filterMarkerCodes(codes));
      }
      return createStyler(codes, accumulatedText + styledText2);
    }
    const text = String(args[0] ?? "");
    const pluginResult = registry.processText(codes, text, accumulatedText);
    let styledText = "";
    if (pluginResult) {
      styledText = pluginResult.styledText;
    } else {
      styledText = applyStyle(text, registry.filterMarkerCodes(codes));
    }
    return createStyler(codes, accumulatedText + styledText);
  };
  Object.defineProperty(stylerFunction, Symbol.toStringTag, {
    value: "Crayon",
    enumerable: false
  });
  const proxy = new Proxy(stylerFunction, {
    get: (target, prop) => {
      if (typeof prop === "symbol") {
        return target[prop];
      }
      if (prop === "toString" || prop === "valueOf") {
        return () => accumulatedText;
      }
      if (typeof prop === "symbol" && prop === Symbol.toPrimitive) {
        return (hint) => {
          if (hint === "string" || hint === "default") {
            return accumulatedText;
          }
          return accumulatedText;
        };
      }
      const inspectCustom2 = Symbol.for("nodejs.util.inspect.custom");
      if (typeof prop === "symbol" && prop === inspectCustom2) {
        return () => accumulatedText;
      }
      const pluginOptions = {
        createStyler,
        ansiCodes: registry.registeredCodes
      };
      const pluginResult = registry.handleProperty(
        target,
        prop,
        codes,
        accumulatedText,
        pluginOptions
      );
      if (pluginResult !== void 0) {
        return pluginResult;
      }
      if (prop in registry.registeredCodes) {
        return createStyler([...codes, registry.registeredCodes[prop]], accumulatedText);
      }
      return void 0;
    }
  });
  const inspectCustom = Symbol.for("nodejs.util.inspect.custom");
  Object.defineProperty(proxy, inspectCustom, {
    value: () => accumulatedText,
    enumerable: false,
    writable: true,
    configurable: true
  });
  proxyCache.set(cacheKey, proxy);
  return proxy;
}
exports.Styler = Styler;
exports.createStyler = createStyler;
//# sourceMappingURL=styler-5ElJggkC.cjs.map
