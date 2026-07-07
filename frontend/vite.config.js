import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://janconnect-bre5.onrender.com',
        changeOrigin: true,
        secure: false
      },
      '/oauth2': {
        target: 'https://janconnect-bre5.onrender.com',
        changeOrigin: true,
        secure: false
      },
      '/login': {
        target: 'https://janconnect-bre5.onrender.com',
        changeOrigin: true,
        secure: false
      },
      '/feedback': {
        target: 'https://janconnect-bre5.onrender.com',
        changeOrigin: true,
        secure: false
      },
      '/vote': {
        target: 'https://janconnect-bre5.onrender.com',
        changeOrigin: true,
        secure: false
      },
      '/comments': {
        target: 'https://janconnect-bre5.onrender.com',
        changeOrigin: true,
        secure: false
      },
      '/admin': {
        target: 'https://janconnect-bre5.onrender.com',
        changeOrigin: true
      },
      '/messages': {
        target: 'https://janconnect-bre5.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
