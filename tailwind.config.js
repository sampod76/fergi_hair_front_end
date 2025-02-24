/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bgd: 'var(--bgd)',
        rootBg: 'var(--rootBg)',
        bgd2: 'var(--bgd2)',
        authBg: 'var(--authBg)',
        buttonBg: 'var(--buttonBg)',
        buttonTextColor: 'var(--buttonTextColor)',
        gtc: 'var(--gtc)',
      },
    },
  },
  plugins: [],
};
