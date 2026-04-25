import path from 'path';
import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => ({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('motion') || id.includes('framer-motion')) return 'motion-vendor';
          if (id.includes('lenis')) return 'lenis-vendor';
          if (id.includes('react-router')) return 'router-vendor';
          if (id.includes('lucide-react')) return 'icons-vendor';
          if (id.includes('/react/') || id.includes('react-dom')) return 'react-vendor';
          return undefined;
        },
      },
    },
  },
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    include: ['tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: ['**/e2e/**', '**/node_modules/**'],
  },
}));
