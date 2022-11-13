const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "display": ["Newake",  ...fontFamily.sans],
        "sans": ['var(--font-kanit)', ...fontFamily.sans]
      }
    },
  },
  plugins: [],
}
