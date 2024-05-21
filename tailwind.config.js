/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    extend: {
      // gridTemplateRows: {
      //   "3": "repeat(minmax(3, 60px))",
      // },
      colors: {
        primaryColor: "#68B0AB",
        secondaryColor: "#8FC0A9",
        thirdColor: "#C8D5B9",
        fourthColor: "#FAF3DD",
        background: "#2F2F2F",
      },
      screens: {
        "2xl": "1320px",
      },
    },
  },
  plugins: [],
};
