import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*/*.{js,ts,jsx,tsx,mdx}',
    './src/assets/icons/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        jumpDots: {
          '0%, 57.14%': {
            animationTimingFunction: 'cubicBezier(0.33,0.66,0.66,1)',
            transform: 'translate(0)',
          },
          '28.57%': {
            animationTimingFunction: 'cubicBezier(0.33,0,0.66,0.33)',
            transform: 'translateY(-6px)',
          },
          '100%': {
            transform: 'translate(0)',
          },
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        nunito: ['var(--font-nunito)'],
      },
      colors: {
        primary: '#4CB8B8',
        'primary-dark': '#038992',
        'primary-darker': '#007279',
        'primary-disabled': '#99CFD2',
        'primary-light': '#EDFCFD',
        'primary-border': '#E4F2F3',
        'primary-text': '#101623',
        secondary: '#0D2D53',
        'dark-gray': '#7A7979',
        gray: '#A1A8B0',
        'gray-light': '#E5E7EB',
        'gray-lighter': '#E7EEEE',
        'gray-cart': '#ADADAD',
        'gray-soft': '#F2F5FA',
        light: '#FDFDFD',
        dark: '#221F1F',
        darker: '#0E1422',
        'white-fa': '#FAFAFA',
        'white-fe': '#FEFEFE',
        danger: '#E02D3C',
        'danger-light': '#FCEBEB',
        blue: '#358BDA',
        'blue-light': '#E8F0FF',
        green: '#17AA26',
        'green-light': '#DCFFE6',
        warning: '#DF9402',
        'warning-light': '#FFF2DB',
      },
    },
  },
  plugins: [],
};
export default config;
