import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: { port: 3000 },
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
});
