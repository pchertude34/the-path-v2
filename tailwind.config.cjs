/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
      // alias color names incase we need to change them for the whole website
      primary: colors.green,
      secondary: colors.sky,
    },
    extend: {},
  },
  plugins: [],
};
