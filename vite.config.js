import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/spanish_words_frontend/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // To make requests for the local user
    // proxy: {
    //   '/api': {
    //     // Local
    //     // target: 'http://127.0.0.1:8000',
    //     // PROD
    //     target: 'https://spanish-words-backend.vercel.app/',
    //     changeOrigin: true
    //   }
    // }
  }
})
