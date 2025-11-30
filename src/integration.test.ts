import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import chalkee, {
    red, green, blue, yellow, magenta, cyan, bold, dim, underline,
    hex, rgb, bgRed, bgGreen, bgBlue
} from './index'

test('Chalkee - integration test with various styling combinations', () => {
    // Test basic colors
    const basicColors = [
        red('Red text'),
        green('Green text'),
        blue('Blue text'),
        yellow('Yellow text'),
        magenta('Magenta text'),
        cyan('Cyan text')
    ]

    basicColors.forEach(colorFn => {
        assert.equal(typeof colorFn, 'function')
        const result = colorFn.toString()
        assert.ok(result.includes('\x1b[')) // Contains ANSI codes
        assert.ok(result.endsWith('\x1b[0m')) // Ends with reset code
    })

    // Test background colors
    const bgColors = [
        bgRed('Red background'),
        bgGreen('Green background'),
        bgBlue('Blue background')
    ]

    bgColors.forEach(bgFn => {
        assert.equal(typeof bgFn, 'function')
        const result = bgFn.toString()
        assert.ok(result.includes('\x1b[')) // Contains ANSI codes
    })

    // Test modifiers
    const styledText = chalkee.red.bold.underline('Bold, red, underlined text')
    assert.equal(typeof styledText, 'function')
    const styledResult = styledText.toString()
    assert.ok(styledResult.includes('\x1b['))

    // Test hex colors
    const hexColored = hex('#ff5733')('Hex colored text')
    assert.equal(typeof hexColored, 'function')
    const hexResult = hexColored.toString()
    assert.ok(hexResult.includes('\x1b['))

    // Test rgb colors
    const rgbColored = rgb(255, 87, 51)('RGB colored text')
    assert.equal(typeof rgbColored, 'function')
    const rgbResult = rgbColored.toString()
    assert.ok(rgbResult.includes('\x1b['))

    console.log('Basic red:', red('Hello World').toString())
    console.log('Bold blue:', bold.blue('Bold Blue Text').toString())
    console.log('Complex chain:', chalkee.red.bgGreen.bold.underline('Red on Green, Bold & Underlined').toString())
})

test('Chalkee - should handle edge cases', () => {
    // Empty string
    const empty = chalkee.red('')
    assert.equal(typeof empty, 'function')
    assert.ok(empty.toString().includes('\x1b['))

    // Special characters
    const special = chalkee.blue('Hello\n\tWorld!')
    assert.equal(typeof special, 'function')
    const specialResult = special.toString()
    assert.ok(specialResult.includes('\x1b['))
    assert.ok(specialResult.includes('Hello'))
    assert.ok(specialResult.includes('World'))

    // Unicode characters
    const unicode = chalkee.green('Hello 世界 🌍')
    assert.equal(typeof unicode, 'function')
    const unicodeResult = unicode.toString()
    assert.ok(unicodeResult.includes('\x1b['))
    assert.ok(unicodeResult.includes('Hello'))
    assert.ok(unicodeResult.includes('世界'))
    assert.ok(unicodeResult.includes('🌍'))
})