import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'index.ts'),
            name: 'CrayonSelectiveImportApp',
            formats: ['es', 'cjs'],
            fileName: (format) => {
                if (format === 'es') return 'index.mjs'
                if (format === 'cjs') return 'index.cjs'
                return `index.${format}.js`
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
    resolve: {
        alias: {
            'chalkee': resolve(__dirname, '../../dist/index.mjs'),
            'chalkee/minimal': resolve(__dirname, '../../src/index.minimal.ts'),
            'chalkee/plugins/core': resolve(__dirname, '../../src/plugins/core.ts'),
            'chalkee/plugins/color-utilities': resolve(__dirname, '../../src/plugins/color-utilities.ts'),
            'chalkee/plugins/modifiers': resolve(__dirname, '../../src/plugins/modifiers.ts'),
            'chalkee/plugins/bg-mode': resolve(__dirname, '../../src/plugins/bg-mode.ts'),
            'chalkee/plugins/space': resolve(__dirname, '../../src/plugins/space.ts'),
            'chalkee/plugins/emoji': resolve(__dirname, '../../src/plugins/emoji.ts')
        }
    },
})