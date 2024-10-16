/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx}"],
  theme: {
    colors: {
      main_bg: "var(--main_bg)",
      page_color: "var(--page_color)",
      input_color: "var(--input_color)",
      lnline_color: "var(--lnline_color)",
      primary_bg: "var(--primary_bg)",
      single_color: "var(--single_color)",
      secondary_bg: "var(--secondary_bg)",
      hover_clr: "var(--hover_clr)",
      blur: "var( --blur)",
      text_color: "var( --text_color)",
      primary_color: "var(--primary_color)",
      secondary_color: "var(--secondary_color)",
      title_color: "var( --title_color)",
      black: "var(--black)",
      white: "var( --white)",
      green: "var(--green)",
      blue: "var(--blue)",
      red: "var(--red)",
      yellow: "var(--yellow)",
      "white-100":"var(--white-100)",
      "purple-100": "var(--purple-100)",
      "pink-100": "var(--pink-100)",
      "cyan-100": "var(--cyan-100)",
      "transparent":"transparent"
    },
    fontFamily: {
      gilroyBlack: ["Gilroy-Black"],
      gilroyBold: ["Gilroy-Bold"],
      gilroyExtraBold: ["Gilroy-ExtraBold"],
      gilroyLight: ["Gilroy-Light"],
      gilroyMedium: ["Gilroy-Medium"],
      gilroyRegular: ["Gilroy-Regular"],
      gilroySemiBold: ["Gilroy-SemiBold"],
    },
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
