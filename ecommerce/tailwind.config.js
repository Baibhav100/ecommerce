/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Ensure this includes your component files
    ],
    theme: {
      extend: {},
    },
    plugins: [require("daisyui")], // Add DaisyUI plugin
  };
  