/**
 * Type definitions for Crayon
 */

/**
 * A function that styles text and can be chained with other styles
 */
export interface StyledFunction {
  (text: string): string
  (strings: TemplateStringsArray, ...values: unknown[]): string

  // Nested namespace for background colors
  bg: {
    black: StyledFunction
    red: StyledFunction
    green: StyledFunction
    yellow: StyledFunction
    blue: StyledFunction
    magenta: StyledFunction
    cyan: StyledFunction
    white: StyledFunction
    blackBright: StyledFunction
    redBright: StyledFunction
    greenBright: StyledFunction
    yellowBright: StyledFunction
    blueBright: StyledFunction
    magentaBright: StyledFunction
    cyanBright: StyledFunction
    whiteBright: StyledFunction
    hex: (color: string) => StyledFunction
    rgb: (r: number, g: number, b: number) => StyledFunction
  }

  // Auto-space method
  as: StyledFunction

  reset: StyledFunction
  bold: StyledFunction
  dim: StyledFunction
  italic: StyledFunction
  underline: StyledFunction
  inverse: StyledFunction
  hidden: StyledFunction
  strikethrough: StyledFunction

  black: StyledFunction
  red: StyledFunction
  green: StyledFunction
  yellow: StyledFunction
  blue: StyledFunction
  magenta: StyledFunction
  cyan: StyledFunction
  white: StyledFunction
  gray: StyledFunction
  grey: StyledFunction

  blackBright: StyledFunction
  redBright: StyledFunction
  greenBright: StyledFunction
  yellowBright: StyledFunction
  blueBright: StyledFunction
  magentaBright: StyledFunction
  cyanBright: StyledFunction
  whiteBright: StyledFunction

  bgBlack: StyledFunction
  bgRed: StyledFunction
  bgGreen: StyledFunction
  bgYellow: StyledFunction
  bgBlue: StyledFunction
  bgMagenta: StyledFunction
  bgCyan: StyledFunction
  bgWhite: StyledFunction

  bgBlackBright: StyledFunction
  bgRedBright: StyledFunction
  bgGreenBright: StyledFunction
  bgYellowBright: StyledFunction
  bgBlueBright: StyledFunction
  bgMagentaBright: StyledFunction
  bgCyanBright: StyledFunction
  bgWhiteBright: StyledFunction

  hex: (color: string) => StyledFunction
  rgb: (r: number, g: number, b: number) => StyledFunction
  bgHex: (color: string) => StyledFunction
  bgRgb: (r: number, g: number, b: number) => StyledFunction

  h: (color: string) => StyledFunction
  r: StyledFunction
  b: StyledFunction
  i: StyledFunction
  u: StyledFunction
  s: StyledFunction
  d: StyledFunction
}

export interface Crayon extends StyledFunction { }