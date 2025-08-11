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
			CVR 39172569
		</span>
		<span>
			{m.footer_symbols()}
		</span>
		<span>
			{m.footer_crafted_with()} 
			<span class="inline-icon">
				<svg width="16px" height="16px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M18 19V22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 16C18 15 17 14 15 14C14.6978 14 14.355 14 14.0002 14C12.3434 14 11 12.6569 11 11V8.5C11 7.11929 12.1193 6 13.5 6V6H14" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 16C22 11.5 20 10.5 18 10C20 9.5 22 9 22 6C22 3 19.5 2 18 2" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 19V22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><rect x="2" y="19" width="12" height="3" rx="0.6" stroke="#000000" stroke-width="1.5"></rect></svg>
			</span>
			+
			<span class="inline-icon">
				<svg width="16px" height="16px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M17 11.6V15C17 18.3137 14.3137 21 11 21H9C5.68629 21 3 18.3137 3 15V11.6C3 11.2686 3.26863 11 3.6 11H16.4C16.7314 11 17 11.2686 17 11.6Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 9C12 8 12.7143 7 14.1429 7V7C15.7208 7 17 5.72081 17 4.14286V3.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 9V8.5C8 6.84315 9.34315 5.5 11 5.5V5.5C12.1046 5.5 13 4.60457 13 3.5V3" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 11H18.5C19.8807 11 21 12.1193 21 13.5C21 14.8807 19.8807 16 18.5 16H17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
			</span>
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

		.inline-icon {
			color: $accent;
			display: inline-block;
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
