import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('/public/img/walls.jpeg')",
      },
      fontFamily: {
        main: ['Fredoka', 'sans-serif'],
        additional: ['Bebas Neue', 'sans-serif'],
      },
      colors: {
        'green-custom': '#90EE90',
        'yellow-custom': '#f0e14a',
        'crimson-custom': '#e4a788',
        'green-grey-custom': '#90b493',
      },
    },
  },
  plugins: [],
};
export default config;
