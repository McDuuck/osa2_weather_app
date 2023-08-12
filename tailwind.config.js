/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      'grey': '#374151',
      'white': '#ffffff',
      'black': '#000000'
    },
    extend: {
      backgroundColor: {
        'rainy': 'url(./weather_images/rain-transparent.gif)'
      }
    },
  },
  plugins: [],
}

