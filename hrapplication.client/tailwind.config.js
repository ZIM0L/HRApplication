/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
       screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
       },
      extend: {
          colors: {
              'cyan-blue': '#08D9D6',
              'dark-blue': '#16191F',
              'light-red': '#FF2E63',
              'grey-white': '#EAEAEA',
            },
            fontFamily: {
                custom: ['Kanit', 'Kanit-SemiBold', 'Kanit-Bold']
            }
      },
  },
  plugins: [],
}

