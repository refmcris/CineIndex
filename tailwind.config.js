/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#221511",
        secondary: "#482c23",
        accent: "#ee5c2b",
        text: {
          primary: "#ffffff",
          secondary: "#c9a092"
        }
      }
    }
  },
  plugins: [require("tailwind-scrollbar-hide")]
};
