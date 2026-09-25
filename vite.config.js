import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['a1-suppliers-logo.png'],
      manifest: {
        name: 'A/1 Suppliers — YEP / Y.A.E.P. · The Process',
        short_name: 'YEP Process',
        description: 'A/1 Suppliers YEP / Y.A.E.P. tablet experience — Supplying the Tools. Supporting the Hustle.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'any',
        background_color: '#0F2460',
        theme_color: '#0F2460',
        icons: [
          { src: '/a1-suppliers-logo.png', sizes: '308x303', type: 'image/png', purpose: 'any' },
          { src: '/a1-suppliers-logo.png', sizes: '308x303', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
  server: {
    port: 5176,
    strictPort: false,
  },
});
