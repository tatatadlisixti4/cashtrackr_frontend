import type {Config} from "tailwindcss"
import forms from "@tailwindcss/forms"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "auth": "url('/grafico.svg')",
      },
      backgroundSize: {
        "30": "30rem"
      }
    },
  },
  plugins: [
    forms
  ],
};
export default config; 
