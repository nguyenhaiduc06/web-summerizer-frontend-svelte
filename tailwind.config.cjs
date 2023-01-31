/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primary: colors.red,
      },
      fontFamily: {
        sans: ["Inter", "san-serif"],
      },
      borderRadius: {
        DEFAULT: "5px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
