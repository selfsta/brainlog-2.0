import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
    '/users': { target: 'http://localhost:3000' },
    '/auth': { target: 'http://localhost:3000' }
    }
  }
})