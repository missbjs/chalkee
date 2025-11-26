"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const styler = require("../styler-5ElJggkC.cjs");
const registry = require("../registry-BrBjFUNx.cjs");
function createRgbCode(r, g, b) {
  return {
    open: `\x1B[38;2;${r};${g};${b}m`,
    close: "\x1B[39m"
  };
}
function createBgRgbCode(r, g, b) {
  return {
    open: `\x1B[48;2;${r};${g};${b}m`,
    close: "\x1B[49m"
  };
}
function parseHex(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map((char) => char + char).join("");
  }
  if (hex.length !== 6) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return [r, g, b];
}
function validateRgb(r, g, b) {
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    throw new Error(`RGB values must be between 0 and 255. Got: ${r}, ${g}, ${b}`);
  }
}
function hslToRgb(h, s, l) {
  h = h % 360;
  if (h < 0) h += 360;
  s = Math.max(0, Math.min(100, s));
  l = Math.max(0, Math.min(100, l));
  const c = (1 - Math.abs(2 * l / 100 - 1)) * s / 100;
  const x = c * (1 - Math.abs(h / 60 % 2 - 1));
  const m = l / 100 - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ];
}
function getBgModeCodeMarker() {
  const bgPlugin = registry.plugins.find((plugin) => plugin.name === "bg");
  if (bgPlugin && bgPlugin.BG_MODE_CODE_MARKER) {
    return bgPlugin.BG_MODE_CODE_MARKER;
  }
  return void 0;
}
Object.defineProperties(styler.Styler.prototype, {
  hex: {
    get() {
      const handler = (color) => {
        const [r, g, b] = parseHex(color);
        const rgbCode = createRgbCode(r, g, b);
        return styler.createStyler([rgbCode], "");
      };
      return handler;
    },
    enumerable: true,
    configurable: true
  },
  h: {
    get() {
      const handler = (color) => {
        const [r, g, b] = parseHex(color);
        const rgbCode = createRgbCode(r, g, b);
        return styler.createStyler([rgbCode], "");
      };
      return handler;
    },
    enumerable: true,
    configurable: true
  },
  bgHex: {
    get() {
      const handler = (color) => {
        const [r, g, b] = parseHex(color);
        const rgbCode = createBgRgbCode(r, g, b);
        return styler.createStyler([rgbCode], "");
      };
      return handler;
    },
    enumerable: true,
    configurable: true
  },
  rgb: {
    get() {
      const handler = (r, g, b) => {
        validateRgb(r, g, b);
        const rgbCode = createRgbCode(r, g, b);
        return styler.createStyler([rgbCode], "");
      };
      return handler;
    },
    enumerable: true,
    configurable: true
  },
  bgRgb: {
    get() {
      const handler = (r, g, b) => {
        validateRgb(r, g, b);
        const rgbCode = createBgRgbCode(r, g, b);
        return styler.createStyler([rgbCode], "");
      };
      return handler;
    },
    enumerable: true,
    configurable: true
  }
});
const utilPlugin = {
  name: "util",
  /**
   * Handle property access for color utilities
   * Return undefined to let the core system handle it through ansiCodes
   */
  handleProperty(_target, prop, codes, accumulatedText, options) {
    if (!(options == null ? void 0 : options.createStyler)) {
      return void 0;
    }
    if (prop === "hex" || prop === "h") {
      const handler = (color) => {
        const [r, g, b] = parseHex(color);
        const bgModeMarker = getBgModeCodeMarker();
        const bgMode = bgModeMarker ? codes.some((code) => code.open === bgModeMarker) : false;
        const rgbCode = bgMode ? createBgRgbCode(r, g, b) : createRgbCode(r, g, b);
        return options.createStyler([...codes, rgbCode], accumulatedText);
      };
      return handler;
    }
    if (prop === "bgHex") {
      const handler = (color) => {
        const [r, g, b] = parseHex(color);
        const rgbCode = createBgRgbCode(r, g, b);
        return options.createStyler([...codes, rgbCode], accumulatedText);
      };
      return handler;
    }
    if (prop === "rgb") {
      const handler = (r, g, b) => {
        validateRgb(r, g, b);
        const bgModeMarker = getBgModeCodeMarker();
        const bgMode = bgModeMarker ? codes.some((code) => code.open === bgModeMarker) : false;
        const rgbCode = bgMode ? createBgRgbCode(r, g, b) : createRgbCode(r, g, b);
        return options.createStyler([...codes, rgbCode], accumulatedText);
      };
      return handler;
    }
    if (prop === "bgRgb") {
      const handler = (r, g, b) => {
        validateRgb(r, g, b);
        const rgbCode = createBgRgbCode(r, g, b);
        return options.createStyler([...codes, rgbCode], accumulatedText);
      };
      return handler;
    }
    return void 0;
  }
};
registry.register(utilPlugin);
exports.createBgRgbCode = createBgRgbCode;
exports.createRgbCode = createRgbCode;
exports.hslToRgb = hslToRgb;
exports.parseHex = parseHex;
exports.utilPlugin = utilPlugin;
exports.validateRgb = validateRgb;
//# sourceMappingURL=util.cjs.map
