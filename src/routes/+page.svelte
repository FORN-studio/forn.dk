<script>
	import Splash from '$lib/components/Splash.svelte'
	import TextOne from '$lib/components/TextOne.svelte'
	import TextTwo from '$lib/components/TextTwo.svelte'
	import CenteredText from '$lib/components/CenteredText.svelte'
	import Bento from '$lib/components/Bento.svelte'
	import WideText from '$lib/components/WideText.svelte'
	import EyeMarquee from '$lib/components/EyeMarquee.svelte'
	import TextThree from '$lib/components/TextThree.svelte'
	import Contact from '$lib/components/Contact.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import { onMount } from 'svelte'
	import { m } from '$lib/paraglide/messages.js'
	import { getLocale } from '$lib/paraglide/runtime.js'
	import { scrollAnimations } from '$lib/utils/scroll-animations.js'

	const components = [
		Splash,
		TextOne,
		TextTwo,
		CenteredText,
		Bento,
		WideText,
		EyeMarquee,
		TextThree,
		Contact,
		Footer
	]

	// for later dynamic import
	let PiliHandler = $state(null)
	let OffsetHandler = $state(null)

	let currentLanguage = $state(getLocale())
	const canonical = currentLanguage === 'da' ? 'https://forn.dk/' : 'https://forn.dk/en'
	const jsonLd = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				name: 'FORN',
				url: 'https://forn.dk',
				description: m.meta_description(),
				inLanguage: ['da', 'en']
			},
			{
				'@type': 'ProfessionalService',
				name: 'FORN',
				url: 'https://forn.dk',
				image: 'https://forn.dk/og_image.jpg',
				description: m.meta_description(),
				founder: {
					'@type': 'Person',
					name: 'Adrian Elias Bratlann'
				},
				address: {
					'@type': 'PostalAddress',
					addressLocality: 'Copenhagen',
					addressCountry: 'DK'
				},
				knowsAbout: [
					'Platform Engineering',
					'Machine Learning',
					'Web Development',
					'Systems Architecture'
				]
			}
		]
	}

	onMount(() => {
		const handleVisibilityChange = () => {
			if (document.hidden) {
				document.title = m.tab_away_message()
			} else {
				document.title = m.meta_title()
			}
		}

		document.addEventListener('visibilitychange', handleVisibilityChange)

		const headers = document.querySelectorAll('h2:not(.spanning)')
		const textOne = document.querySelector('.text-one h1 > span.h2')
		const targets = [...headers, textOne].filter(Boolean)

		scrollAnimations.animateTextReveal(targets)

		const loadHandlers = () => {
			import('$lib/components/PiliHandler.svelte').then((m) => {
				PiliHandler = m.default
			})
			import('$lib/components/OffsetHandler.svelte').then((m) => {
				OffsetHandler = m.default
			})
		}

		// mount handlers on requestIdleCallback
		if ('requestIdleCallback' in window) {
			requestIdleCallback(loadHandlers, { timeout: 2000 })
		} else {
			setTimeout(loadHandlers, 500)
		}

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange)
			scrollAnimations.destroy()
		}
	})
</script>

<svelte:head>
	<title>{m.meta_title()}</title>
	<meta name="description" content={m.meta_description()} />
	<link rel="canonical" href={canonical} />
	<link rel="alternate" hreflang="da" href="https://forn.dk/" />
	<link rel="alternate" hreflang="en" href="https://forn.dk/en" />
	<link rel="alternate" hreflang="x-default" href="https://forn.dk/" />
	<meta property="og:title" content={m.meta_title()} />
	<meta property="og:description" content={m.meta_description()} />
	<meta property="og:image" content="https://forn.dk/og_image.jpg" />
	<meta property="og:url" content={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="FORN" />
	<meta property="og:locale" content={currentLanguage === 'da' ? 'da_DK' : 'en_US'} />
	<meta property="og:locale:alternate" content={currentLanguage === 'da' ? 'en_US' : 'da_DK'} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={m.meta_title()} />
	<meta name="twitter:description" content={m.meta_description()} />
	<meta name="twitter:image" content="https://forn.dk/og_image.jpg" />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<div class="wrapper">
	{#each components as Component}
		<Component />
	{/each}
</div>

{#if PiliHandler}
	<PiliHandler />
{/if}

{#if OffsetHandler}
	<OffsetHandler />
{/if}

<style lang="scss">
	.wrapper {
		padding: 1rem;
	}

	:global(h2 .line) {
		overflow: hidden;
	}
</style>
