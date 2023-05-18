const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		container: {
			center: true,
		},
		extend: {
			fontFamily: {
				'display': ['Newake',  ...fontFamily.sans],
				'sans': ['var(--font-kanit)', ...fontFamily.sans],
			},
			animation: {
				  marquee: 'marquee 20s linear infinite',
				  marquee2: 'marquee2 20s linear infinite',
			},
			keyframes: {
				marquee: {
					'0%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(-100%)' },
				},
				marquee2: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0%)' },
				},
			},
		},
	},
	plugins: [],
};
