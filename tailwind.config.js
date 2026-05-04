/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        foreground: "var(--text)",
        accent: "var(--accent)",
        surface: "var(--surface)",
        surface2: "var(--surface2)",
        muted: "var(--muted)",
        border: "var(--border-color)",
      },
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
        space: ["var(--font-space)", "monospace"],
        syne: ["var(--font-syne)", "sans-serif"],
        dm: ["var(--font-dm-sans)", "sans-serif"],
        crimson: ["var(--font-crimson)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
