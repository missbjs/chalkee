# Background Chaining Test Results

## Test Case
Lines 9-11 from `test-bg-chaining.mjs`:
```javascript
console.log('Testing: bg.red("Red background").as.bg.blue("Blue background")');
const result1 = bg.red('Red background').as.bg.blue('Blue background');
console.log('Result as string:', JSON.stringify(String(result1)));
```

## Actual Results
- **String result**: `"Blue background"`
- **Escaped result**: `"\\x1b[34mBlue background\\x1b[39m"`

## Expected Results
Based on the code analysis and intended behavior:
- **String result**: `"Red background Blue background"` (with proper ANSI coloring)
- **Escaped result**: Should show both segments with their respective colors

## Analysis
The `.as` operator is intended to:
1. Terminate the bg-mode (background color mode)
2. Allow chaining with regular (foreground) colors
3. Insert a space between the two segments

However, the current implementation only shows the last segment, losing the accumulated text from previous segments.

## Conclusion
There is an issue with the background chaining implementation where the `.as` operator is not properly preserving the accumulated text from previous segments.