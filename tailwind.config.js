const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  darkMode: "media",
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**"],
  theme: {
    extend: {
      colors: {
        slate: "#23272a",
        "warning-yellow": "#ffc107",
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [],
}
