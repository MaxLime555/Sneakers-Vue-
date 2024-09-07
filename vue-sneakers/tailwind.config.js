/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'mm': { 'max': '580px' },
      'sm': { 'max': '639px' },
      'md': { 'max': '767px' },
      'lg': { 'max': '1023px' },
      'xl': { 'max': '1279px' },
      '2xl': { 'max': '1535px' },
    },
  },
  plugins: [],
}

