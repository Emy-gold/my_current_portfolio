/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        ink: '#050812',
        panel: '#0b1022',
        electric: '#2f80ff',
        cyanic: '#20e6ff',
        violetx: '#9b5cff',
      },
      boxShadow: {
        neon: '0 0 34px rgba(32, 230, 255, 0.28)',
        violet: '0 0 34px rgba(155, 92, 255, 0.25)',
      },
      backgroundImage: {
        grid:
          'linear-gradient(rgba(47,128,255,.11) 1px, transparent 1px), linear-gradient(90deg, rgba(47,128,255,.11) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
