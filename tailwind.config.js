const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        container: {
            center: true,
        },
        extend: {
            transitionTimingFunction: {
                "expoOut": "cubic-bezier(0.19, 1, 0.22, 1)",
            },
            colors: {
                brand: {
                    light: "#a855f7",
                    DEFAULT: "#6b21a8",
                },
                ui: {
                    dark: "#111827",
                },
            },
            fontFamily: {
                "display": [
                    "Newake",
                    ...fontFamily.sans,
                ],
                "sans": [
                    "var(--font-kanit)",
                    ...fontFamily.sans,
                ],
            },
            animation: {
                marquee: "marquee 20s linear infinite",
                marquee2: "marquee2 20s linear infinite",
                loader: "loader 2000ms cubic-bezier(0.45, 0, 0.55, 1) forwards",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-100%)" },
                },
                marquee2: {
                    "0%": { transform: "translateX(100%)" },
                    "100%": { transform: "translateX(0%)" },
                },
            },
        },
    },
    plugins: [],
};
