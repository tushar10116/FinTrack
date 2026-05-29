import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/FinTrack/',
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
     // '/api': 'https://fintrack-ph48.onrender.com/api/'
      '/api': 'http://localhost:4000/api/'
    },
    headers:{
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    }
  }
});
