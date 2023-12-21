/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/app/*.{ts,tsx}',
    './src/components/*.{ts,tsx}',
    './src/containers/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '390px',
        sm: '576px',
        md: '960px',
        lg: '1440px',
      },
      colors: {},
    },
  },
  plugins: [],
}
