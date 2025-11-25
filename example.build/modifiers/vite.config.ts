import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'CrayonModifiersExample',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`
    },
    rollupOptions: {
      external: [],
      output: {
        preserveModules: false,
      },
    },
    minify: false,
    sourcemap: true,
  },
  resolve: {
    alias: {
      'chalkee/minimal': resolve(__dirname, '../../src/index.minimal.ts'),
      'chalkee/plugins/core': resolve(__dirname, '../../src/plugins/core.ts'),
      'chalkee/plugins/color-utilities': resolve(__dirname, '../../src/plugins/color-utilities.ts'),
      'chalkee/plugins/modifiers': resolve(__dirname, '../../src/plugins/modifiers.ts'),
      'chalkee/plugins/bg-mode': resolve(__dirname, '../../src/plugins/bg-mode.ts'),
      'chalkee/plugins/space': resolve(__dirname, '../../src/plugins/space.ts'),
      'chalkee/plugins/emoji': resolve(__dirname, '../../src/plugins/emoji.ts')
    }
  }
})