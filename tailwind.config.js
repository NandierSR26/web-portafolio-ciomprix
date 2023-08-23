/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-primary': '#0C92CF',
        'blue-dark': '#111827',
        'dark-purple': '#191934',
        'light-gray': '#EBEBEB'
      }
    },
  },
  plugins: [],
}

