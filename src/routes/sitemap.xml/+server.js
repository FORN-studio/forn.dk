import { getStories } from '$lib/utils/stories.js'

export const prerender = true

export async function GET() {
	const stories = await getStories('en')
	const latest = stories[0].date

	const urls = [
		{
			loc: 'https://forn.dk/',
			lastmod: latest,
			priority: '1.0',
			da: 'https://forn.dk/',
			en: 'https://forn.dk/en'
		},
		{
			loc: 'https://forn.dk/en',
			lastmod: latest,
			priority: '0.9',
			da: 'https://forn.dk/',
			en: 'https://forn.dk/en'
		},
		{
			loc: 'https://forn.dk/stories',
			lastmod: latest,
			priority: '0.9',
			da: 'https://forn.dk/stories',
			en: 'https://forn.dk/en/stories'
		},
		{
			loc: 'https://forn.dk/en/stories',
			lastmod: latest,
			priority: '0.8',
			da: 'https://forn.dk/stories',
			en: 'https://forn.dk/en/stories'
		},
		...stories.flatMap((s) => [
			{
				loc: `https://forn.dk/stories/${s.slug}`,
				lastmod: s.date,
				priority: '0.8',
				da: `https://forn.dk/stories/${s.slug}`,
				en: `https://forn.dk/en/stories/${s.slug}`
			},
			{
				loc: `https://forn.dk/en/stories/${s.slug}`,
				lastmod: s.date,
				priority: '0.7',
				da: `https://forn.dk/stories/${s.slug}`,
				en: `https://forn.dk/en/stories/${s.slug}`
			}
		])
	]

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
	.map(
		(u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u.priority}</priority>
    <xhtml:link rel="alternate" hreflang="da" href="${u.da}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${u.en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${u.da}"/>
  </url>`
	)
	.join('\n')}
</urlset>`

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml' }
	})
}
