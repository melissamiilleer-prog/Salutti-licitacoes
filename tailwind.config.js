/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta extraída de styles.css do site institucional — não alterar sem
        // atualizar também o site estático, para manter as duas frentes consistentes.
        forest: {
          DEFAULT: '#0B5C3C',
          deep: '#073F29',
          mist: '#E7F0EA',
        },
        mint: '#7FD9AC',
        brass: {
          DEFAULT: '#A9822F',
          light: '#C79C42',
          pale: '#F1E4C4',
        },
        charcoal: {
          DEFAULT: '#16211B',
          2: '#1E2B23',
          3: '#26362C',
        },
        paper: {
          DEFAULT: '#F7F4EC',
          2: '#EFEADA',
        },
        ink: {
          DEFAULT: '#17231C',
          soft: '#4A5A50',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Source Sans 3"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 2px 8px rgba(15,25,18,0.06)',
        card: '0 12px 32px rgba(15,25,18,0.14)',
      },
    },
  },
  plugins: [],
}
