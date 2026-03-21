import { Resend } from 'resend'
import { RESEND_API_KEY } from '$env/static/private'
import { fail } from '@sveltejs/kit'

const resend = new Resend(RESEND_API_KEY)

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData()

		const honeypot = formData.get('website')
		if (honeypot) return fail(400, { error: 'Invalid submission' })

		const t = Number(formData.get('t'))
		if (!t || Date.now() - t < 2000) return fail(400, { error: 'Invalid submission' })

		const name = formData.get('name')
		const email = formData.get('email')
		const message = formData.get('message')
		const company = formData.get('company')

		const { data, error } = await resend.emails.send({
			from: 'noreply@forn.dk',
			to: 'forn@forn.dk',
			subject: 'Livet er en porsche',
			html: `
                <p>Navn: ${name}</p>
                <p>Email: ${email}</p>
                <p>Besked: ${message}</p>
                <p>Virksomhed: ${company}</p>
            `
		})

		if (error) {
			return fail(500, { error: error.message })
		}

		return { success: true }
	}
}
