<script>
	import '$lib/scss/main.scss'
	import '$lib/scss/reset.scss'
	import { locales, getLocale, setLocale } from '$lib/paraglide/runtime'
	import { gsap, lenis, ticker, easeInOutCubic } from '$lib/utils/gsap.svelte'
	import { onDestroy } from 'svelte'
	import { m } from '$lib/paraglide/messages'

	let { children } = $props()

	let scrollY = $state(0)
	let lastScrollY = $state(0)
	let shy = $state(false)

	const setLocaleWithoutAnimations = (locale) => {
		localStorage.setItem('changed-locale', Date.now().toString())
		setLocale(locale)
	}

	onDestroy(() => {
		if (ticker) gsap.ticker.remove(ticker)
		if (lenis) lenis.destroy()
	})

	const handleScroll = () => {
		const scrollingDown = lastScrollY < scrollY
		shy = scrollingDown && scrollY > 200
		lastScrollY = scrollY
	}

</script>

<svelte:window bind:scrollY onscroll={handleScroll} />

<nav class:hidden={shy} class:floating={scrollY > 300}>

	<div class="cta">
		<button class="locale-toggle" onclick={() => setLocaleWithoutAnimations(getLocale() === 'da' ? 'en' : 'da')}>
			<span class="lang da" class:active={getLocale() === 'da'}>DA</span>
			<div class="handle-wrapper" class:toggled={getLocale() === 'en'}>
				<div class="handle">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9.71002 19.6674C8.74743 17.6259 8.15732 15.3742 8.02731 13H4.06189C4.458 16.1765 6.71639 18.7747 9.71002 19.6674ZM10.0307 13C10.1811 15.4388 10.8778 17.7297 12 19.752C13.1222 17.7297 13.8189 15.4388 13.9693 13H10.0307ZM19.9381 13H15.9727C15.8427 15.3742 15.2526 17.6259 14.29 19.6674C17.2836 18.7747 19.542 16.1765 19.9381 13ZM4.06189 11H8.02731C8.15732 8.62577 8.74743 6.37407 9.71002 4.33256C6.71639 5.22533 4.458 7.8235 4.06189 11ZM10.0307 11H13.9693C13.8189 8.56122 13.1222 6.27025 12 4.24799C10.8778 6.27025 10.1811 8.56122 10.0307 11ZM14.29 4.33256C15.2526 6.37407 15.8427 8.62577 15.9727 11H19.9381C19.542 7.8235 17.2836 5.22533 14.29 4.33256Z"></path></svg>
				</div>
			</div>
			<span class="lang en" class:active={getLocale() === 'en'}>EN</span>
		</button>

		<div class="backdrop"></div>
	</div>

	<a href="#contact" class="button" onclick={(e) => {
		e.preventDefault()
		const targetId = e.target.hash
		const target = document.querySelector(targetId)
		lenis.scrollTo(target, { duration: 2 })
	}}>
		<span class="text">
			{m.nav_contact()}
		</span>

		<span class="icon">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 13V5H6V13C6 14.1046 6.89543 15 8 15H14C15.1046 15 16 14.1046 16 13ZM5 3H20C21.1046 3 22 3.89543 22 5V8C22 9.10457 21.1046 10 20 10H18V13C18 15.2091 16.2091 17 14 17H8C5.79086 17 4 15.2091 4 13V4C4 3.44772 4.44772 3 5 3ZM18 5V8H20V5H18ZM2 19H20V21H2V19Z"></path></svg>
		</span>
	</a>
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
		top: 0;
		left: 0;
		padding: 20px;
		background-color: $white;
		z-index: 100;
		transition: ease all 500ms;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;


		&.hidden {
			transform: translateY(-200%);
		}

		@media (max-width: $mobile) {
			top: auto;
			left: auto;
			right: 0;
			left: 0;
			bottom: 0;
			width: 100%;
			padding: 1rem;
			background-color: $white;
			box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

			&.hidden {
				transform: translateY(200%);
			}
		}

		@media (min-width: $mobile) {
			border-bottom: solid 1px transparent;

			&.floating {
				box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
			}
		}

		button.locale-toggle {
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
				background-color: $white;

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
			max-width: 1920px;
			width: 100%;
			margin: 0 auto;
		}
	}

	.button {
		padding: 10px 20px 6px 20px;
		transition: ease all 500ms;
		display: flex;
		flex-direction: row;
		gap: .5rem;
		align-items: center;
		border-radius: 20px 0 20px 0;

		> * { pointer-events: none; }

		.icon {
			width: 20px;
			height: 22px;
		}
		
		&:hover {
			text-decoration: none;
			color: $accent;
			transform: scale(1.05);
		}
	}

	@keyframes animate-shadow {
		0% {
			box-shadow: rgba($accent, 0.36) 0px 10px 36px 0px, rgba($accent, 0.16) 0px 0px 0px 1px, inset rgba($accent, 0.16) 0px 3px 16px 0px;
		}
		25% {
			box-shadow: rgba($accent, 0.26) 2px 7px 16px 3px, rgba($accent, 0.16) 0px 0px 0px 1px, inset rgba($accent, 0.16) 0px 3px 16px 0px;
		}
		50% {
			box-shadow: rgba($accent, 0.45) -3px 18px 46px -5px, rgba($accent, 0.16) 0px 0px 0px 1px, inset rgba($accent, 0.16) 0px 3px 16px 0px;
		}
		75% {
			box-shadow: rgba($accent, 0.20) 0px 3px 15px 1px, rgba($accent, 0.16) 0px 0px 0px 1px, inset rgba($accent, 0.16) 0px 3px 16px 0px;
		}
		100% {
			box-shadow: rgba($accent, 0.36) 0px 10px 36px 0px, rgba($accent, 0.16) 0px 0px 0px 1px, inset rgba($accent, 0.16) 0px 3px 16px 0px;
		}
	}

</style>