module.exports = {
  purge: {
    enable: true,
    layers: ['components'],
    content: ['./src/**/*.{js,jsx}']
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active']
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
