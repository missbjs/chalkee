import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import chalkee from './index'

test('Chalkee - should produce ANSI escape codes', () => {
    // Test basic color
    const redText = chalkee.red('Hello').toString()
    console.log('Red text:', JSON.stringify(redText))

    // Test chained styles
    const boldRedText = chalkee.red.bold('Hello').toString()
    console.log('Bold red text:', JSON.stringify(boldRedText))

    // Test that output contains ANSI escape sequences
    assert.ok(redText.includes('\x1b['), 'Should contain ANSI escape codes')
    assert.ok(boldRedText.includes('\x1b['), 'Should contain ANSI escape codes')

    // Verify the text content is preserved
    assert.ok(redText.includes('Hello'), 'Should contain the original text')
    assert.ok(boldRedText.includes('Hello'), 'Should contain the original text')
})

test('Chalkee - should handle template literals', () => {
    const name = 'World'
    const result = chalkee`Hello ${chalkee.red(name)}!`.toString()
    console.log('Template literal result:', JSON.stringify(result))

    assert.ok(result.includes('\x1b['), 'Should contain ANSI escape codes')
    assert.ok(result.includes('Hello'), 'Should contain the first part of the string')
    assert.ok(result.includes('World'), 'Should contain the interpolated value')
    assert.ok(result.includes('!'), 'Should contain the last part of the string')
})