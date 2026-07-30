/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        gold: 'var(--gold)',
        cream: 'var(--cream)',
        wine: 'var(--wine)',
        green: 'var(--green)',
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-poppins)', 'sans-serif'],
        button: ['var(--font-montserrat)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
