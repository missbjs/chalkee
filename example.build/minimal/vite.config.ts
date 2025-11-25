import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'index.ts'),
            name: 'CrayonMinimalApp',
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
            'chalkee/min': resolve(__dirname, '../../src/index.minimal.ts'),
            'chalkee/plugins/core': resolve(__dirname, '../../src/plugins/core.ts'),
            'chalkee/plugins/util': resolve(__dirname, '../../src/plugins/util.ts'),
            'chalkee/plugins/modifiers': resolve(__dirname, '../../src/plugins/modifiers.ts'),
            'chalkee/plugins/bg': resolve(__dirname, '../../src/plugins/bg.ts'),
            'chalkee/plugins/space': resolve(__dirname, '../../src/plugins/space.ts'),
            'chalkee/plugins/emoji': resolve(__dirname, '../../src/plugins/emoji.ts')
        }
    },
})