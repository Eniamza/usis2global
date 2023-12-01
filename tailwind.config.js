/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  variants: {
    fill: ['hover', 'focus'], // this line enables hover and focus variants for fill utility
  },
  plugins: [],
}

