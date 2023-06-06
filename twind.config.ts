import { Options } from "$fresh/plugins/twind.ts";
import * as colors from "twind/colors";

export default {
  selfURL: import.meta.url,
  theme: {
    fontFamily: {
      header: ["Montserrat, sans-serif"],
      sans: ["Nunito, sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    colors,
    extend: {
      colors: {
        primary: "#000000",
        primaryStrong: "#222222",
        primaryLight: "#333333",
      },
    },
  },

  preflight: (preflight, { theme: _theme }) => ({
    ...preflight,
    "@import":
      `url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;700;900&family=Merriweather:wght@300;400;700;900&family=Montserrat:wght@300;400;700;900&display=swap')`,
    div: {
      alignItems: "center",
    },
    p: {
      margin: "8px 0px 8px 0px",
    },
  }),
} as Options;
