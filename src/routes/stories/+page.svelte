<script>
	import Ironwork from '$lib/components/Ironwork.svelte'
	import { m } from '$lib/paraglide/messages.js'
	import { getLocale } from '$lib/paraglide/runtime.js'
	import { formatDate } from '$lib/utils/stories.js'
	import { href } from '$lib/utils/href.js'

	let { data } = $props()

	let stories = $derived(data.stories || [])
	let locale = $derived(getLocale())
	let canonical = $derived(
		locale === 'da' ? 'https://forn.dk/stories' : 'https://forn.dk/en/stories'
	)

	let mounted = $state(false)
	$effect(() => {
		const frame = requestAnimationFrame(() => (mounted = true))
		return () => cancelAnimationFrame(frame)
	})
</script>

<svelte:head>
	<title>{m.stories_title()} | FORN</title>
	<meta name="description" content={m.stories_description()} />
	<link rel="canonical" href={canonical} />
	<link rel="alternate" hreflang="da" href="https://forn.dk/stories" />
	<link rel="alternate" hreflang="en" href="https://forn.dk/en/stories" />
	<link rel="alternate" hreflang="x-default" href="https://forn.dk/stories" />
	<meta property="og:title" content={`${m.stories_title()} | FORN`} />
	<meta property="og:description" content={m.stories_description()} />
	<meta property="og:image" content="https://forn.dk/og_image.jpg" />
	<meta property="og:url" content={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="FORN" />
	<meta property="og:locale" content={locale === 'da' ? 'da_DK' : 'en_US'} />
	<meta property="og:locale:alternate" content={locale === 'da' ? 'en_US' : 'da_DK'} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`${m.stories_title()} | FORN`} />
	<meta name="twitter:description" content={m.stories_description()} />
	<meta name="twitter:image" content="https://forn.dk/og_image.jpg" />
</svelte:head>

<section class="stories">
	<header class:mounted>
		<a class="back-top" href={href('/')} aria-label="FORN" style="--delay: 0ms">
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
		<h1 class="fraktur" style="--delay: 200ms">{m.stories_title()}</h1>
		<div class="ironwork-accent" style="--delay: 400ms">
			<Ironwork />
		</div>
		<p class="description" style="--delay: 550ms">{m.stories_description()}</p>
	</header>

	<ul class="list" class:mounted>
		{#each stories as story, i}
			<li style="--delay: {700 + i * 100}ms">
				<a class="story-link" href={href(`/stories/${story.slug}`)}>
					<span class="label">{story.category} &middot; {formatDate(story.date, locale)}</span>
					<span class="fraktur story-title">{story.title}</span>
					<span class="story-arrow">
						<svg
							width="20px"
							height="20px"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							color="currentColor"
							><path
								d="M3 12L21 12M21 12L12.5 3.5M21 12L12.5 20.5"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							></path></svg
						>
					</span>
				</a>
			</li>
		{/each}
	</ul>

	<a class="back" href={href('/')}>
		<span class="icon">
			<svg
				width="20px"
				height="20px"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				color="currentColor"
				><path
					d="M21 12L3 12M3 12L11.5 3.5M3 12L11.5 20.5"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				></path></svg
			>
		</span>
		<span class="text">FORN</span>
	</a>
</section>

<style lang="scss">
	@use 'src/lib/scss/variables' as *;

	.stories {
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
		}

		.list {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
			max-width: 680px;

			li {
				opacity: 0;
				transform: translateY(20px);
				transition:
					opacity 700ms ease var(--delay, 0ms),
					transform 700ms ease var(--delay, 0ms);
			}

			&.mounted li {
				opacity: 1;
				transform: none;
			}
		}

		.story-link {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
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

			.story-title {
				color: $accent;
				font-size: 2.5rem;
				line-height: 1;
				max-width: 15ch;

				@media (max-width: $mobile) {
					font-size: 2rem;
				}
			}

			.story-arrow {
				color: $accent;
				margin-top: 1rem;
				transition: ease transform 300ms;
			}

			&:hover .story-arrow {
				transform: translateX(5px);
			}
		}

		.back {
			display: inline-flex;
			flex-direction: row;
			align-items: center;
			gap: 0.5rem;
			margin-top: 4rem;
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
