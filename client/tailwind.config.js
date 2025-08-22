/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Libertinus Sans', 'sans-serif'],
        dancing: ['Dancing Script', 'cursive'],
      },
      colors: {
        primary: "#2f273f",
        secondary: "#8054c1",
        btnSubmit: "#00D953",
        btnSubmitHover: "#00B947",
        btnReset: "#E82727",
        btnResetHover: "#D60F0F"
      }
    },
  },
  plugins: [],
}
