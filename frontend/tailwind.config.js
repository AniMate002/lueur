import daisyui from 'daisyui'
import tailwindscrollbar from 'tailwind-scrollbar'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
    tailwindscrollbar
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["sunset"],
          primary: "rgb(0,119,254)",
          secondary: "rgb(18,19,26)",
        },
      },
    ],
  },
}