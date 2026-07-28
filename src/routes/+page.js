import { getStories } from '$lib/utils/stories.js'

export const load = async () => ({ stories: await getStories() })
