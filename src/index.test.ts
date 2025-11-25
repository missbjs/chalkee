/**
 * Tests for Crayon
 */

import { describe, test } from 'node:test'
import assert from 'node:assert'
// Import from the full version to get all plugins registered
import crayon from './index.full'
import { red, blue, bold, hex, rgb, h, b, i, u } from './index.full'

// Disable color support for testing
process.env.NO_COLOR = '1'

describe('Crayon', () => {
  test('should export default crayon object', () => {
    assert.strictEqual(typeof crayon, 'function')
  })

  test('should work with function call', () => {
    const result = red('Hello')
    assert.strictEqual(String(result), 'Hello')
  })

  test('should work with template literal', () => {
    const result = blue`World`
    assert.strictEqual(String(result), 'World')
  })

  test('should chain styles', () => {
    const result = red.bold('Error')
    assert.strictEqual(String(result), 'Error')
  })

  test('should chain multiple styles', () => {
    const result = red.bold.underline('Critical')
    assert.strictEqual(String(result), 'Critical')
  })

  test('should work with crayon object', () => {
    const result = crayon.green('Success')
    assert.strictEqual(String(result), 'Success')
  })

  test('should work with hex colors', () => {
    const result = hex('#FF5733')('Color')
    assert.strictEqual(String(result), 'Color')
  })

  test('should work with rgb colors', () => {
    const result = rgb(255, 87, 51)('Color')
    assert.strictEqual(String(result), 'Color')
  })

  test('should work with shorthand hex alias', () => {
    const result = h('#FF5733')('Color')
    assert.strictEqual(String(result), 'Color')
  })

  test('should work with shorthand bold alias', () => {
    const result = b('Bold')
    assert.strictEqual(String(result), 'Bold')
  })

  test('should work with shorthand italic alias', () => {
    const result = i('Italic')
    assert.strictEqual(String(result), 'Italic')
  })

  test('should work with shorthand underline alias', () => {
    const result = u('Underline')
    assert.strictEqual(String(result), 'Underline')
  })

  test('should handle template literals with values', () => {
    const name = 'World'
    const result = blue`Hello ${name}!`
    assert.strictEqual(String(result), 'Hello World!')
  })

  test('should chain after function call', () => {
    const result = red('Text').bold
    assert.strictEqual(typeof result, 'function')
  })

  test('should work with background colors', () => {
    const result = crayon.bgRed('Background')
    assert.strictEqual(String(result), 'Background')
  })

  test('should combine foreground and background', () => {
    const result = crayon.red.bgWhite('Combined')
    assert.strictEqual(String(result), 'Combined')
  })

  test('should handle empty string', () => {
    const result = red('')
    assert.strictEqual(String(result), '')
  })

  test('should handle modifiers', () => {
    const result = bold.dim.italic.underline('Styled')
    assert.strictEqual(String(result), 'Styled')
  })
})

describe('ANSI codes with color support', () => {
  test('should apply ANSI codes when colors are enabled', () => {
    // Temporarily enable colors
    delete process.env.NO_COLOR
    process.env.FORCE_COLOR = '1'

    const result = red('Hello')
    assert.ok(String(result).includes('\x1b['))
    assert.ok(String(result).includes('Hello'))

    // Restore NO_COLOR
    process.env.NO_COLOR = '1'
    delete process.env.FORCE_COLOR
  })

  test('should apply hex color codes', () => {
    delete process.env.NO_COLOR
    process.env.FORCE_COLOR = '1'

    const result = hex('#FF5733')('Color')
    assert.ok(String(result).includes('\x1b[38;2;255;87;51m'))

    process.env.NO_COLOR = '1'
    delete process.env.FORCE_COLOR
  })

  test('should apply rgb color codes', () => {
    delete process.env.NO_COLOR
    process.env.FORCE_COLOR = '1'

    const result = rgb(100, 200, 50)('Color')
    assert.ok(String(result).includes('\x1b[38;2;100;200;50m'))

    process.env.NO_COLOR = '1'
    delete process.env.FORCE_COLOR
  })
})

describe('Color utilities', () => {
  test('should parse short hex colors', () => {
    delete process.env.NO_COLOR
    process.env.FORCE_COLOR = '1'

    const result = hex('#F53')('Color')
    assert.ok(String(result).includes('\x1b[38;2;255;85;51m'))

    process.env.NO_COLOR = '1'
    delete process.env.FORCE_COLOR
  })

  test('should handle bgHex', () => {
    delete process.env.NO_COLOR
    process.env.FORCE_COLOR = '1'

    const result = crayon.bgHex('#FF5733')('Color')
    assert.ok(String(result).includes('\x1b[48;2;255;87;51m'))

    process.env.NO_COLOR = '1'
    delete process.env.FORCE_COLOR
  })

  test('should handle bgRgb', () => {
    delete process.env.NO_COLOR
    process.env.FORCE_COLOR = '1'

    const result = crayon.bgRgb(100, 200, 50)('Color')
    assert.ok(String(result).includes('\x1b[48;2;100;200;50m'))

    process.env.NO_COLOR = '1'
    delete process.env.FORCE_COLOR
  })
})