/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-night-200",
    "bg-night-900",
    "text-Orange-primary",
    "text-Orange-secondary",
    "text-Yellow-primary",
    "text-Yellow-secondary",
    "text-Green-primary",
    "text-Green-secondary",
    "text-Blue-primary",
    "text-Blue-secondary",
    "text-Purple-primary",
    "text-Purple-secondary",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          200: "#4C78D0",
          900: "#263C68",
        },
        Purple: {
          primary: "#D959D6",
          secondary: "#E59AE3",
        },
        Orange: {
          primary: "#FF973E",
          secondary: "#FFBE43",
        },
        Yellow: {
          primary: "#FFDA14",
          secondary: "#FFF09F",
        },
        Green: {
          primary: "#89D938",
          secondary: "#B0E25F",
        },
        Blue: {
          primary: "#55E2E8",
          secondary: "#A0FBFE",
        },
      }
    },
  },
  daisyui: {
    themes: ["night"],
  },
  plugins: [
    require('daisyui'),
  ],
};
