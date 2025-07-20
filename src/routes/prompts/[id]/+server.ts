import { error } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'

export const GET = ({ params, url }) => {
	const key = url.searchParams.get('key')

	if (key !== 'sesam sesam') return json({ success: false, error: 'Invalid key' })

	let prompt = null
	switch (Number(params.id)) {
		case 1:
			prompt = 'Speak like a pirate.'
			break
		case 2:
			prompt = 'Act like an overly assertive military general.'
			break
		case 3:
			prompt = 'Only respond in ABAB rhyme schemes.'
			break
		default:
			break
	}

	if (prompt) {
		return json({ success: true, prompt })
	} else {
		return json({ success: false, error: 'This prompt does not exist' })
	}
}
