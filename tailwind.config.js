/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7c3aed",
          light: "#9c69fd",
          dark: "#6423d1",
        },
        light: "#ffffeb",
        dark: {
          DEFAULT: "#1f2033",
          100: "#2e2f4a",
          200: "#3d3e61",
          300: "#4c4d78",
          400: "#5b5c90",
        },
        grey: {
          100: "#f3f3e0",
          200: "#e6e6d4",
          300: "#d9d9c8",
          400: "#c7c7b7",
        },
        "dark-bg": "#121219",
        "dark-surface": "#1e1e2c",
        "dark-text": "#f5f5f7",
        "dark-muted": "#9393a7",
        "dark-border": "#2d2d3a",
      },
      fontFamily: {
        primary: ['"DM Sans"', "sans-serif"],
        secondary: ['"Playfair Display"', "serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      borderRadius: {
        sm: "5px",
        md: "10px",
        lg: "20px",
        xl: "30px",
      },
      boxShadow: {
        small: "0 2px 8px rgba(31, 32, 51, 0.1)",
        medium: "0 5px 15px rgba(31, 32, 51, 0.15)",
        large: "0 10px 30px rgba(31, 32, 51, 0.2)",
      },
      transitionDuration: {
        fast: "300ms",
        medium: "500ms",
        slow: "800ms",
      },
    },
  },
  plugins: [],
};
