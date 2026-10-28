import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': resolve(import.meta.dirname, 'src') },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
