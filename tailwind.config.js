/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
"./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: "#111827",
        secoundary: "#1F2937",
        tertiary: "#172554"
      }
    },
  },
  plugins: [],
  variants: {
    extend: {
      filter: ['responsive', 'hover'], // Enables filter variants
    },
  },
}

