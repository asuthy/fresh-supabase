import { Options } from "$fresh/plugins/twind.ts";
import * as colors from "twind/colors";

export default {
  selfURL: import.meta.url,
  theme: {
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
    div: {
      alignItems: "center",
    },
    h1: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    p: {
      margin: "8px 0px 8px 0px",
    },
  }),
} as Options;
