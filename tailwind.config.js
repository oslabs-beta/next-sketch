/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mainBackgroundColor": '#edede9',
        "columnBackgroundColor": '#d6ccc2'
      }
    },
  },
  plugins: [],
}

