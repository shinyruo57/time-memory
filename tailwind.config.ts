import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ios-bg': '#F2F2F7',
        'ios-card': '#FFFFFF',
        'text-primary': '#1C1C1E',
        'text-secondary': '#8E8E93',
        'text-tertiary': '#C7C7CC',
        separator: '#E5E5EA',
        accent: '#FF6B6B',
        'accent-warm': '#FFB347',
        success: '#34C759',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"PingFang SC"', '"Helvetica Neue"', 'sans-serif'],
      },
      fontSize: {
        'h1': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'h2': ['20px', { lineHeight: '1.35', fontWeight: '600' }],
        'h3': ['17px', { lineHeight: '1.4', fontWeight: '500' }],
        'body': ['15px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['13px', { lineHeight: '1.4', fontWeight: '400' }],
        'small': ['11px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0,0,0,0.06)',
        'float': '0 4px 24px rgba(0,0,0,0.10)',
        'accent': '0 4px 16px rgba(255,107,107,0.25)',
      },
      spacing: {
        '0.5': '2px',
      },
      maxWidth: {
        'mobile': '430px',
      },
      animation: {
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
