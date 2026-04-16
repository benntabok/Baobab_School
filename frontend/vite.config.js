import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  server: {
    proxy: {
      '/api/piston': {
        target: 'https://emkc.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/piston/, '/api/v2/piston'),
      },
    },
  },
})