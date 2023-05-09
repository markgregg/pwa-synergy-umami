import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import EsLint from 'vite-plugin-linter'
import tsConfigPaths from 'vite-tsconfig-paths'
const { EsLinter, linterPlugin } = EsLint

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    react(),
    tsConfigPaths(),
    linterPlugin({
      include: ['./src}/**/*.{ts,tsx}'],
      linters: [new EsLinter({ configEnv })],
    }),
    dts({
      insertTypesEntry: true,
    })
  ],
  build: {
    lib: {
      entry: resolve('src', 'index.ts'),
      name: 'pwa-synergy-umami',
      formats: ['es', 'umd'],
      fileName: (format) => `pwa-synergy-umami.${format}.js`,
    },
    rollupOptions: {
    },
  },
}))