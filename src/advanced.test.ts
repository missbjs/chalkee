import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import chalkee, { red, blue, bold, dim, hex, rgb, bgRed, bgHex, bgRgb } from './index'

test('Chalkee - should support background colors', () => {
    const result = bgRed('Hello World')
    assert.equal(typeof result, 'function')
})

test('Chalkee - should support rgb colors', () => {
    const result = rgb(255, 0, 0)('Hello World')
    assert.equal(typeof result, 'function')
})

test('Chalkee - should support background hex colors', () => {
    const result = bgHex('#ff0000')('Hello World')
    assert.equal(typeof result, 'function')
})

test('Chalkee - should support background rgb colors', () => {
    const result = bgRgb(255, 0, 0)('Hello World')
    assert.equal(typeof result, 'function')
})

test('Chalkee - should support multiple modifiers', () => {
    const result = chalkee.red.bold.dim('Hello World')
    assert.equal(typeof result, 'function')
})

test('Chalkee - should support auto-spacing', () => {
    const result = chalkee.red.as('Hello')
    assert.equal(typeof result, 'function')
})

test('Chalkee - should convert to string with ANSI codes', () => {
    const result = chalkee.red('Hello World').toString()
    // Should contain ANSI escape codes for red color
    assert.ok(result.includes('\x1b['))
})

test('Chalkee - should produce different outputs for different colors', () => {
    const redResult = chalkee.red('Hello').toString()
    const blueResult = chalkee.blue('Hello').toString()

    // Both should contain ANSI codes but be different
    assert.ok(redResult.includes('\x1b['))
    assert.ok(blueResult.includes('\x1b['))
    assert.notEqual(redResult, blueResult)
})

test('Chalkee - should support shorthand aliases', () => {
    const result = chalkee.r('Hello World') // reset
    assert.equal(typeof result, 'function')

    const boldResult = chalkee.b('Hello World') // bold
    assert.equal(typeof boldResult, 'function')

    const dimResult = chalkee.d('Hello World') // dim
    assert.equal(typeof dimResult, 'function')
})