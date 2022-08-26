/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        base: ['Roboto', 'Noto Sans JP', '游ゴシック', 'YuGothic', 'ヒラギノ角ゴ Pro W3', 'Hiragino Kaku Gothic Pro', 'メイリオ', 'Meiryo', 'ＭＳ Ｐゴシック', 'MS PGothic', 'sans-serif'],
      },
      animation: {
        fade: 'fade 1s ease-in forwards',
        fadeIn: 'fadeIn 1s ease-in forwards',
        dropdown: 'dropdown 0.3s ease-in forwards',
        slideIn: 'slideIn 0.2s ease-out forwards',
        zoomIn: 'zoomIn 0.2s ease-in forwards',
      },
      keyframes: {
        fade: {
          '0%': {
            opacity: 0,
            transform: 'translateY(60px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: 0,
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        dropdown: {
          '0%': {
            transform: 'translateY(-100%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        slideIn: {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        zoomIn: {
          '0%': {
            transform: 'translateY(-4rem) scale(0)',
          },
          '100%': {
            transform: 'translateY(0) scale(1)',
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
