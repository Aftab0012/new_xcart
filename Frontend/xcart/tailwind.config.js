/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customPurple: "#000000",
        customBlue: "#007BFF",
        customGray: "#F5F5F5",
        customGrayForText: "#333333",
        charcoalGray: "#441144",
        staleGray: "#708090",
        hoverColor: "#CCCCCC",
        animation: {
          "underline-animation": "underline-animation 0.3s ease-in-out",
        },
      },
    },
  },
  plugins: [],
};
