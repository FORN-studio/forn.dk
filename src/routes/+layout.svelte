<script>
	import '$lib/scss/main.scss'
	import '$lib/scss/reset.scss'

	let { children } = $props()
</script>

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

		.wrapper {
			max-width: 1600px;
			margin: 0 auto;
		}
	}

</style>