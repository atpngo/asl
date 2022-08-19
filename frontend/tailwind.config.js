/** @type {import('tailwindcss').Config} */ 
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'sora': ['Sora', 'sans-serif'],
        'gallaudet': ['Gallaudet', 'sans-serif'],
      },
      colors: {
        green: {
          'module': '#8EF160',
          'header': '#30B700',
          'module-text': '#49B17F'
        }
      },
      fontSize: {
        '10xl': '10rem',
        '11xl': '12rem',
        '12xl': '14rem',
        '13xl': '16rem',
        '14xl': '18rem',
        '15xl': '20rem',
      },
    },
    
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [],
}