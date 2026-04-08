/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "card-maroon": "#8b0000",
        "card-gold": "#d4af37",
        "card-bg": "#fdfbf7",
        "card-text": "#4a3b32",
      },
      fontFamily: {
        yatra: ['"Yatra One"', "cursive"],
        gotu: ['"Gotu"', "sans-serif"],
        hind: ['"Hind"', "sans-serif"],
        amiri: ['"Amiri"', "serif"],
      },
      animation: {
        reveal: "revealDown 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s infinite",
      },
      keyframes: {
        revealDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-30px)",
            filter: "blur(5px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            filter: "blur(0)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(212,175,55,0.2)" },
          "50%": { boxShadow: "0 0 25px rgba(212,175,55,0.6)" },
        },
      },
    },
  },
  plugins: [],
};
