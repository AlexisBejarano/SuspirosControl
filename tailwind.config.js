export default {
    theme: {
      extend: {
        keyframes: {
          'scroll-left': {
            '0%': { transform: 'translateX(100%)' },
            '100%': { transform: 'translateX(-100%)' },
          },
        },
        animation: {
          'scroll-left': 'scroll-left 5s linear infinite',
        },
      },
    },
    plugins: [],
  };
  