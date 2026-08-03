/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			cream: {
  				DEFAULT: '#f2ece4',
  				dim: '#cfcac2'
  			},
  			ink: {
  				DEFAULT: '#0a0a0a',
  				deep: '#000000',
  				surface: '#111111'
  			},
  			vital: {
  				DEFAULT: '#7d000c',
  				bright: '#a8001a',
  				dim: '#3d0008'
  			},
  			ash: {
  				DEFAULT: '#8a8580',
  				dark: '#5a5550'
  			},
  			line: '#2a2a2a'
  		},
  		fontFamily: {
  			heading: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
  			body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
  			mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
