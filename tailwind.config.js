const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#4D2952",
        "secondary": "#5F6C72",
        "border": "#C4C4C4",
        "text": "#fff",
        "text-secondary": "#383838",


       
      },
      fontFamily: {
        publicsan: ["Public Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    flowbite.plugin(),
  ]
}

