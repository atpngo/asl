/** @type {import('tailwindcss').Config} */ 
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'sora': ['Sora', 'sans-serif']
      },
      colors: {
        green: {
          'module': '#8EF160',
          'header': '#30B700',
          'module-text': '#49B17F'
        }
      }
    },
    
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [],
}