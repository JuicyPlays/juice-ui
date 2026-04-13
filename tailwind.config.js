/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        juice: {
          bg: "#080810",
          surface: "#0f0f1e",
          card: "#13132b",
          accent: "#6366f1",
          light: "#818cf8",
          violet: "#8b5cf6",
          border: "rgba(99,102,241,0.18)",
          muted: "#a0a0c0",
        },
      },
      backgroundImage: {
        "juice-gradient": "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        "juice-gradient-r": "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
      },
      animation: {
        "fade-up": "fadeInUp 0.5s ease both",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
