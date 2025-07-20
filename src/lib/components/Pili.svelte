<script>
	let { initialSymbol = 'asa' } = $props()
</script>

<div class="pili living" class:preset={initialSymbol !== 'asa'}>
	<img src={`/asapili/${initialSymbol}.svg`} alt="Pili" />
</div>

<style lang="scss">
	@use 'src/lib/scss/variables' as *;

	.pili {
		width: 60px;
		height: 60px;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		&:hover {
			animation: ping 1.5s;
		}

		@media (max-width: $tablet) and (min-width: $mobile) {
			width: 55px;
			height: 55px;
		}

		@media (max-width: $mobile) {
			width: 45px;
			height: 45px;
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
			grid-column: 1;
			grid-row: 1;
		}
	}

	@keyframes ping {
		0% {
			filter: brightness(0) saturate(100%) invert(11%) sepia(86%) saturate(5000%) hue-rotate(224deg)
				brightness(94%) contrast(106%);
		}

		100% {
			filter: none;
		}
	}
</style>
