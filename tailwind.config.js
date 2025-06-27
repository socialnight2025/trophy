const tailwindcss = require('tailwindcss');

module.exports = {
  // ...existing config...
  theme: {
    extend: {
      keyframes: {
        'sakura-fall': {
          '0%': { transform: 'translateY(-100px) translateX(0) rotate(0deg)' },
          '50%': { transform: 'translateY(50vh) translateX(var(--sway, 12px)) rotate(10deg)' },
          '100%': { transform: 'translateY(100vh) translateX(0) rotate(0deg)' },
        },
      },
      animation: {
        'sakura-fall': 'sakura-fall linear infinite',
      },
    },
  },
  // ...existing config...
};