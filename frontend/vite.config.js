import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/leaflet-starter/',
  plugins: [react()],
  server:{
    proxy:{
      '/api':'https://btc6-solo-nmap.onrender.com/'
    }
  }
})
