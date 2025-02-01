import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow external access
    port: 5173, // Default Vite port (change if needed)
    strictPort: true, // Ensures Vite uses this exact port
  }
})
