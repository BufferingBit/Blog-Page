/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#1a202c',
        'dark-secondary': '#2d3748'
      }
    },
  },
  plugins: [],
};
