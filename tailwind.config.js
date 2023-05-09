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
		},
	},
	plugins: [],
};
