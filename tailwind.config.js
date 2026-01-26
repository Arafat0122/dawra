/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Based on your logo colors
        brand: {
          blue: '#31A9E0',      // From logo
          green: '#82BC24',     // From logo
          navy: '#0F4C75',      // Deep version for contrast/headings
          light: '#F4F9FC',     // Very soft blue for backgrounds
          dark: '#1B262C',      // Almost black for main text readability
        }
      },
      fontFamily: {
        // 'Inter' is the gold standard for clean, modern websites
        sans: ['Inter', 'system-ui', 'sans-serif'],
        // 'Lexend' is great for readability and feels very friendly
        heading: ['Lexend', 'sans-serif'],
      },
    },
  },
  plugins: [],
}