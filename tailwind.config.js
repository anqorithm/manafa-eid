/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cairo': ['Cairo', 'sans-serif'],
        'neueplak': ['NeuePlak', 'sans-serif'],
      },
      colors: {
        'darker-blue': '#000044',
      },
      backgroundImage: {
        'dark-blue-gradient': 'linear-gradient(to bottom, #00319D, #ffffff)',
        'my-image': "url('/static/bg-gradient-3.59c4d2e.webp')",
      },
    }
  },
  plugins: [],
}