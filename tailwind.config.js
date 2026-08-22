/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        surface: '#111111',
        elevated: '#1A1A1A',
        acid: '#C4FF00',
        'acid-hover': '#D4FF33',
        'acid-muted': 'rgba(196, 255, 0, 0.1)',
        bone: '#F6F5F2',
        ash: '#E2DFD8',
        smoke: '#8A8A8A',
        borders: 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-acid': '0 0 20px rgba(196,255,0,0.15), 0 0 60px rgba(196,255,0,0.05)',
      },
      animation: {
        'marquee-slow': 'marquee 45s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
