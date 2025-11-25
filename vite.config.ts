import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { readdirSync } from 'fs'

// Get all plugin files
const pluginFiles = readdirSync(resolve(__dirname, 'src/plugins'))
  .filter(file => file.endsWith('.ts') && !file.endsWith('.test.ts'))
  .map(file => file.replace('.ts', ''))

export default defineConfig({
  plugins: [
    dts({
      include: ['src/**/*'],
      exclude: ['**/*.test.ts'],
      outDir: 'dist',
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'index.full': resolve(__dirname, 'src/index.full.ts'),
        'index.minimal': resolve(__dirname, 'src/index.minimal.ts'),
        // Add all plugins as separate entry points
        ...Object.fromEntries(
          pluginFiles.map(plugin => [
            `plugins/${plugin}`,
            resolve(__dirname, 'src/plugins', `${plugin}.ts`)
          ])
        )
      },
      name: 'Crayon',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        if (format === 'es') return `${entryName}.mjs`
        if (format === 'cjs') return `${entryName}.cjs`
        return `${entryName}.${format}.js`
      },
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
  ssr: {
    noExternal: ['util'],
  },
})