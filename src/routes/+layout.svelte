<script>
	import '$lib/scss/main.scss'
	import '$lib/scss/reset.scss'
	import OffsetHandler from '$lib/components/OffsetHandler.svelte'

	let { children } = $props()
</script>

<OffsetHandler />

<div class="layout">
	<div class="wrapper">
		{@render children()}
	</div>
</div>

<style lang="scss">

	.layout {
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;

		.wrapper {
			max-width: 1700px;
			width: 100%;
			margin: 0 auto;
		}
	}

</style>