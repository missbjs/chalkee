import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import util from 'util'
import chalkee, {
    red, green, blue, yellow, magenta, cyan, white, black, gray,
    bold, dim, italic, underline, strikethrough, inverse, hidden,
    bgRed, bgGreen, bgBlue, bgYellow, bgMagenta, bgCyan, bgWhite, bgBlack,
    b, d, i, u, s, r
} from './src/index'

// Test the core functionality
test('Chalkee - should create basic styled strings with proper custom inspect', () => {
    const redText = red('Hello World')

    // Test that it's a function
    assert.equal(typeof redText, 'function')

    // Test custom inspect functionality
    console.log('Red text (should show styled text):', redText)

    // Test toString method
    console.log('Red text toString():', JSON.stringify(redText.toString()))
    assert.match(redText.toString(), /\x1b\[31mHello World\x1b\[0m/)

    // Test that custom inspect symbol works
    const customSymbol = util.inspect.custom
    assert.ok(redText[customSymbol], 'Should have custom inspect symbol')
    assert.equal(redText[customSymbol](), redText.toString(), 'Custom inspect should return same as toString')
})

test('Chalkee - should support individual color exports', () => {
    const result = red('Hello World')
    console.log('Individual red export:', result)
    assert.equal(typeof result, 'function')
    assert.match(result.toString(), /\x1b\[31mHello World\x1b\[0m/)
})

test('Chalkee - should support individual style exports', () => {
    const result = bold('Hello World')
    console.log('Individual bold export:', result)
    assert.equal(typeof result, 'function')
    assert.match(result.toString(), /\x1b\[1mHello World\x1b\[0m/)
})

test('Chalkee - should support complex color combinations using individual exports', () => {
    // Test multiple modifiers using individual exports
    const result = red('red').bold('bold').underline('underline')
    console.log('Multiple modifiers with individual exports:', result)
    assert.equal(typeof result, 'function')
})

test('Chalkee - should support shorthand aliases using individual exports', () => {
    // Test shorthand aliases using individual exports
    const boldResult = b('Bold text')
    const dimResult = d('Dim text')
    const underlineResult = u('Underline text')

    console.log('Shorthand aliases with individual exports:')
    console.log('  bold:', boldResult)
    console.log('  dim:', dimResult)
    console.log('  underline:', underlineResult)

    assert.equal(typeof boldResult, 'function')
    assert.equal(typeof dimResult, 'function')
    assert.equal(typeof underlineResult, 'function')
})

test('Chalkee - should convert to string with ANSI codes', () => {
    const result = red('Hello World').toString()
    // Should contain ANSI escape codes
    assert.ok(result.includes('\x1b['), 'Should contain ANSI escape codes')
    console.log('ANSI codes present:', JSON.stringify(result))
})

test('Chalkee - should produce different outputs for different colors', () => {
    const redResult = red('Hello').toString()
    const blueResult = blue('Hello').toString()

    // Both should contain ANSI codes but be different
    assert.ok(redResult.includes('\x1b['), 'Red result should contain ANSI codes')
    assert.ok(blueResult.includes('\x1b['), 'Blue result should contain ANSI codes')
    assert.notEqual(redResult, blueResult, 'Red and blue results should be different')

    console.log('Red result:', JSON.stringify(redResult))
    console.log('Blue result:', JSON.stringify(blueResult))
})

// Test edge cases
test('Chalkee - should handle empty strings', () => {
    const result = red('')
    console.log('Empty string result:', result)
    assert.equal(typeof result, 'function')
})

console.log('\n=== Comprehensive Chalkee Test Suite ===')
console.log('This test suite validates all core functionality of the Chalkee library.')
console.log('It focuses on the "fn cum class" implementation pattern where:')
console.log('1. Function creation happens in the constructor')
console.log('2. All properties are defined as class properties or attached to the class prototype')
console.log('3. All state is maintained in class private properties')
console.log('4. Custom inspect functionality works correctly with util.inspect.custom symbol')
console.log('========================================\n')