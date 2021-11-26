const mode = process.env.NODE_ENV
const dev = mode === "development"

const config = {
    mode: "jit",
    purge: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {}
    },

    plugins: [require("@tailwindcss/aspect-ratio")]
}

if (!dev) {
    config.purge = ["./src/lib/**/*.{html,js,svelte,ts}"]
    config.important = ".floaty-sveltekit"
    config.corePlugins = {
        preflight: dev
    }
}

module.exports = config
