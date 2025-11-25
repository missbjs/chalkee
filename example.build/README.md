# Crayon Example Builds

This directory contains example builds to demonstrate tree shaking and build size differences when using different plugin combinations.

## Directory Structure

- `core-colors/` - Consumer application using core colors (23.2 KB)
- `color-utilities/` - Consumer application using color utilities (15.4 KB)
- `modifiers/` - Consumer application using modifiers (28.4 KB)
- `mixed/` - Consumer application using multiple features (35.9 KB)
- `minimal/` - Consumer application with selective imports to demonstrate true tree shaking (10.9 KB)
- `selective-import/` - Consumer application demonstrating selective imports
- `tree-shaking-demo/` - Consumer application demonstrating tree shaking with selective imports

## How Tree Shaking Works

Crayon now supports true selective plugin imports:

1. **Workspace Protocol**: Each example uses `"crayon": "workspace:../../"` in package.json to symlink the local crayon package
2. **Minimal Entry Point**: Examples use `import crayon from 'crayon/minimal'` for a minimal core library
3. **Selective Plugin Imports**: Examples can now import individual plugins using `import 'crayon/plugins/plugin-name'`
4. **Plugin Registration**: Individual plugins register themselves when imported
5. **Vite Tree Shaking**: Vite automatically tree-shakes unused code during the build process

For example:
```typescript
// Selectively import only the plugins you need
import 'crayon/plugins/color-utilities' // Import and register only the color utilities plugin
import crayon from 'crayon/minimal'

console.log(crayon.hex('#FF0000')`This works`) // ✅ Available
// console.log(crayon.red`This won't work`) // ❌ Not available (unless core plugin is imported)
```

This approach enables true tree shaking where only the specific plugins needed are included in the build.

## Usage

1. Navigate to any of the example directories
2. Install dependencies: `pnpm install`
3. Build the package: `pnpm run build`
4. Test the build: `pnpm run test`

## Checking Build Sizes

After building each example, you can check the size of the generated files in the `dist/` directory to see the effect of tree shaking:

```bash
# Check the size of the core build
cd core && pnpm run build
ls -la dist/

# Check the size of the mixed build
cd ../mixed && pnpm run build
ls -la dist/

# Check the size of the minimal build (true tree shaking)
cd ../minimal && pnpm run build
ls -la dist/

# Check the size of the tree-shaking demo
cd ../tree-shaking-demo && pnpm run build
ls -la dist/
```

## Build Size Comparison

The current approach using selective plugin imports from the crayon package:

- **core-colors**: 23.2 KB (only core plugin)
- **color-utilities**: 15.4 KB (only color utilities plugin) - smallest due to minimal core!
- **modifiers**: 28.4 KB (only modifiers plugin)
- **mixed**: 35.9 KB (multiple plugins)
- **minimal**: 10.9 KB (hand-optimized selective imports)

This demonstrates how Crayon's architecture now works with modern build tools to enable true tree shaking and reduce bundle sizes by allowing consumers to import only the specific plugins they need.