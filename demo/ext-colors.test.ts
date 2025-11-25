import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { customColorsPlugin } from '../src/plugins/ext-colors'

test('Custom colors plugin', () => {
  // Test that the plugin registers custom codes
  assert.ok(customColorsPlugin.registerCodes, 'registerCodes method should exist')
  const codes = customColorsPlugin.registerCodes!()

  // Check that custom foreground colors are registered
  assert.ok('pink' in codes, 'pink color should be registered')
  assert.ok('orange' in codes, 'orange color should be registered')
  assert.ok('purple' in codes, 'purple color should be registered')
  assert.ok('lime' in codes, 'lime color should be registered')
  assert.ok('coral' in codes, 'coral color should be registered')
  assert.ok('teal' in codes, 'teal color should be registered')

  // Check that custom background colors are registered
  assert.ok('bgPink' in codes, 'bgPink color should be registered')
  assert.ok('bgOrange' in codes, 'bgOrange color should be registered')
  assert.ok('bgPurple' in codes, 'bgPurple color should be registered')
  assert.ok('bgLime' in codes, 'bgLime color should be registered')
  assert.ok('bgCoral' in codes, 'bgCoral color should be registered')
  assert.ok('bgTeal' in codes, 'bgTeal color should be registered')

  // Check that custom modifiers are registered
  assert.ok('blink' in codes, 'blink modifier should be registered')
  assert.ok('overline' in codes, 'overline modifier should be registered')
  assert.ok('doubleUnderline' in codes, 'doubleUnderline modifier should be registered')

  // Check that the codes have the correct structure
  assert.ok(codes.pink.open, 'pink should have an open code')
  assert.ok(codes.pink.close, 'pink should have a close code')
  assert.ok(codes.bgOrange.open, 'bgOrange should have an open code')
  assert.ok(codes.bgOrange.close, 'bgOrange should have a close code')

  // Check specific code values
  assert.equal(codes.pink.open, '\x1b[38;5;201m', 'pink open code should be correct')
  assert.equal(codes.pink.close, '\x1b[39m', 'pink close code should be correct')
  assert.equal(codes.bgOrange.open, '\x1b[48;5;208m', 'bgOrange open code should be correct')
  assert.equal(codes.bgOrange.close, '\x1b[49m', 'bgOrange close code should be correct')
})