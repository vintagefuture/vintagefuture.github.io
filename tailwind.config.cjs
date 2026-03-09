/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Red color replaces the blue primary
        primary: {
          50: '#fef4f4',
          100: '#fde6e5',
          200: '#fbd1cf',
          300: '#f7adaa',
          400: '#f17d78',
          500: '#da524c', // Your base red
          600: '#c73c36',
          700: '#a72f2a',
          800: '#8a2a26',
          900: '#732724',
          950: '#3f1110',
        },
        // Complete black for secondary
        secondary: '#000000', 
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        anton: ['Anton', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};