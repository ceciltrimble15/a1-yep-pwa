/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        a1: {
          blue: '#1A3A8F',
          'blue-light': '#2A4EAF',
          'blue-dark': '#0F2460',
          white: '#FFFFFF',
          surface: '#F0F2F7',
          silver: '#B0B8C8',
          'silver-light': '#D4DAE6',
          text: '#1A1A2E',
          'text-secondary': '#4A5068',
          success: '#1B7A3D',
          alert: '#C4421A',
          gold: '#D4A017',
        },
      },
      boxShadow: {
        card: '0 4px 24px rgba(26, 58, 143, 0.08), 0 1px 3px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 32px rgba(26, 58, 143, 0.12), 0 2px 6px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        card: '16px',
      },
    },
  },
  plugins: [],
};
