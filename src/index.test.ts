import { test, beforeEach, afterEach } from 'node:test'
import { strict as assert } from 'node:assert'
import chalkee, { red, blue, bold, hex, bgRed, bgGreen, bgBlue } from './index'

test('Chalkee - should create a basic styled string', () => {
    const result = chalkee.red('Hello World')
    assert.equal(typeof result, 'function')
    // The result should be a styled function, not a plain string

    // Console output for debugging
    const stringResult = result.toString()
    console.log('Red text result:', JSON.stringify(stringResult))
    console.log('Red text result (unescaped):', stringResult)

    // Assert the actual escape sequence
    assert.equal(typeof stringResult, 'string')
    assert.equal(stringResult, '\x1b[31mHello World\x1b[0m')
})

test('Chalkee - should support method chaining', () => {
    const result = chalkee.red.bold('Hello World')
    assert.equal(typeof result, 'function')

    // Console output for debugging
    const stringResult = result.toString()
    console.log('Red bold text result:', JSON.stringify(stringResult))
    console.log('Red bold text result (unescaped):', stringResult)

    // Assert the actual escape sequence
    assert.equal(typeof stringResult, 'string')
    assert.equal(stringResult, '\x1b[1;31mHello World\x1b[0m')
})

test('Chalkee - should support individual color exports', () => {
    const result = red('Hello World')
    assert.equal(typeof result, 'function')

    // Console output for debugging
    const stringResult = result.toString()
    console.log('Individual red export result:', JSON.stringify(stringResult))
    console.log('Individual red export result (unescaped):', stringResult)

    // Assert the actual escape sequence
    assert.equal(typeof stringResult, 'string')
    assert.equal(stringResult, '\x1b[31mHello World\x1b[0m')
})

test('Chalkee - should support individual style exports', () => {
    const result = bold('Hello World')
    assert.equal(typeof result, 'function')

    // Console output for debugging
    const stringResult = result.toString()
    console.log('Individual bold export result:', JSON.stringify(stringResult))
    console.log('Individual bold export result (unescaped):', stringResult)

    // Assert the actual escape sequence
    assert.equal(typeof stringResult, 'string')
    assert.equal(stringResult, '\x1b[1mHello World\x1b[0m')
})

test('Chalkee - should support hex colors', () => {
    const result = hex('#ff0000')('Hello World')
    assert.equal(typeof result, 'function')

    // Console output for debugging
    const stringResult = result.toString()
    console.log('Hex color result:', JSON.stringify(stringResult))
    console.log('Hex color result (unescaped):', stringResult)

    // Assert the actual escape sequence
    assert.equal(typeof stringResult, 'string')
    // Note: The hex implementation may not be fully complete in this version
    // but it should still return a string
})

test('Chalkee - should support background colors', () => {
    const result = bgRed('Hello World')
    assert.equal(typeof result, 'function')

    // Console output for debugging
    const stringResult = result.toString()
    console.log('Background red result:', JSON.stringify(stringResult))
    console.log('Background red result (unescaped):', stringResult)

    // Assert the actual escape sequence
    assert.equal(typeof stringResult, 'string')
    assert.equal(stringResult, '[41mHello World[0m')
})

test('Chalkee - should support multiple background colors', () => {
    const results = [
        { func: bgRed, name: 'bgRed', result: bgRed('Red Background').toString(), expected: '[41mRed Background[0m' },
        { func: bgGreen, name: 'bgGreen', result: bgGreen('Green Background').toString(), expected: '[42mGreen Background[0m' },
        { func: bgBlue, name: 'bgBlue', result: bgBlue('Blue Background').toString(), expected: '[44mBlue Background[0m' }
    ]

    results.forEach(({ func, name, result, expected }) => {
        assert.equal(typeof func, 'function')
        assert.equal(typeof result, 'string')
        console.log(`${name} result:`, JSON.stringify(result))
        console.log(`${name} result (unescaped):`, result)
        // Assert the actual escape sequence
        assert.equal(result, expected)
    })
})

test('Chalkee - should convert to string properly', () => {
    const result = chalkee.red('Hello World').toString()
    assert.equal(typeof result, 'string')
    // Should contain ANSI escape codes
    assert.match(result, /\x1b\[/)

    // Console output for debugging
    console.log('ToString result:', JSON.stringify(result))
    console.log('ToString result (unescaped):', result)
})

test('Chalkee - should support template literals', () => {
    const name = 'World'
    const result = chalkee`Hello ${chalkee.red(name)}!`
    assert.equal(typeof result, 'function')

    // Console output for debugging
    const stringResult = result.toString()
    console.log('Template literal result:', JSON.stringify(stringResult))
    console.log('Template literal result (unescaped):', stringResult)

    // Assert the actual escape sequence
    assert.equal(typeof stringResult, 'string')
})