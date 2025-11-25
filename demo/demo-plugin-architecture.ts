const plugins = [corePlugin, customColorsPlugin]

plugins.forEach((plugin, index) => {
    console.log(`Plugin ${index + 1}: ${plugin.name}`)
    console.log(`  - Has registerCodes: ${!!plugin.registerCodes}`)
    console.log(`  - Has handleProperty: ${!!plugin.handleProperty}`)
    console.log(`  - Has isMarkerCode: ${!!plugin.isMarkerCode}`)

    if (plugin.registerCodes) {
        const codes = plugin.registerCodes()
        console.log(`  - Provides ${Object.keys(codes).length} ANSI codes`)
    }
    console.log()
})

// Demonstrate that all functionality works together
console.log('=== Functionality Demonstration ===')
const value = 111
const value2 = "222"
console.log('Core functionality:', crayon.as.red.bold`Bold red text`(value)(value2))
console.log('Custom colors:', crayon.as.pink.underline('Pink underlined text')(value)(value2))

console.log('\nArchitecture successfully implemented!')