<script>
	import Ironwork from '$lib/components/Ironwork.svelte'
	import Pili from '$lib/components/Pili.svelte'
	import { m } from '$lib/paraglide/messages.js'
	import { getLocale } from '$lib/paraglide/runtime.js'

	let { data } = $props()

	// reactive data - re-derives on client-side navigation
	let metadata = $derived(data.story.metadata)
	let component = $derived(data.story.component)
	let allStories = $derived(data.allStories || [])
	let currentIndex = $derived(allStories.findIndex((s) => s.slug === metadata.slug))
	let nextStory = $derived(
		currentIndex >= 0 && currentIndex < allStories.length - 1
			? allStories[currentIndex + 1]
			: null
	)

	let locale = $derived(getLocale())
	let canonical = $derived(
		locale === 'da'
			? `https://forn.dk/stories/${metadata.slug}`
			: `https://forn.dk/en/stories/${metadata.slug}`
	)
	let articleJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: metadata.title,
		description: metadata.description,
		datePublished: metadata.date,
		author: {
			'@type': 'Person',
			name: 'Adrian Elias Bratlann',
			url: 'https://forn.dk'
		},
		publisher: {
			'@type': 'Organization',
			name: 'FORN',
			url: 'https://forn.dk',
			logo: {
				'@type': 'ImageObject',
				url: 'https://forn.dk/og_image.jpg'
			}
		},
		mainEntityOfPage: canonical,
		image: 'https://forn.dk/og_image.jpg',
		articleSection: metadata.category
	})

	let readProgress = $state(0)
	let articleEl = $state(null)
	let contentEl = $state(null)
	let mounted = $state(false)
	let endMarkVisible = $state(false)

	const piliIds = [
		'asa', 'bete', 'buni', 'dala', 'dudi', 'fasi', 'feno', 'fudo', 'gano', 'kana', 'kene',
		'kodu', 'mafa', 'muno', 'nima', 'nugo', 'pali', 'pili', 'sadi', 'sibi', 'sila', 'sufu',
		'sumi', 'taku', 'tega', 'yaka', 'yalu'
	]
	const pick = () => piliIds[Math.floor(Math.random() * piliIds.length)]

	// icicle scatters: columns of decreasing height, dripping from the content edge
	const scatterConfigs = [
		{ columns: [6, 4, 2], side: 'right' },
		{ columns: [2, 4, 5], side: 'left' },
		{ columns: [5, 3, 1], side: 'right' }
	]
	let scatterTops = $state([0, 0, 0])

	// centered icicle for the section break
	const breakColumns = [1, 2, 3, 4, 5, 4, 3, 2, 1]

	const formatDate = (dateStr) => {
		const date = new Date(dateStr)
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}

	// re-initialize animations and scroll handlers when the story changes
	let scrollCleanup = null

	$effect(() => {
		const slug = metadata.slug

		mounted = false
		endMarkVisible = false
		readProgress = 0
		scatterTops = [0, 0, 0]

		const frame = requestAnimationFrame(() => {
			mounted = true

			const headers = articleEl?.querySelectorAll('.content h2')
			headers?.forEach((h2) => {
				h2.style.opacity = '0'
				h2.style.transform = 'translateY(30px)'
			})

			const endMark = articleEl?.querySelector('.end-mark')

			if (contentEl && contentEl.scrollHeight > 800) {
				const h = contentEl.scrollHeight
				const offset = contentEl.offsetTop
				scatterTops = [offset + h * 0.22, offset + h * 0.5, offset + h * 0.78]
			}

			const handleScroll = () => {
				if (!articleEl) return

				const rect = articleEl.getBoundingClientRect()
				const total = rect.height - window.innerHeight
				const scrolled = -rect.top
				readProgress = Math.max(0, Math.min(1, scrolled / total))

				headers?.forEach((h2) => {
					const hRect = h2.getBoundingClientRect()
					if (hRect.top < window.innerHeight * 0.82) {
						h2.style.transition = 'opacity 700ms ease, transform 700ms ease'
						h2.style.opacity = '1'
						h2.style.transform = 'translateY(0)'
					}
				})

				if (endMark && !endMarkVisible) {
					const emRect = endMark.getBoundingClientRect()
					if (emRect.top < window.innerHeight * 0.85) {
						endMarkVisible = true
					}
				}
			}

			window.addEventListener('scroll', handleScroll, { passive: true })
			handleScroll()

			scrollCleanup = () => window.removeEventListener('scroll', handleScroll)
		})

		return () => {
			cancelAnimationFrame(frame)
			scrollCleanup?.()
			scrollCleanup = null
		}
	})
</script>

<svelte:head>
	<title>{metadata.title} | FORN</title>
	<meta name="description" content={metadata.description} />
	<link rel="canonical" href={canonical} />
	<link rel="alternate" hreflang="da" href={`https://forn.dk/stories/${metadata.slug}`} />
	<link rel="alternate" hreflang="en" href={`https://forn.dk/en/stories/${metadata.slug}`} />
	<link rel="alternate" hreflang="x-default" href={`https://forn.dk/stories/${metadata.slug}`} />
	<meta property="og:title" content={`${metadata.title} | FORN`} />
	<meta property="og:description" content={metadata.description} />
	<meta property="og:image" content="https://forn.dk/og_image.jpg" />
	<meta property="og:url" content={canonical} />
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="FORN" />
	<meta property="og:locale" content={locale === 'da' ? 'da_DK' : 'en_US'} />
	<meta property="og:locale:alternate" content={locale === 'da' ? 'en_US' : 'da_DK'} />
	<meta property="article:published_time" content={metadata.date} />
	<meta property="article:author" content="Adrian Elias Bratlann" />
	<meta property="article:section" content={metadata.category} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`${metadata.title} | FORN`} />
	<meta name="twitter:description" content={metadata.description} />
	<meta name="twitter:image" content="https://forn.dk/og_image.jpg" />
	{@html `<script type="application/ld+json">${JSON.stringify(articleJsonLd)}</script>`}
</svelte:head>

<div class="progress-line" style="transform: scaleY({readProgress})"></div>

<article class="story" bind:this={articleEl}>
	<header class:mounted>
		<a class="back-top" href="/" style="--delay: 0ms">
			<svg
				width="16px"
				height="16px"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				color="currentColor"
			>
				<path
					d="M21 12L3 12M3 12L11.5 3.5M3 12L11.5 20.5"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				></path>
			</svg>
		</a>
		<span class="category" style="--delay: 100ms">{metadata.category}</span>
		<h1 class="fraktur" style="--delay: 300ms">{metadata.title}</h1>
		<div class="ironwork-accent" style="--delay: 500ms">
			<Ironwork />
		</div>
		<p class="description" style="--delay: 650ms">{metadata.description}</p>
		<time datetime={metadata.date} style="--delay: 800ms">{formatDate(metadata.date)}</time>
	</header>

	<div class="content" bind:this={contentEl}>
		<svelte:component this={component} />
	</div>

	<div class="pili-break">
		{#each breakColumns as count}
			<div class="pili-col">
				{#each Array(count) as _}
					<Pili initialSymbol={pick()} />
				{/each}
			</div>
		{/each}
	</div>

	<div class="end-mark" class:visible={endMarkVisible}>
		<Ironwork />
	</div>

	{#if nextStory}
		<a class="next-story" href="/stories/{nextStory.slug}">
			<span class="label">{m.next_story()}</span>
			<span class="fraktur next-title">{nextStory.title}</span>
			<span class="next-arrow">
				<svg
					width="20px"
					height="20px"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					color="currentColor"
				>
					<path
						d="M3 12L21 12M21 12L12.5 3.5M21 12L12.5 20.5"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
				</svg>
			</span>
		</a>
	{/if}

	<a class="back" href="/">
		<span class="icon">
			<svg
				width="20px"
				height="20px"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				color="currentColor"
			>
				<path
					d="M21 12L3 12M3 12L11.5 3.5M3 12L11.5 20.5"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				></path>
			</svg>
		</span>
		<span class="text">FORN</span>
	</a>

	{#each scatterConfigs as config, i}
		{#if scatterTops[i] > 0}
			<div
				class="pili-scatter"
				class:right={config.side === 'right'}
				class:left={config.side === 'left'}
				style="top: {scatterTops[i]}px"
			>
				{#each config.columns as count}
					<div class="pili-col">
						{#each Array(count) as _}
							<Pili initialSymbol={pick()} />
						{/each}
					</div>
				{/each}
			</div>
		{/if}
	{/each}
</article>

<style lang="scss">
	@use 'src/lib/scss/variables' as *;

	.progress-line {
		position: fixed;
		top: 0;
		left: 0;
		width: 2px;
		height: 100vh;
		background-color: $accent;
		transform-origin: top;
		z-index: 50;
		pointer-events: none;

		@media (max-width: $mobile) {
			display: none;
		}
	}

	.story {
		max-width: 1000px;
		margin: 0 auto;
		padding: 0 $p-inset 6rem;
		position: relative;

		@media (max-width: $mobile) {
			padding: 0 $p-inset-mobile 4rem;
		}

		header {
			padding: 10rem 0 6rem;

			@media (max-width: $mobile) {
				padding: 7rem 0 4rem;
			}

			> * {
				opacity: 0;
				transform: translateY(20px);
				transition:
					opacity 700ms ease var(--delay, 0ms),
					transform 700ms ease var(--delay, 0ms);
			}

			&.mounted > * {
				opacity: 1;
				transform: none;
			}

			&.mounted .ironwork-accent {
				opacity: 0.6;
			}

			.back-top {
				display: inline-block;
				color: $light-grey;
				margin-bottom: 3rem;
				transition: ease color 300ms;

				&:hover {
					color: $accent;
					text-decoration: none;
				}
			}

			.category {
				display: block;
				color: $light-grey;
				font-size: 0.85rem;
				margin-bottom: 1.5rem;
			}

			h1 {
				color: $accent;
				font-size: $fs-xl;
				line-height: 1;

				@media (max-width: $tablet) {
					font-size: $fs-lg * 1.5;
				}

				@media (max-width: $mobile) {
					font-size: $fs-lg;
				}
			}

			.ironwork-accent {
				margin: 1.5rem 0;
			}

			.description {
				text-transform: none;
				font-size: 1rem;
				line-height: 1.6;
				color: $dark-grey;
				max-width: 35ch;
			}

			time {
				display: block;
				color: $light-grey;
				font-size: 0.85rem;
				margin-top: 1.5rem;
			}
		}

		.content {
			// prose centered at reading width within the wider article
			:global(p),
			:global(ul),
			:global(ol),
			:global(pre) {
				max-width: 680px;
				margin-left: auto;
				margin-right: auto;
			}

			:global(h2) {
				font-size: $fs-lg;
				color: $accent;
				margin: 5rem 0 2rem;
				font-family: 'Mod', serif;
				font-weight: 500;
				text-transform: lowercase;
				will-change: transform, opacity;
			}

			:global(p) {
				text-transform: none;
				font-size: 1rem;
				line-height: 1.7;
				color: $dark-grey;
				margin-bottom: 1.5rem;
			}

			:global(p:first-of-type::first-letter) {
				font-family: 'Mod', cursive;
				font-size: 5rem;
				float: left;
				line-height: 0.8;
				padding-right: 0.6rem;
				padding-top: 0.15rem;
				color: $accent;
				font-weight: 500;
			}

			:global(strong) {
				font-weight: bold;
				color: $black;
			}

			:global(code) {
				font-family: monospace;
				font-size: 0.9rem;
				background-color: $white;
				border: 1px solid $ultralight-grey;
				border-radius: 4px;
				padding: 0.15rem 0.4rem;
				text-transform: none;
			}

			:global(pre) {
				background-color: $white;
				border: 1px solid $ultralight-grey;
				border-radius: 12px;
				padding: 1.5rem;
				overflow-x: auto;
				margin-bottom: 1.5rem;

				:global(code) {
					background: none;
					border: none;
					padding: 0;
					font-size: 0.85rem;
					line-height: 1.6;
				}
			}

			:global(ul),
			:global(ol) {
				text-transform: none;
				font-size: 1rem;
				line-height: 1.7;
				color: $dark-grey;
				margin-bottom: 1.5rem;
				padding-left: 1.5rem;
			}

			:global(li) {
				margin-bottom: 0.5rem;
			}

			:global(blockquote) {
				border-left: 3px solid $accent;
				padding-left: 1.5rem;
				margin: 2.5rem auto;
				max-width: 780px;
				color: $light-grey;
				font-style: italic;

				:global(p) {
					max-width: none;
					margin-left: 0;
					margin-right: 0;
				}
			}

			:global(a) {
				color: $accent;
				text-decoration: none;
				text-transform: none;

				&:hover {
					text-decoration: underline;
				}
			}
		}

		// shared column layout for icicle patterns
		.pili-col {
			display: flex;
			flex-direction: column;
			gap: 3px;
		}

		.pili-break {
			display: flex;
			align-items: flex-start;
			justify-content: center;
			gap: 3px;
			margin: 5rem 0;

			:global(.pili) {
				opacity: 0.12;
				width: 40px;
				height: 40px;
			}
		}

		.pili-scatter {
			position: absolute;
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			gap: 3px;
			pointer-events: none;

			&.right {
				right: 0;
			}

			&.left {
				left: 0;
			}

			:global(.pili) {
				opacity: 0.12;
				width: 35px;
				height: 35px;
			}

			@media (max-width: $tablet) {
				display: none;
			}
		}

		.end-mark {
			display: flex;
			justify-content: center;
			margin: 2rem auto 0;
			opacity: 0;
			transform: scale(0.6);
			transition:
				opacity 800ms ease,
				transform 800ms ease;

			&.visible {
				opacity: 0.4;
				transform: scale(1);
			}
		}

		.next-story {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			margin: 4rem auto 0;
			max-width: 680px;
			padding: 2.5rem 3rem;
			border: 1px solid $ultralight-grey;
			border-radius: 40px;
			text-decoration: none;
			transition: ease all 400ms;

			&:hover {
				transform: scale(1.02);
				border-color: $accent;
				text-decoration: none;
			}

			@media (max-width: $mobile) {
				padding: 2rem;
				border-radius: 30px;
			}

			.label {
				color: $light-grey;
				font-size: 0.85rem;
			}

			.next-title {
				color: $accent;
				font-size: 2.5rem;
				line-height: 1;
				max-width: 15ch;

				@media (max-width: $mobile) {
					font-size: 2rem;
				}
			}

			.next-arrow {
				color: $accent;
				margin-top: 1rem;
				transition: ease transform 300ms;
			}

			&:hover .next-arrow {
				transform: translateX(5px);
			}
		}

		.back {
			display: inline-flex;
			flex-direction: row;
			align-items: center;
			gap: 0.5rem;
			margin: 4rem auto 0;
			max-width: 680px;
			width: 100%;
			color: $accent;
			text-decoration: none;
			transition: ease all 300ms;

			&:hover {
				gap: 1rem;
				text-decoration: none;
			}

			.icon {
				transform: translateY(1px);
			}
		}
	}
</style>
