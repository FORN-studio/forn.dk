import adapter from '@sveltejs/adapter-vercel'
import { sveltePreprocess } from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter()
	},
	preprocess: [mdsvex({ extensions: ['.md'] }), sveltePreprocess()]
}

export default config
