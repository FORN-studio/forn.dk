<script>
	import '$lib/scss/main.scss'
	import '$lib/scss/reset.scss'
	import OffsetHandler from '$lib/components/OffsetHandler.svelte'
	import { locales, getLocale, setLocale } from '$lib/paraglide/runtime'
	import { gsap, ScrollTrigger, lenis, ticker } from '$lib/utils/gsap.svelte'
	import { onDestroy } from 'svelte'

	let { children } = $props()

	let scrollY = $state(0)

	const setLocaleWithoutAnimations = (locale) => {
		localStorage.setItem('changed-locale', Date.now().toString())
		setLocale(locale)
	}

	onDestroy(() => {
		if (ticker) gsap.ticker.remove(ticker)
		if (lenis) lenis.destroy()
	})

</script>

<svelte:window bind:scrollY />

<OffsetHandler />

<nav class:hidden={scrollY > 100}>

	<button class="locale-toggle" onclick={() => setLocaleWithoutAnimations(getLocale() === 'da' ? 'en' : 'da')}>
		<span class="lang da" class:active={getLocale() === 'da'}>DA</span>
		<div class="handle-wrapper" class:toggled={getLocale() === 'en'}>
			<div class="handle">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9.71002 19.6674C8.74743 17.6259 8.15732 15.3742 8.02731 13H4.06189C4.458 16.1765 6.71639 18.7747 9.71002 19.6674ZM10.0307 13C10.1811 15.4388 10.8778 17.7297 12 19.752C13.1222 17.7297 13.8189 15.4388 13.9693 13H10.0307ZM19.9381 13H15.9727C15.8427 15.3742 15.2526 17.6259 14.29 19.6674C17.2836 18.7747 19.542 16.1765 19.9381 13ZM4.06189 11H8.02731C8.15732 8.62577 8.74743 6.37407 9.71002 4.33256C6.71639 5.22533 4.458 7.8235 4.06189 11ZM10.0307 11H13.9693C13.8189 8.56122 13.1222 6.27025 12 4.24799C10.8778 6.27025 10.1811 8.56122 10.0307 11ZM14.29 4.33256C15.2526 6.37407 15.8427 8.62577 15.9727 11H19.9381C19.542 7.8235 17.2836 5.22533 14.29 4.33256Z"></path></svg>
			</div>
		</div>
		<span class="lang en" class:active={getLocale() === 'en'}>EN</span>
	</button>
</nav>

<div class="layout">
	<div class="wrapper">
		{@render children()}
	</div>
</div>

<style lang="scss">

	@use 'src/lib/scss/variables' as *;

	nav {
		position: fixed;
		top: 20px;
		left: 20px;
		z-index: 10;
		transition: ease all 300ms;

		&.hidden {
			transform: translateY(-200%);
		}

		@media (max-width: $mobile) {
			top: auto;
			left: auto;
			right: 20px;
			bottom: 20px;

			&.hidden {
				transform: translateY(200%);
			}
		}

		button {
			display: flex;
			flex-direction: row;
			border: none;
			align-items: center;
			justify-content: center;
			gap: 1rem;

			.handle-wrapper {
				width: 3rem;
				border-radius: 9999px;
				border: solid 2px $black;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-top: -0.2rem;

				&.toggled {
					.handle {
						transform: translateX(calc(3rem - 1.3rem - 0.3rem));
					}
				}

				.handle {
					width: 1.3rem;
					height: 1.3rem;
					color: $black;
					transition: ease all 500ms;
					transform: translateX(0);
				}
			}
		}

		span.lang {
			transition: ease all 500ms;

			&.active {
				color: $accent;
			}
		}
	}

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