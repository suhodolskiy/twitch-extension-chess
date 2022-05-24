import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        panel: resolve(__dirname, 'src/views/panel/index.html'),
        config: resolve(__dirname, 'src/views/config/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [require('postcss-extend')],
    },
  },
})
