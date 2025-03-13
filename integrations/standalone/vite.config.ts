import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: { outDir: 'build', chunkSizeWarningLimit: 5000, rollupOptions: { input: { index: './index.html', mock: './mock.html' } } },
  server: { port: 3000 },
  resolve: {
    alias: {
      '@axonivy/log-view': resolve(__dirname, '../../packages/view/src'),
      '@axonivy/log-view-protocol': resolve(__dirname, '../../packages/protocol/src'),
      '@axonivy/log-view-core': resolve(__dirname, '../../packages/core/src')
    }
  },
  base: './'
});
