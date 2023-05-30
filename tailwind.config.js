/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,scss}',
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
