/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
"./src/**/*.{js,ts,jsx,tsx}",],
  darkMode: "class",  
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#fafafa",  // Clean white background
          secondary: "#e4e5f1", // Vibrant yellow for highlights
          tertiary: "#d2d3db",  // Bright blue for accents
          five: "#9394a5",  
          six: "#484b6a",  
        },
        dark: {
          primary: "#111827",
          secondary: "#1F2937",
          tertiary: "#172554",
        }
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

