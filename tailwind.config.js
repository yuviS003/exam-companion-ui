/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  currentTheme: {
    extend: {
      color: {
        prPurple: "#4338CA",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
