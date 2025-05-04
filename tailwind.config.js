/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        'luxury-primary': '#7D2027',
        'luxury-gold': '#D4AF37',
        'luxury-blue': '#1A2C42',
        'luxury-green': '#3E8476',
        'luxury-lavender': '#C8A4D4',
        'luxury-black': '#121212',
        'luxury-text': '#6B7280',
        'luxury-red': '#EF4444',
        'luxury-background': '#FFFFFF',
      },
      fontFamily: {
        'luxury': ['Didot', 'serif'],
        'luxury-body': ['Garamond', 'serif'],
        'luxury-accents': ['Futura', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'luxury-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'luxury-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      spacing: {
        'luxury': '1.5rem',
        'luxury-lg': '2rem',
        'luxury-xl': '2.5rem',
      },
      borderRadius: {
        'luxury': '1rem',
        'luxury-lg': '1.5rem',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
}
