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
        primary: "#f43f5f",
        primaryStrong: "#f43f5f",
        primaryLight: "#f43f5f",
      },
    },
  },

  preflight: (preflight, { theme: _theme }) => ({
    ...preflight,
    "@import":
      `url('https://fonts.googleapis.com/css2?family=Nunito,Montserrat,Merriweather,wght@0,300;0,400;0,700;0,900;1,300&display=swap')`,
    div: {
      alignItems: "center",
    },
    p: {
      margin: "8px 0px 8px 0px",
    },
  }),
} as Options;
