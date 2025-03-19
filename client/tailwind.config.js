/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html" , "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar-hide"),

    // 'green:' 클래스를 지원하도록 추가
    function ({ addVariant }) {
      addVariant('green', ['.green &']);
    }
  ],
  darkMode: 'class',
}