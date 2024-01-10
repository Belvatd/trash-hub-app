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
      fontSize: {
        xxs: "10px",
      },
      colors: {
        "gray-25": "#FCFCFD",
        "gray-50": "#F9FAFB",
        "gray-100": "#F2F4F7",
        "gray-200": "#EAECF0",
        "gray-300": "#D0D5DD",
        "gray-400": "#98A2B3",
        "gray-500": "#667085",
        "gray-600": "#475467",
        "gray-700": "#344054",
        "gray-800": "#1D2939",
        "gray-900": "#101828",
        "brand-25": "#F7FDFA",
        "brand-50": "#EFFAF5",
        "brand-100": "#D9F2E5",
        "brand-200": "#B5E5D0",
        "brand-300": "#84D1B3",
        "brand-400": "#51B692",
        "brand-500": "#309C7A",
        "brand-600": "#207B60",
        "brand-700": "#19634F",
        "brand-800": "#164F40",
        "brand-900": "#134136",
        "error-25": "#FFFBFA",
        "error-50": "#FEF3F2",
        "error-100": "#FEE4E2",
        "error-200": "#FECDCA",
        "error-300": "#FDA29B",
        "error-400": "#F97066",
        "error-500": "#F04438",
        "error-600": "#D92D20",
        "error-700": "#B42318",
        "error-800": "#912018",
        "error-900": "#7A271A",
        "orange-25": "#FFFAF5",
        "orange-50": "#FFF6ED",
        "orange-100": "#FFEAD5",
        "orange-200": "#FDDCAB",
        "orange-300": "#FEB273",
        "orange-400": "#FD853A",
        "orange-500": "#FB6514",
        "orange-600": "#EC4A0A",
        "orange-700": "#C4320A",
        "orange-800": "#9C2A10",
        "orange-900": "#7E2410",
        "blue-25": "#F5FAFF",
        "blue-50": "#EFF8FF",
        "blue-100": "#D1E9FF",
        "blue-200": "#B2DDFF",
        "blue-300": "#84CAFF",
        "blue-400": "#53B1FD",
        "blue-500": "#2E90FA",
        "blue-600": "#1570EF",
        "blue-700": "#175CD3",
        "blue-800": "#1849A9",
        "blue-900": "#194185",
      },
    },
  },
  plugins: [],
}
export default config
