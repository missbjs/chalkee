# Crayon Benchmark Suite

This folder contains benchmark scripts to measure and compare the performance and bundle sizes of different Crayon builds.

## Available Benchmarks

### Build Size Comparison
- **benchmark-sizes.mjs**: Measures and compares the bundle sizes of different build configurations
  - minimal: Truly minimal build with no plugins
  - core: Only core colors plugin
  - modifiers: Only modifiers plugin
  - color-utilities: Only color utilities plugin
  - mixed: Multiple plugins (core, util, modifiers)

## How to Run

```bash
# Run size comparison benchmark
cd bench
node benchmark-sizes.mjs
```

## Results Interpretation

Smaller bundle sizes indicate better tree-shaking and more efficient selective imports. The benchmark helps verify that:
1. Each plugin can be imported independently
2. Tree-shaking works correctly to exclude unused code
3. The minimal build is indeed minimal
4. Mixed builds only include the plugins they actually use

## Example Build Configurations

The `example.build` folder contains various build configurations that demonstrate different ways to use Crayon:
- **minimal**: No plugins imported by default
- **core**: Only core colors plugin
- **color-utilities**: Only color utilities plugin
- **modifiers**: Only modifiers plugin
- **mixed**: Multiple plugins combined