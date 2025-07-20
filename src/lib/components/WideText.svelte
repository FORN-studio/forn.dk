<script>
	import { m } from '$lib/paraglide/messages.js'
	import { scrollAnimations } from '$lib/utils/scroll-animations.js'
	import { onMount, onDestroy } from 'svelte'

	onMount(() => {
		const spanLines = document.querySelectorAll('h2.spanning > div')

		if (spanLines.length >= 3) {
			const animations = [
				{
					element: spanLines[0],
					from: { autoAlpha: 0, yPercent: -100 },
					trigger: 'div.wide-text'
				},
				{
					element: spanLines[1],
					from: { autoAlpha: 0 },
					trigger: 'div.wide-text'
				},
				{
					element: spanLines[2],
					from: { autoAlpha: 0, yPercent: 100 },
					trigger: 'div.wide-text'
				}
			]

			scrollAnimations.animateMultiElementReveal(animations)
		}
	})

	onDestroy(() => {
		scrollAnimations.destroy()
	})
</script>

<div class="wide-text">
	<div class="text-wrapper">
		<p>{m.wide_text_intro()}</p>
		<h2 class="spanning">
			<div>{m.wide_text_heading_part1()}</div>
			<div>{m.wide_text_heading_part2()}</div>
			<div>{m.wide_text_heading_part3()}</div>
		</h2>
		<p>{m.wide_text_outro()}</p>
	</div>
</div>

<style lang="scss">
	@use 'src/lib/scss/variables' as *;

	.wide-text {
		padding: 14rem 0;

		@media (max-width: $mobile) {
			padding: 8rem 0;
		}

		.text-wrapper {
			display: flex;
			flex-direction: column;
			gap: 1rem;

			h2 {
				display: flex;
				flex-direction: row;
				width: 100%;
				justify-content: space-between;
				overflow: hidden;

				div {
					padding-bottom: 20px;

					&:nth-child(2) {
						margin-top: 6rem;
					}
					&:nth-child(3) {
						margin-top: 12rem;
					}
				}
			}

			p {
				max-width: 30ch;

				&:nth-child(1) {
					padding-left: $p-inset;

					@media (max-width: $mobile) {
						padding-left: $p-inset-mobile;
					}
				}

				&:last-child {
					text-align: right;
					width: 100%;
					padding-right: $p-inset;
					align-self: flex-end;
					padding-top: 1rem;

					@media (max-width: $mobile) {
						padding-right: $p-inset-mobile;
					}
				}
			}
		}
	}
</style>
