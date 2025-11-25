import { r as register } from "../registry-B3Mmv60z.js";
const SPACE_MARKER = "\0AS\0";
const spacePlugin = {
  name: "space",
  handleProperty(_target, prop, codes, accumulatedText, options) {
    if (prop === "as") {
      if (options == null ? void 0 : options.createStyler) {
        const spaceCode = { open: SPACE_MARKER, close: "" };
        return options.createStyler([...codes, spaceCode], accumulatedText);
      }
    }
    return void 0;
  },
  isMarkerCode(code) {
    return code.open === SPACE_MARKER;
  },
  processText(codes, text, accumulatedText, filterMarkerCodes) {
    const autoSpaceMode = codes.some((code) => code.open === SPACE_MARKER);
    if (autoSpaceMode) {
      let styledText = "";
      if (accumulatedText.length > 0 && !accumulatedText.endsWith(" ")) {
        const plainSpace = applyStyle(" ", []);
        const styledTextContent = applyStyle(text, filterMarkerCodes(codes));
        styledText = plainSpace + styledTextContent;
      } else {
        styledText = applyStyle(text, filterMarkerCodes(codes));
      }
      return { styledText };
    }
    return void 0;
  }
};
register(spacePlugin);
function isSpaceMode(codes) {
  return codes.some((code) => code.open === SPACE_MARKER);
}
function applyStyle(text, codes) {
  if (codes.length === 0) {
    return text;
  }
  const openCodes = codes.map((c) => c.open).join("");
  const closeCodes = codes.map((c) => c.close).reverse().join("");
  return `${openCodes}${text}${closeCodes}`;
}
export {
  isSpaceMode,
  spacePlugin
};
//# sourceMappingURL=space.mjs.map
