<script>
	import Pili from '$lib/components/Pili.svelte'
	import { onMount } from 'svelte'
	import { m } from '$lib/paraglide/messages.js'

	const randomLength = () => Math.floor(Math.random() * 15) + 1

	let piliRows = $state(
		Array(35)
			.fill(0)
			.map(() => randomLength())
	)

	onMount(() => {
		setInterval(() => {
			piliRows = piliRows.map(() => randomLength())
		}, 150)
	})

	const ids = [
		'asa',
		'bete',
		'buni',
		'dala',
		'dudi',
		'fasi',
		'feno',
		'fudo',
		'gano',
		'kana',
		'kene',
		'kodu',
		'mafa',
		'muno',
		'nima',
		'nugo',
		'pali',
		'pili',
		'sadi',
		'sibi',
		'sila',
		'sufu',
		'sumi',
		'taku',
		'tega',
		'yaka',
		'yalu'
	]

	const randomId = () => ids[Math.floor(Math.random() * ids.length)]
</script>

<div class="footer">
	<div class="texts">
		<span>
			{m.footer_copyright()}
		</span>
		<span>
			{m.footer_symbols()}
		</span>
		<span>
			{m.footer_crafted_with()} <span class="heart">❤</span>
			{m.footer_by()}
		</span>
		<span>
			{m.footer_name()}
		</span>
	</div>

	<div class="pili-rows">
		{#each piliRows as row}
			<div class="pili-row">
				{#each Array(15 - row) as _}
					<div class="pili-placeholder"></div>
				{/each}
				{#each Array(row) as _}
					<Pili initialSymbol={randomId()} />
				{/each}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@use 'src/lib/scss/variables' as *;

	.footer {
		margin-top: 8rem;

		.heart {
			color: $accent;
			transform: scale(2);
			display: inline-block;
			padding: 0 0.3rem;
		}

		.pili-rows {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: flex-end;
			height: calc(60px * 20);
			flex-shrink: 0;
		}

		.pili-placeholder {
			width: 60px;
			height: 60px;
		}

		.texts {
			display: flex;
			flex-direction: row;
			gap: 2rem;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			font-size: 0.8rem;
			margin-bottom: -16rem;

			> span {
				color: rgb(117, 117, 117);
			}

			@media (max-width: $mobile) {
				flex-direction: column;
				gap: 1rem;
			}

			.inline-icon svg {
				transform: translateY(0.1rem);
				margin: 0 0.2rem;
			}
		}
	}
</style>
