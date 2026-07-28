<script>
	import emblaCarouselSvelte from 'embla-carousel-svelte'
	import Autoplay from 'embla-carousel-autoplay'
	import ClassNames from 'embla-carousel-class-names'
	import SingleTestimonial from '$lib/components/SingleTestimonial.svelte'
	import { m } from '$lib/paraglide/messages'
	import { page } from '$app/state'
	import { href } from '$lib/utils/href.js'

	let stories = $derived(page.data.stories ?? [])

	let emblaApi = $state(null)
	const onEmblaInit = (event) => {
		emblaApi = event.detail
	}

	const getSlideIdx = (slug) => {
		return stories.findIndex((s) => s.slug === slug)
	}

	const scrollTo = (target) => {
		const current = emblaApi.selectedScrollSnap()

		if (current === target) return

		const total = stories.length * 2

		const fw = (target - current + total) % total
		const bw = (current - target + total) % total
		const direction = fw <= bw ? 1 : -1

		emblaApi.scrollTo(current + direction)
	}
</script>

<div class="swipe-indicator">
	<div class="arrow">
		<svg
			width="24px"
			height="24px"
			stroke-width="1.5"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			color="currentColor"
			><path
				d="M20 14C18.8954 14 18 13.1046 18 12C18 10.8954 18.8954 10 20 10C21.1046 10 22 10.8954 22 12C22 13.1046 21.1046 14 20 14Z"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			></path><path
				d="M15 12H2M2 12L5 9M2 12L5 15"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			></path></svg
		>
	</div>

	<span class="text touch">Swipe</span>
	<span class="text cursor">Drag</span>

	<div class="arrow">
		<svg
			width="24px"
			height="24px"
			stroke-width="1.5"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			color="currentColor"
			><path
				d="M4 14C2.89543 14 2 13.1046 2 12C2 10.8954 2.89543 10 4 10C5.10457 10 6 10.8954 6 12C6 13.1046 5.10457 14 4 14Z"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			></path><path
				d="M9 12H22M22 12L19 9M22 12L19 15"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			></path></svg
		>
	</div>
</div>

{#if stories.length}
	<div
		class="embla"
		use:emblaCarouselSvelte={{
			options: { loop: true, align: 'center' },
			plugins: [Autoplay(), ClassNames()]
		}}
		onemblaInit={onEmblaInit}
	>
		<div class="embla__container">
			{#each [...stories, ...stories] as story, i}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="embla__slide"
					onclick={(e) => {
						scrollTo(i)
					}}
				>
					<SingleTestimonial {story} />
				</div>
			{/each}
		</div>
	</div>
{/if}

<a class="all-stories" href={href('/stories')}>
	<span class="text">{m.all_stories()}</span>

	<span class="arrow">
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

<style lang="scss">
	@use 'src/lib/scss/variables.scss' as *;

	.swipe-indicator {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		margin-bottom: -1rem;
		margin-top: 1rem;

		.text,
		.arrow {
			color: $light-grey;
		}

		.text {
			margin-top: -0.3rem;

			&.touch {
				display: none;
			}

			@media (hover: none) {
				&.cursor {
					display: none;
				}
				&.touch {
					display: flex;
				}
			}
		}
	}

	.embla {
		overflow: hidden;
		width: calc(100% + 2rem);
		border-right: solid 1px $ultralight-grey;
		border-left: solid 1px $ultralight-grey;
		margin: 2rem 0;
		margin-bottom: 0;
		margin-left: -1rem;

		@media (max-width: $mobile) {
			margin-bottom: -1rem;
			margin-top: 0rem;
		}

		.embla__container {
			display: flex;
			flex-direction: row;
			align-items: stretch;
			padding: calc($p-inset / 2);
			gap: calc($p-inset / 2);

			.embla__slide {
				transition:
					ease opacity 500ms,
					ease filter 500ms;
			}
		}
	}

	.all-stories {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		color: $light-grey;
		text-decoration: none;
		transition: ease color 300ms;

		&:hover {
			color: $accent;
			text-decoration: none;
		}

		.text {
			margin-top: -0.3rem;
		}

		.arrow {
			transition: ease transform 300ms;
		}

		&:hover .arrow {
			transform: translateX(5px);
		}
	}

	:global(.embla__slide:not(.is-snapped)) {
		opacity: 0.3;
		filter: grayscale(1);
	}
</style>
