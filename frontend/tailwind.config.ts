/** @type {import('tailwindcss').Config} */
import { type Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import animatePlugin from 'tailwindcss-animate'

export default {
  content: [
    './index.html',
    './src/app/*.{ts,tsx}',
    './src/components/*.{ts,tsx}',
    './src/containers/*.{ts,tsx}',
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
        border: 'var(--border)',
        input: {
          DEFAULT: 'var(--primary))',
          hint: 'var(--primary-foreground)',
        },
        background: 'var(--background)',
        button: {
          DEFAULT: 'var(--primary)'
        },
        card: {
          DEFAULT: 'var(--card-foreground)'
        },
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)'
      },
      fontFamily: {
        inter: ['var(--font-inter)', ...defaultTheme.fontFamily.mono],
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        judson: ['var(--font-judson)', ...defaultTheme.fontFamily.mono]
      },
      fontSize: {
        mega: ['3.375rem', { lineHeight: '4.25rem', fontWeight: '400' }],
        button: ['0.875rem', { lineHeight: '1rem', fontWeight: '700' }],
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
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [animatePlugin],
} satisfies Config
