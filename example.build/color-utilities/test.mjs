// Color utilities consumer application - selectively import plugin
import 'crayon/plugins/color-utilities' // Import and register only the color utilities plugin
import crayon from 'crayon/minimal'

console.log('Testing color utilities consumer app:');
console.log(crayon.hex('#FF0000')`This should be red`);
console.log(crayon.rgb(0, 255, 0)`This should be green`);
console.log(crayon.bgHex('#0000FF')`This should have blue background`);

// Test negative case - red should NOT be defined here
if (typeof crayon.red === 'undefined') {
  console.log('red is correctly not available in color-utilities only build');
} else {
  console.log('ERROR: red should NOT be available in color-utilities only build');
  console.log('red value:', crayon.red);
}