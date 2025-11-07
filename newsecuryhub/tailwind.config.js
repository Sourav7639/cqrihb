/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f6ff',
          100: '#dbe8ff',
          200: '#b7d0ff',
          300: '#8bb2ff',
          400: '#5d90ff',
          500: '#356dff',
          600: '#1e53e6',
          700: '#133ec2',
          800: '#133297',
          900: '#142c78'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
