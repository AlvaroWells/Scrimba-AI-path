// frontend/vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // Configuración básica
  server: {
    port: 5173, // El puerto que usa Vite por defecto
  },
  // Opcional: Configura alias para imports
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});