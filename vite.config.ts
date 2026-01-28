import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        // We can add more entry points here for selective imports
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        if (format === 'es') {
          return `${entryName}.mjs`
        }
        return `${entryName}.cjs`
      }
    },
    rollupOptions: {
      // Don't externalize util to ensure custom inspect symbol is available
      external: [],
      output: {
        preserveModules: true,
      }
    },
    sourcemap: true,
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
})