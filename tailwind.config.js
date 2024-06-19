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
        'black-third' : '#7d7c7c2b'
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
