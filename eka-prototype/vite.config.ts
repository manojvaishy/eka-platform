import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    {
      name: 'copy-404',
      closeBundle() {
        // Copy index.html to 404.html for GitHub Pages SPA routing
        const outDir = resolve(__dirname, 'dist')
        copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
      }
    }
  ],
  server: {
    host: '0.0.0.0', // Allow access from network
    port: 5173,
  },
  base: '/eka-platform/', // GitHub Pages base path - updated
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
