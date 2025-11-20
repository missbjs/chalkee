# Crayon 🖍️

> Terminal string styling with ANSI escape codes. Tree-shakable, TypeScript-first, no String.prototype patching.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Crayon is a modern reimplementation of [chalk](https://github.com/chalk/chalk), designed with tree-shaking, TypeScript, and developer experience in mind.

## Features

- ✨ **Expressive API** - Chainable syntax for combining styles
- 🌳 **Tree-shakable** - Import only what you use
- 📦 **Lightweight** - Zero dependencies
- 🔷 **TypeScript-first** - Full type safety and autocomplete
- 🎨 **All chalk features** - Colors, modifiers, hex, RGB support
- 🚫 **No prototype pollution** - Doesn't patch String.prototype
- 🎯 **Multiple usage patterns** - Function calls, template literals, chaining
- ⚡ **Fast** - Optimized for performance

## Installation

```bash
pnpm add crayon
# or
npm install crayon
# or
yarn add crayon
```

## Quick Start

```typescript
import crayon, { red, blue, green } from 'crayon';

// Basic usage
console.log(crayon.blue('Hello world!'));
console.log(red.bold('Error!'));
console.log(green.underline('Success'));

// Template literals
console.log(blue`Hello world!`);
console.log(red.bold`Error: ${'Something went wrong'}`);

// Chaining
console.log(red.bold.underline('Critical error'));
console.log(blue.bgWhite.italic('Styled text'));

// Hex and RGB colors
console.log(crayon.hex('#FF5733')('Custom color'));
console.log(crayon.rgb(255, 87, 51)('RGB color'));
```

## Usage Patterns

### Default Import

```typescript
import crayon from 'crayon';

console.log(crayon.red('Red text'));
console.log(crayon.blue.bold('Blue and bold'));
```

### Named Imports (Tree-shakable)

```typescript
import { red, blue, bold, underline } from 'crayon';

console.log(red('Red text'));
console.log(blue.bold('Blue and bold'));
console.log(underline('Underlined'));
```

### Mixed Import

```typescript
import crayon, { red, blue } from 'crayon';

console.log(crayon.green('Green'));
console.log(red('Red'));
console.log(blue.bold('Blue bold'));
```

## API Reference

### Text Colors

| Color | Bright Variant |
|-------|----------------|
| `black` | `blackBright` |
| `red` | `redBright` |
| `green` | `greenBright` |
| `yellow` | `yellowBright` |
| `blue` | `blueBright` |
| `magenta` | `magentaBright` |
| `cyan` | `cyanBright` |
| `white` | `whiteBright` |
| `gray` / `grey` | - |

### Background Colors

| Color | Bright Variant |
|-------|----------------|
| `bgBlack` | `bgBlackBright` |
| `bgRed` | `bgRedBright` |
| `bgGreen` | `bgGreenBright` |
| `bgYellow` | `bgYellowBright` |
| `bgBlue` | `bgBlueBright` |
| `bgMagenta` | `bgMagentaBright` |
| `bgCyan` | `bgCyanBright` |
| `bgWhite` | `bgWhiteBright` |

### Text Modifiers

- `reset` - Reset all styles
- `bold` - Bold text
- `dim` - Dim/faint text
- `italic` - Italic text
- `underline` - Underlined text
- `inverse` - Inverse colors
- `hidden` - Hidden text
- `strikethrough` - Strikethrough text

### Color Utilities

#### Hex Colors

```typescript
import { hex, bgHex } from 'crayon';

// Foreground
console.log(hex('#FF5733')('Text'));
console.log(hex('#F53')('Short hex'));

// Background
console.log(bgHex('#FF5733')('Text'));
```

#### RGB Colors

```typescript
import { rgb, bgRgb } from 'crayon';

// Foreground
console.log(rgb(255, 87, 51)('Text'));

// Background
console.log(bgRgb(255, 87, 51)('Text'));
```

### Shorthand Aliases

For faster typing, Crayon provides convenient single-letter aliases:

| Alias | Full Name | Example |
|-------|-----------|---------|
| `h` | `hex` | `h('#FF5733')('text')` |
| `r` | `reset` | `r('text')` |
| `b` | `bold` | `b('text')` |
| `i` | `italic` | `i('text')` |
| `u` | `underline` | `u('text')` |
| `s` | `strikethrough` | `s('text')` |
| `d` | `dim` | `d('text')` |

```typescript
import { h, b, i, u } from 'crayon';

console.log(h('#FF5733')('Custom color'));
console.log(b('Bold'));
console.log(i('Italic'));
console.log(u('Underline'));
```

## Chaining

Crayon supports powerful chaining to combine multiple styles:

```typescript
import { red, blue } from 'crayon';

// Chain colors and modifiers
console.log(red.bold.underline('Error'));
console.log(blue.bgWhite.italic('Info'));

// Chain with color utilities
console.log(red.bold.hex('#FF5733')('Mixed'));

// All styles are chainable
console.log(red.bold.italic.underline.bgWhite('All styles'));
```

## Template Literals

Use tagged template literals for a more natural syntax:

```typescript
import { red, blue, green } from 'crayon';

const name = 'World';
console.log(blue`Hello ${name}!`);

const error = 'File not found';
console.log(red.bold`Error: ${error}`);

const count = 42;
console.log(green`Processed ${count} items`);
```

## Environment Variables

Crayon respects environment variables for color support:

- `NO_COLOR` - Disable colors (any value)
- `FORCE_COLOR` - Force enable colors (any value)
- `COLORTERM` - Check for truecolor support (value: "truecolor")
- `TERM` - Check terminal capabilities

## TypeScript

Crayon is written in TypeScript and provides full type safety:

```typescript
import crayon, { StyledFunction } from 'crayon';

// All styles have proper types
const styled: StyledFunction = crayon.red.bold;

// Autocomplete works for all chains
const text = crayon.blue.underline.italic('text');

// Type-safe color utilities
const hexColor = crayon.hex('#FF5733');
const rgbColor = crayon.rgb(255, 87, 51);
```

## Comparison with Chalk

| Feature | Crayon | Chalk |
|---------|--------|-------|
| Tree-shaking | ✅ | ❌ |
| TypeScript-first | ✅ | ⚠️ |
| String.prototype patching | ❌ (none) | ✅ (optional) |
| Template literals | ✅ | ✅ |
| Chaining | ✅ | ✅ |
| Hex/RGB colors | ✅ | ✅ |
| Shorthand aliases | ✅ | ❌ |
| Dependencies | 0 | 0 |

## Performance & Bundle Size

Crayon is designed for optimal tree-shaking:

```typescript
// Only imports what you use
import { red, blue } from 'crayon';
// Result: Only red and blue are included in your bundle

// Full import
import crayon from 'crayon';
// Result: All styles included (still lightweight!)
```

## Examples

### Error Messages

```typescript
import { red, yellow, blue } from 'crayon';

console.error(red.bold('✖ Error:'), 'Something went wrong');
console.warn(yellow.bold('⚠ Warning:'), 'Deprecated feature');
console.log(blue.bold('ℹ Info:'), 'Process completed');
```

### CLI Output

```typescript
import { green, cyan, bold } from 'crayon';

console.log(green('✓'), 'Build successful');
console.log(cyan(bold('Building...')));
console.log(green(`Done in ${Date.now()}ms`));
```

### Colored Logs

```typescript
import crayon from 'crayon';

const log = {
  error: (msg: string) => console.log(crayon.red.bold('[ERROR]'), msg),
  warn: (msg: string) => console.log(crayon.yellow.bold('[WARN]'), msg),
  info: (msg: string) => console.log(crayon.blue.bold('[INFO]'), msg),
  success: (msg: string) => console.log(crayon.green.bold('[OK]'), msg),
};

log.error('Connection failed');
log.warn('Using default config');
log.info('Starting server');
log.success('Server started on port 3000');
```

### Custom Themes

```typescript
import { hex } from 'crayon';

const theme = {
  primary: hex('#007ACC'),
  success: hex('#28A745'),
  warning: hex('#FFC107'),
  danger: hex('#DC3545'),
};

console.log(theme.primary('Primary text'));
console.log(theme.success('Success message'));
console.log(theme.warning('Warning message'));
console.log(theme.danger('Danger alert'));
```

## License

MIT © [Your Name]

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

Inspired by [chalk](https://github.com/chalk/chalk).
