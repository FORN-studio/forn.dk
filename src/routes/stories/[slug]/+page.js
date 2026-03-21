import { getStory, getStories } from '$lib/utils/stories.js'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
	const story = await getStory(params.slug)
	if (!story) throw error(404, 'Story not found')

	const allStories = await getStories()
	return { story, allStories }
}
