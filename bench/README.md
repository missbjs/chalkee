# Chalkee Benchmark Suite

This folder contains benchmark scripts to measure and compare the performance and bundle sizes of different Chalkee builds.

## Available Benchmarks

### Performance Comparison
- **benchmark-comparison.mjs**: Runs performance benchmarks comparing Chalkee with Chalk and ansi-colors
  - Simple color operations
  - Chained color operations
  - Complex multi-level chaining
  - Template literal operations

### Performance Analysis
- **benchmark-performance.mjs**: Analyzes API performance characteristics
  - Measures property access performance
  - Tests function call overhead
  - Compares chaining efficiency

## How to Run

```bash
# Run performance comparison benchmark
cd bench
node benchmark-comparison.mjs

# Run performance analysis
node benchmark-performance.mjs
```

## Results Interpretation

The performance benchmarks help verify:
1. Chalkee's performance compared to other libraries
2. Chaining efficiency and overhead
3. Template literal support performance
4. API method call performance

Smaller benchmark times indicate better performance. The comparison includes established libraries like Chalk and ansi-colors.

## Benchmark Overview

The test files compare three libraries:
- **Chalkee**: The new implementation with plugin architecture and template literal support
- **Chalk**: A popular existing library for comparison
- **ansi-colors**: Another popular ANSI coloring library for comparison

Test scenarios include:
1. **Simple color**: Basic color application
2. **Chained colors**: Property chaining (e.g., `.red.bold`)
3. **Complex chaining**: Multi-level property access
4. **Template literals**: Tagged template literal usage (Chalkee-specific)