<script>
	import { m } from '$lib/paraglide/messages'
	import { fly } from 'svelte/transition'
	import Ironwork from '$lib/components/Ironwork.svelte'

	let { story } = $props()

	let selfNode = $state(null)
	let outbound = $state(false)

	const toggleOutbound = (e) => {
		if (!selfNode.parentElement.classList.contains('is-snapped')) {
			e.preventDefault()
			return
		}

		outbound = !outbound
	}
</script>

<div
	class:outbound
	bind:this={selfNode}
	class="story-card"
	role="button"
	tabindex="0"
	aria-label={m.read_story()}
	title={m.read_story()}
	onclick={toggleOutbound}
	onkeydown={toggleOutbound}
>
	<Ironwork />

	<div class="body">
		<p>{story.description}</p>
	</div>

	<div class="signature">
		<span class="fraktur">{story.title}</span>
		<span class="title">{story.category}</span>
	</div>

	<div class="outbound-icon">
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
					d="M3 12L21 12M21 12L12.5 3.5M21 12L12.5 20.5"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				></path></svg
			>
		</span>
	</div>

	{#if outbound}
		<a
			transition:fly={{ duration: 500, y: 120, opacity: 1 }}
			class="outbound-link"
			href="/stories/{story.slug}"
			aria-label={m.read_story()}
			title={m.read_story()}
		>
			<span class="text">
				{m.read_story()}
			</span>
			<span class="icon">
				<svg
					width="24px"
					height="24px"
					viewBox="0 0 24 24"
					stroke-width="2"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					color="currentColor"
					><path
						d="M3 12L21 12M21 12L12.5 3.5M21 12L12.5 20.5"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path></svg
				>
			</span>
		</a>
	{/if}
</div>

<style lang="scss">
	@use 'src/lib/scss/variables.scss' as *;

	$padding: 2.5rem;

	.story-card {
		display: flex;
		flex-direction: column;
		padding: $padding;
		gap: 2rem;
		width: 500px;
		background-color: $white;
		position: relative;
		height: 100%;
		user-select: none;
		border: solid 1px $ultralight-grey;
		text-align: left;
		border-radius: 60px;
		text-decoration: none;
		transition: ease all 500ms;
		overflow: hidden;
		cursor: pointer;

		&:hover {
			transform: scale(1.02);
		}

		@media (max-width: $mobile) {
			width: 340px;
			padding: calc($padding / 2);
			border-radius: 40px;
		}

		& > * {
			transition: ease all 400ms;
			filter: grayscale(0);
		}

		&.outbound > *:not(.outbound-link) {
			opacity: 0.2;
			transform: translateY(-30px);
			filter: grayscale(1);
		}

		.outbound-link {
			position: absolute;
			bottom: 1rem;
			left: 1rem;
			right: 1rem;
			background-color: $accent;
			padding: 1.5rem 0.5rem;
			text-align: center;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			gap: 1rem;
			color: $white;
			transition: ease all 300ms;
			text-decoration: none;
			border-radius: 9999px;

			&:hover {
				box-shadow: rgba(0, 0, 139, 0.2) 0px 7px 29px 0px;
				transform: scale(1.02);
			}

			.icon {
				transform: translateY(1.5px);
			}

			.text {
				font-size: 1rem;
				font-weight: bold;
				letter-spacing: 2px;
			}
		}

		.outbound-icon {
			position: absolute;
			bottom: $padding;
			right: $padding;
			color: $accent;

			@media (max-width: $mobile) {
				bottom: calc($padding / 2);
				right: calc($padding / 2);
			}
		}

		div.body {
			p {
				text-transform: none;
				font-size: 1rem;
				color: $dark-grey;
				max-width: 350px;
			}
		}

		div.signature {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			gap: 0.5rem;
			margin-top: 5rem;
			flex-grow: 1;

			@media (max-width: $mobile) {
				margin-top: 0.5rem;
			}

			span.fraktur {
				font-size: 3.5rem;
				max-width: 7ch;
				line-height: 3.5rem;
				color: $accent;

				@media (max-width: $mobile) {
					font-size: 2rem;
					line-height: 2.5rem;
					max-width: 10ch;
				}
			}

			span.title {
				color: $light-grey;
				font-size: 0.85rem;
				max-width: 15ch;
			}
		}
	}
</style>
