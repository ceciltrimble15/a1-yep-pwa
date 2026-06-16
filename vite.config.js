import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png'],
      manifest: {
        name: 'A/1 YEP — Young Entrepreneurs Process',
        short_name: 'A/1 YEP',
        description: 'Always Forward. Never Back. Train your process. Become a FINISHER.',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#1A3A8F',
        theme_color: '#1A3A8F',
        icons: [
          { src: '/logo.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/logo.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
    }),
  ],
  server: {
    port: 5176,
    strictPort: false,
  },
});
