/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        logo: ['Dela Gothic One'],
        base: ['Noto Sans JP', 'Roboto', '游ゴシック', 'YuGothic', 'ヒラギノ角ゴ Pro W3', 'Hiragino Kaku Gothic Pro', 'メイリオ', 'Meiryo', 'ＭＳ Ｐゴシック', 'MS PGothic', 'sans-serif'],
      },
      animation: {
        fade: 'fade 1s ease-in forwards',
      },
      keyframes: {
        fade: {
          '0%': {
            opacity: 0,
            transform: "translateY(60px)",
          },
          '100%': {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  variants: {
    animation: ['motion-safe'],
  },
  plugins: [require('@tailwindcss/forms')],
}
