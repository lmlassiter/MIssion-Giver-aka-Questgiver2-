/** @type {import('tailwindcss').Config} */
  module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        // Extend the default theme here, e.g.:
        colors: {
          'custom-blue': '#3252DF',
        },
      },
    },
    variants: {
      extend: {
        // Extend the default set of variants here, e.g.:
        opacity: ['disabled'],
      },
    },
    plugins: [
      // Add plugins here, if any
    ],
  }
  