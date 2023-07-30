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
      },
      animation: {
        bounceIn: 'bounceIn .9s forwards'
      },
      keyframes: {
        bounceIn: {
          '0%, 20%, 40%, 60%, 80%, 100%': {
            animationTimingFunction: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
          },
          '0%': {
            opacity: '0',
            transform: 'scale(.3)',
          },
          '20%': {
            transform: 'scale(1.1)',
          },
          '40%': {
            transform: 'scale(.9)',
          },
          '60%': {
            opacity: '1',
            transform: 'scale(1.03)',
          },
          '80%': {
            transform: 'scale(.97)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      }
    },
  },
  plugins: [],
}

