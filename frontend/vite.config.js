import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
    '/users': { target: 'http://localhost:3000' },
    '/auth': { target: 'http://localhost:3000' },
    '/forgot': { target: 'http://localhost:3000' },
    '/entry': { target: 'http://localhost:3001' },
    '/quote': { target: 'http://localhost:3002' },
    '/analysis': { target: 'http://localhost:3003' }
    }
  }
})