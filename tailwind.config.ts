import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        /* Provide valid URLs or patterns for your background images */
        'grid-pattern': "url('/patterns/grid-pattern.png')",
        'grid-pattern-light': "url('/patterns/grid-pattern-light.png')",
      },
      borderColor: {
        /* Define the custom 'border' color using CSS variable */
        'border': 'var(--border)',
      },
      backgroundColor: {
        /* Define the custom 'background' color using CSS variable */
        'background': 'var(--background)',
        'card': 'var(--card)',
        'popover': 'var(--popover)',
        'muted': 'var(--muted)',
        'accent': 'var(--accent)',
      },
      textColor: {
        /* Define custom text colors using CSS variables */
        'foreground': 'var(--foreground)',
        'primary-foreground': 'var(--primary-foreground)',
        'secondary-foreground': 'var(--secondary-foreground)',
        'muted-foreground': 'var(--muted-foreground)',
        'accent-foreground': 'var(--accent-foreground)',
        'destructive-foreground': 'var(--destructive-foreground)',
        'brand-charcoal': 'var(--brand-charcoal)',
        'brand-dark-brown': 'var(--brand-dark-brown)',
        'brand-orange': 'var(--brand-orange)',
        'brand-brown': 'var(--brand-brown)',
        'brand-light-gray': 'var(--brand-light-gray)',
      },
      // You can extend other utilities as needed
    }
  },
  plugins: [],
}
export default config
