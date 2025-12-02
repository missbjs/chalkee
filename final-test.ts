import { red, bold, underline, green } from './src/index'

console.log('Final test:')

// Test basic functionality
console.log('Basic red text:', red('Hello Red'))

// Test chaining
console.log('Chained text:', red('first').bold('second').underline('third'))

// Test more complex chaining
console.log('Complex chain:', red('red').bold('bold').underline('underline').green('green'))

// Test individual methods
console.log('Bold only:', bold('Bold text'))
console.log('Underline only:', underline('Underline text'))

// Test mixed chaining
console.log('Mixed chain:', bold('bold').red('red').underline('underline'))