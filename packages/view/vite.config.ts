import { resolve } from 'path';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [visualizer(), react(), dts({ tsconfigPath: './tsconfig.production.json' })],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  esbuild: {
    sourcemap: 'inline'
  },
  build: {
    outDir: 'lib',
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'view',
      formats: ['es']
    },
    rollupOptions: {
      external: [
        '@axonivy/ui-components',
        '@axonivy/ui-icons',
        '@dnd-kit/core',
        '@tanstack/react-query',
        '@tanstack/react-query-devtools',
        'i18next',
        'react-i18next',
        'react',
        'react-error-boundary',
        'react/jsx-runtime',
        'react-dom'
      ]
    }
  }
});
