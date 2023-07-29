/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        main: '0px -3px 22px 0px rgba(0, 0, 0, 0.35)'
      },
      colors: {
        darkGray: '#1E1F28',
        normalGray: '#2b2b37',
        mediumGray: '#373745',
        lightGray: '#8b8d9b'
      },
      backgroundImage: {
        buttonGradient: 'linear-gradient(90deg, #8323FF 0%, #FF2DAF 100%)'
      },
      dropShadow: {
        star: '0px 0px 14.407779693603516px rgba(254, 234, 53, 0.25)'
      }
    },
  },
  plugins: [],
}

