module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.html",
    "./src/**/*.liquid",
    "./src/**/*.js",
    "./src/**/*.jsx",
  ],
  theme: {
    container: {
      maxWidth: "1440px",
    },
    colors: {
      // Color variables coming from theme-colors.liquid snippet
      transparent: "transparent",
      inherit: "inherit",
      transparent: "transparent",
      // Primary Colors
      white: "#FFFFFF",
      black: "#000",
      pink: "#FFE6EB",
      "black-overlay": "rgba(0, 0, 0, 0.7)",
      // Accent Colors
      primary: "var(--primary)",
      secondary: "var(--secondary)",
      alternate: "var(--alternate)",
      // utilities
      error: "var(--error)",
      "error-alt": "var(--error-alt)",
      success: "var(--success)",
      "success-alt": "var(--success-alt)",
      // greys
      "grey-800": "var(--grey-800)",
      "grey-700": "var(--grey-700)",
      "grey-600": "var(--grey-600)",
      "grey-500": "var(--grey-500)",
      "grey-400": "var(--grey-400)",
      "grey-300": "var(--grey-300)",
      "grey-200": "var(--grey-200)",
      "grey-100": "var(--grey-100)",
      "off-white": "var(--off-white)",
    },
    fontFamily: {
      oswald: ["Oswald", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
      "roboto-condensed": ["Roboto Condensed", "sans-serif"],
    },
    screens: {
      // Media query breakpoints
      // All breakpoints use min-width
      xs: "340px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontSize: {
        // Mobile Headings
        "h1-m": [
          "28px",
          {
            lineHeight: "42px",
          },
        ],
        "h2-m": [
          "22px",
          {
            lineHeight: "33px",
          },
        ],
        "h3-m": [
          "20px",
          {
            lineHeight: "30px",
          },
        ],
        "h4-m": [
          "18px",
          {
            lineHeight: "27px",
          },
        ],
        "h5-m": [
          "16px",
          {
            lineHeight: "24px",
          },
        ],
        "h6-m": [
          "14px",
          {
            lineHeight: "21px",
          },
        ],
        // Desktop
        h1: [
          "50px",
          {
            lineHeight: "65px",
          },
        ],
        h2: [
          "36px",
          {
            lineHeight: "47px",
          },
        ],
        h3: [
          "28px",
          {
            lineHeight: "42px",
          },
        ],
        h4: [
          "22px",
          {
            lineHeight: "33px",
          },
        ],
        h5: [
          "18px",
          {
            lineHeight: "27px",
          },
        ],
        h6: [
          "16px",
          {
            lineHeight: "24px",
          },
        ],
        "p-l": [
          "18px",
          {
            lineHeight: "27px",
          },
        ],
        // Paragraph styles
        p: [
          "16px",
          {
            lineHeight: "24px",
          },
        ],
        "p-s": [
          "14px",
          {
            lineHeight: "21px",
          },
        ],
        "p-xs": [
          "12px",
          {
            lineHeight: "18px",
          },
        ],
        "p-xxs": [
          "10px",
          {
            lineHeight: "16px",
          },
        ],
        // Subheading styles
        "sub-l": [
          "18px",
          {
            lineHeight: "28px",
          },
        ],
        sub: [
          "16px",
          {
            lineHeight: "24px",
          },
        ],
        "sub-m": [
          "15px",
          {
            lineHeight: "24px",
          },
        ],
        "sub-s": [
          "14px",
          {
            lineHeight: "20px",
          },
        ],
        "sub-xs": [
          "12px",
          {
            lineHeight: "16px",
          },
        ],
        "sub-xxs": [
          "10px",
          {
            lineHeight: "16px",
          },
        ],
      },
      borderRadius: {
        // Add border radius configurations here if Talwind's defaults are not enough.
        // SEE THIS BEFORE ADDING: https://tailwindcss.com/docs/border-radius
      },
      borderColor: (theme) => theme("colors"),
      fill: (theme) => theme("colors"),
      stroke: (theme) => theme("colors"),
      animation: {
        'fade-in': 'fadeIn .3s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      },
      boxShadow: {
        'sidenav': '0px 0px 10px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["hover", "checked", "disabled"],
      opacity: ["disabled"],
      borderWidth: ["hover", "checked"],
      borderColor: ["hover", "checked"],
      boxShadow: ["hover", "group-focus"],
      fontFamily: ["hover", "focus", "visited"],
      fill: ["hover", "group-hover"],
      stroke: ["hover", "group-hover"],
    },
  },
  plugins: [],
};
