/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        surface: {
          DEFAULT: 'rgb(var(--surface-rgb) / <alpha-value>)',
          alt: 'rgb(var(--surface-alt-rgb) / <alpha-value>)',
          raised: 'var(--bg-tertiary)',
          elevated: 'var(--bg-elevated)',
        },
        foreground: {
          DEFAULT: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
        },
        overlay: {
          2: 'var(--overlay-2)',
          4: 'var(--overlay-4)',
          6: 'var(--overlay-6)',
          8: 'var(--overlay-8)',
          10: 'var(--overlay-10)',
        },
      },
      borderColor: {
        subtle: 'var(--border-subtle)',
        muted: 'var(--border-default)',
        strong: 'var(--border-strong)',
      },
    },
  },
  plugins: [],
}
