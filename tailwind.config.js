module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mjs}",
  ],
  theme: {
    extend: {},
  },
   plugins: [
    require('tailwind-scrollbar-hide')
    // ...
  ],
}
