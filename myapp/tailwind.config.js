/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#32c5ff',
        secondary: '#ffa219',
        liteGray: '#9d9d9d',
        orange: '#1a2f52',
        mildOrange: '#f4743b'
      }
    },
  },
  plugins: [],
}
