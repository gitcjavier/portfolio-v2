/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream:     '#FFF8F0',
        coral:     '#FF6B6B',
        ocean:     '#4A90D9',
        mint:      '#4ECDC4',
        sunflower: '#F7DC6F',
        plum:      '#9B59B6',
        charcoal:  '#2D2D2D',
        slate:     '#5A5A5A',
        blush:     '#FFE8E8',
        sky:       '#E8F4FD',
        lavender:  '#F0E6FF',
      },
      fontFamily: {
        sans: ['Onest', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display:    ['clamp(3rem, 8vw, 6rem)',   { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        heading:    ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        subheading: ['clamp(1.25rem, 3vw, 1.75rem)', { lineHeight: '1.3' }],
      },
      screens: {
        xs:   '375px',
        sm:   '640px',
        md:   '768px',
        lg:   '1024px',
        xl:   '1280px',
        '2xl':'1536px',
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'float':   'float 6s ease-in-out infinite',
        'bounce-in': 'bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-12px) rotate(2deg)' },
          '66%':      { transform: 'translateY(6px) rotate(-1deg)' },
        },
        'bounce-in': {
          '0%':   { opacity: '0', transform: 'scale(0.3)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
