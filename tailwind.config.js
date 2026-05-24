/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: '#050714',
      },
    
      boxShadow: {
        glow: '0 8px 30px rgba(139,92,246,0.35)', 
        'glow-lg': '0 8px 40px rgba(139,92,246,0.6)', 
      },

    },
  },
  plugins: [],
}