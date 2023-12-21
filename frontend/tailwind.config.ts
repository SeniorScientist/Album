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
    container: {
      center: true,
      padding: '3rem',
      screns: {
        xs: '390px',
        sm: '576px',
        md: '960px',
        lg: '1440px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: {
          default: 'hsl(var(--input))',
          invalid: 'hsl(var(--input-invalid))',
        },
        background: 'hsl(var(--background))',
        button: {
          default: 'hsl(var(--button))',
          invalid: 'hsl(var(--button-invalid))',
        },
        card: {
          default: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        // 1rem = 16px
        mega: ['3.375rem', { lineHeight: '4.25rem', fontWeight: '400' }],
        button: ['0.875rem', { lineHeight: '1rem', fontWeight: '700' }],
        caption: ['0.75rem', { lineHeight: '1rem', fontWeight: '600' }],
      },
    },
    keyframes: {
      'accordion-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [animatePlugin],
} satisfies Config
