const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        grotesk: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
        unbounded: ['"Unbounded"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: '#101010',
          light: '#494949',
          dark: '#333333',
          graphite: '#1E1919',
        },
        text: {
          DEFAULT: '#F7F5F1',
          primary: '#D1D1D1',
          secondary: '#868686',
          coconut: '#F7F5F2',
        },
        accent: {
          light: '#0160FE',
          dark: '#3984FF',
        },
        success: '#00c853',
        warning: '#ffab00',
        error: '#d50000',
        dropbox: {
          zen: '#14C8EB',
          sunset: '#FA551E',
          tangerine: '#FF8C19',
          lime: '#B4DC19',
          cloud: '#B4C8E1',
          orchid: '#C8AFF0',
          pink: '#FFAFA5',
          banana: '#FAD24B',
          ocean: '#007891',
          crimson: '#9B0032',
          rust: '#BE4B0A',
          canopy: '#0F503C',
          navy: '#283750',
          plum: '#78286E',
          azalea: '#CD2F7B',
          gold: '#9B6400',
        }
      },
    },
  },
  plugins: [],
}

