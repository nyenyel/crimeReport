const { addIconSelectors, addDynamicIconSelectors  } = require('@iconify/tailwind');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'prc': '#000F2D',
        'src': '#920303',
        'dw': '#E4E4E4',
        'text': '#3A3A3A',
        'sec-text': '#E4E4E4'
      }
    },
  },
  plugins: [
    addDynamicIconSelectors(),
    addIconSelectors([
      'mdi', 
      'mdi-light', 
      'iconamoon',
      'mage',
      'ph',
      'solar',
      'fa',
      'heroicons',
      'majesticons',
      'icon-park-solid'
    ]),
  ],
}