/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // mode: 'production',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase', // JS에서 camelCase로 접근 가능
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/_variables.scss";`,
      },
    },
  },
});
