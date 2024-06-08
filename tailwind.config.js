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
        'darker-blue': '#000044', // Replace with your desired darker blue hex code
      },
      backgroundImage: {
        'dark-blue-gradient': 'linear-gradient(to bottom, #00319D, #ffffff)', // Replace #000044 with your desired darker blue
        'my-image': "url('/static/bg-gradient-3.59c4d2e.webp')", // Replace '/path/to/your/image.jpg' with the actual path to your image
      },
    }
  },
  plugins: [],
}