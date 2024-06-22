/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./dist/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'black-second': '#bdbdbd2b',
        'black-third' : '#7d7c7c2b',
        'fr-300' : '1fr 300px'
      },
      fontFamily: {
        'Playfair' : ["Playfair Display", "serif"]
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    function ({ addUtilities }) {
      addUtilities({
        '.contain-paint': {
          contain: 'paint',
        },
      })
    }
  ],
  safelist: [
    'bg-pink-200',
    'bg-violet-200',
    'bg-orange-200',
    'bg-red-200',
    
  ]
}
