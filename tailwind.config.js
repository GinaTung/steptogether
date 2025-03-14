import tailwindcssPrimeui from "tailwindcss-primeui";

export default {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  plugins: [tailwindcssPrimeui], // 如果你有使用 tailwindcssPrimeui
};