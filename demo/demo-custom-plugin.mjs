#!/usr/bin/env node

/**
 * Demo of custom plugin concept for Crayon
 * Shows how users can extend Crayon with their own color codes
 * Note: In a real implementation, plugins would be registered at build time
 */

import crayon from '../dist/index.mjs';

console.log('\n=== Custom Plugin Concept Demo ===\n');

console.log('This demo shows how users can extend Crayon with custom color codes.');
console.log('In the source code, we\'ve created a custom-colors.ts plugin that adds:');
console.log('  - Custom foreground colors: pink, orange, purple, lime');
console.log('  - Custom background colors: bgPink, bgOrange, bgPurple, bgLime');
console.log('  - Custom modifiers: blink, doubleUnderline');

console.log('\nTo use these in a real application, users would:');
console.log('1. Create a plugin file (like src/plugins/custom-colors.ts)');
console.log('2. Import and register it in their entry point');
console.log('3. The new styles would then be available as properties');

console.log('\nExample usage (conceptual):');
console.log('  crayon.pink("This would be pink text")');
console.log('  crayon.bgOrange("This would have an orange background")');
console.log('  crayon.pink.bold("This would be bold pink text")');

console.log('\n=== Custom Plugin Concept Demo Complete ===\n');