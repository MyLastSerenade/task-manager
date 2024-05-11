/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		colors: {
			primary: 'rgb(35, 41, 49)',
			secondary: 'rgb(57, 62, 70)',
			tertiary: 'rgb(78, 204, 163)',
			textColor: 'rgb(238, 238, 238)'
		},
		extend: {}
	},

	plugins: []
};

module.exports = config;
