/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // colors: {
    //   green: "66ccff",
    // },
    extend: {
      keyframes: {
        scale: {
          form: { transform: "scale(1.0)" },
          to: { transform: "scale(1.1)" },
        },
      },
      animation: {
        scale: "scale 2s alternate ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
