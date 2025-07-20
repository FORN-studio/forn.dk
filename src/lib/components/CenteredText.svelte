<script>
	import Pili from '$lib/components/Pili.svelte'
	import { m } from '$lib/paraglide/messages.js'
	import Testimonials from './Testimonials.svelte'

	const piliCounts = [
		{ breakpoint: 999999, rows: [1, 3, 5, 9, 12, 11, 7, 3, 1] },
		{ breakpoint: 1440, rows: [1, 3, 5, 9, 12, 11, 7, 3, 1] },
		{ breakpoint: 1024, rows: [1, 3, 5, 8, 9, 7, 3, 1] },
		{ breakpoint: 768, rows: [2, 4, 5, 2] }
	]

	let innerWidth = $state(0)
	let piliRows = $derived.by(() => {
		const idx = piliCounts.findIndex((piliCount) => innerWidth >= piliCount.breakpoint)
		return piliCounts[idx - 1]?.rows || piliCounts[3].rows
	})
</script>

<svelte:window bind:innerWidth />

<div class="centered-text">
	<div class="text-wrapper">
		<p>{m.centered_text_intro()}</p>
		<h2>{m.centered_text_heading()}</h2>

		<div class="testimonials">
			<Testimonials />
		</div>
	</div>

	<div class="pili-wrapper">
		{#each piliRows as row}
			<div class="row">
				{#each { length: row } as _}
					<Pili />
				{/each}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@use 'src/lib/scss/variables' as *;

	.centered-text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 14rem 0;
		text-align: center;
		gap: 2rem;

		@media (max-width: $mobile) {
			padding: 0;
		}

		.text-wrapper {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			max-width: 100%;

			p {
				max-width: 30ch;
				margin: 0 auto;
			}
		}

		.pili-wrapper {
			display: flex;
			flex-direction: row;
			gap: 1rem;

			.row {
				display: flex;
				flex-direction: column;
				gap: 1rem;
			}
		}
	}
</style>
