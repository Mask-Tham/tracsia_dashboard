/** @type {import('tailwindcss').Config} */

// const themeStyle = require('./themeStyle')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false,
  },
  prefix: 'tw-',
  darkMode: 'class',
  theme: {
    // colors: {
    //   primary: themeStyle.themes.light.primary,
    //   accent: themeStyle.themes.light.accent,
    //   secondary: themeStyle.themes.light.secondary,
    //   success: themeStyle.themes.light.success,
    //   info: themeStyle.themes.light.info,
    //   warning: themeStyle.themes.light.warning,
    //   error: themeStyle.themes.light.error,
    //   third: themeStyle.themes.light.third,
    // },
    extend: {},
  },
  plugins: [],
}
