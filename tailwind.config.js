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
        "slate-light": "#31363b",
        "warning-yellow": "#ffc107",
        red: {
          550: "#FF0000",
        },
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [require("tailwind-caret-color")()],
}
