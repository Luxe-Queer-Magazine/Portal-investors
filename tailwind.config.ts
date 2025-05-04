import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'wine': '#7D2027',
        'midnight': '#1A2C42',
        'verdigris': '#3E8476',
        'gold': '#D4AF37',
        'lavender': '#C8A4D4',
        'matte-black': '#121212',
      },
      fontFamily: {
        'serif': ['Didot', 'serif'],
        'sans': ['Futura', 'sans-serif'],
        'body': ['Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config