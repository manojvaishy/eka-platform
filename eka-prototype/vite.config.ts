import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
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
