import { red, bold, underline, green } from './src/index'

console.log('=== Debug Chain Pattern ===')

// Test the desired chaining pattern - this is the correct syntax
console.log('\n--- Desired chaining pattern ---')
try {
    const desiredChain = red('red only').bold('red & bold').underline('red bold & underline')
    console.log('Result (toString):', JSON.stringify(desiredChain.toString()))
    console.log('Expected:', JSON.stringify('\u001b[31mred only\u001b[0m \u001b[1;31mred & bold\u001b[0m \u001b[1;4;31mred bold & underline\u001b[0m'))
    console.log('Match:', desiredChain.toString() === '\u001b[31mred only\u001b[0m \u001b[1;31mred & bold\u001b[0m \u001b[1;4;31mred bold & underline\u001b[0m' ? green('✓') : red('✗'))
} catch (error) {
    console.log('Error:', error.message)
}

// Test step by step - this is the correct syntax
console.log('\n--- Step by step ---')
try {
    const step1 = red('red only')
    console.log('Step 1 toString():', JSON.stringify(step1.toString()))

    // Get the bold method and call it with text
    const boldMethod = step1.bold
    const step2 = boldMethod('red & bold')
    console.log('Step 2 toString():', JSON.stringify(step2.toString()))

    // Get the underline method and call it with text
    const underlineMethod = step2.underline
    const step3 = underlineMethod('red bold & underline')
    console.log('Step 3 toString():', JSON.stringify(step3.toString()))
} catch (error) {
    console.log('Error in step by step:', error.message)
}