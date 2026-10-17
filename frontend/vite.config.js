import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    // Vite 5.4+ blocks unknown hosts by default; allow all in preview mode
    ...(process.env.BASE44_PREVIEW_MODE === '1' ? { allowedHosts: true } : {}),
    proxy: {
      '/api': {
        target: 'http://api:8000',
        changeOrigin: true,
      },
    },
  },
})
