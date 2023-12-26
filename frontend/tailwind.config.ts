/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
import animatePlugin from 'tailwindcss-animate'

const twConfig = {
  content: [
    './index.html',
    '/src/pages/*.{ts, tsx}',
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/layouts/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '390px',
        sm: '576px',
        md: '960px',
        lg: '1440px',
      },
      colors: {
        border: 'var(--primary)',
        label: 'var(--primary)',
        input: {
          default: 'var(--input-background))',
          hint: 'var(--primary-foreground)',
        },
        background: 'var(--background)',
        button: {
          default: 'var(--primary)',
          text: 'var(--secondary)'
        },
        card: {
          default: 'var(--card-foreground)',
        },
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
      },
      fontFamily: {
        inter: ['var(--font-inter)', ...defaultTheme.fontFamily.mono],
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        judson: ['var(--font-judson)', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        mega: ['3.375rem', { lineHeight: '4.25rem', fontWeight: '400' }],
        button: ['0.875rem', { lineHeight: '1rem', fontWeight: '700' }],
        input: ['1.125rem', { lineHeight: '1.375rem', fontWeight: '400' }],
        caption: ['0.75rem', { lineHeight: '1rem', fontWeight: '600' }],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
    },
  },
  plugins: [animatePlugin],
}

export default twConfig
