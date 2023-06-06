import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 4000,
    // fs: {
    //   strict: true,
    //   allow: ['..'] // Adjust this array to include the desired folder or file paths
    // }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
    // alias: {
    //   '@': path.resolve(__dirname, '/src'),
    //   '~styles': path.resolve(__dirname, '/src/styles')
    // }
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       // additionalData: `@import "./src/assets/variables.scss";`
  //     }
  //   }
  // },
})
