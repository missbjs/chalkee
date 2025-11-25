// Tree shaking demo - consumer application
import crayon from 'chalkee'

console.log('Testing tree shaking demo:')
// @ts-ignore - Ignore type error for demo purposes
console.log(crayon.hex('#FF0000')`This should be red - testing tree shaking`)