/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'nestora-bg': '#0B0F14',
        'nestora-bg2': '#11161C',
        'nestora-card': '#141A21',
        'nestora-gold': '#C9A24B',
        'nestora-gold-light': '#E2C275',
        'nestora-grey': '#B8BDC4',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
