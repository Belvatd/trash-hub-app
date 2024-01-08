import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        gray25: "#FCFCFD",
        gray50: "#F9FAFB",
        gray100: "#F2F4F7",
        gray200: "#EAECF0",
        gray300: "#D0D5DD",
        gray400: "#98A2B3",
        gray500: "#667085",
        gray600: "#475467",
        gray700: "#344054",
        gray800: "#1D2939",
        gray900: "#101828",
        brand25: "#F7FDFA",
        brand50: "#EFFAF5",
        brand100: "#D9F2E5",
        brand200: "#B5E5D0",
        brand300: "#84D1B3",
        brand400: "#51B692",
        brand500: "#309C7A",
        brand600: "#207B60",
        brand700: "#19634F",
        brand800: "#164F40",
        brand900: "#134136",
        error25: "#FFFBFA",
        error50: "#FEF3F2",
        error100: "#FEE4E2",
        error200: "#FECDCA",
        error300: "#FDA29B",
        error400: "#F97066",
        error500: "#F04438",
        error600: "#D92D20",
        error700: "#B42318",
        error800: "#912018",
        error900: "#7A271A",
      },
    },
  },
  plugins: [],
}
export default config
