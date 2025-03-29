/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        "jeton-bg": "#f3f4f6",
        "jeton-text": "#1f2937",
        "jeton-hover": "#1e40af",
      },
    },
  },
  plugins: [],
};
