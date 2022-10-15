const mode = process.env.NODE_ENV
const dev = mode === "development"

const config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {}
	},
}

if (!dev) {
	config.content = ["./src/lib/**/*.{html,js,svelte,ts}"]
	// config.important = ".floaty-sveltekit"
	config.corePlugins = {
		preflight: false
	}
}

module.exports = config
