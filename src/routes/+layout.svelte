<script>
	import '$lib/scss/main.scss'
	import '$lib/scss/reset.scss'
	import { locales, getLocale, setLocale } from '$lib/paraglide/runtime'
	import { lenis, easeInOutCubic } from '$lib/utils/lenis'
	import { onDestroy } from 'svelte'
	import { onNavigate, afterNavigate } from '$app/navigation'
	import { m } from '$lib/paraglide/messages'
	import { href } from '$lib/utils/href.js'

	let { children } = $props()

	let scrollY = $state(0)
	let lastScrollY = $state(0)
	let shy = $state(false)

	const setLocaleWithoutAnimations = (locale) => {
		localStorage.setItem('changed-locale', Date.now().toString())
		setLocale(locale)
	}

	onDestroy(() => {
		if (lenis) lenis.destroy()
	})

	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})

	// lenis keeps its own scroll state, so sveltekit's reset doesn't reach it
	afterNavigate(({ to, type }) => {
		if (type === 'popstate' || to?.url.hash) return
		lenis?.scrollTo(0, { immediate: true })
	})

	const handleScroll = () => {
		const scrollingDown = lastScrollY < scrollY
		shy = scrollingDown && scrollY > 200
		lastScrollY = scrollY
	}
</script>

<svelte:window bind:scrollY onscroll={handleScroll} />

<nav class:hidden={shy && scrollY > 100} class:floating={scrollY > 300}>
	<div class="cta">
		<button
			class="locale-toggle"
			onclick={() => setLocaleWithoutAnimations(getLocale() === 'da' ? 'en' : 'da')}
		>
			<span class="lang da" class:active={getLocale() === 'da'}>DA</span>
			<div class="handle-wrapper" class:toggled={getLocale() === 'en'}>
				<div class="handle">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
						><path
							d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9.71002 19.6674C8.74743 17.6259 8.15732 15.3742 8.02731 13H4.06189C4.458 16.1765 6.71639 18.7747 9.71002 19.6674ZM10.0307 13C10.1811 15.4388 10.8778 17.7297 12 19.752C13.1222 17.7297 13.8189 15.4388 13.9693 13H10.0307ZM19.9381 13H15.9727C15.8427 15.3742 15.2526 17.6259 14.29 19.6674C17.2836 18.7747 19.542 16.1765 19.9381 13ZM4.06189 11H8.02731C8.15732 8.62577 8.74743 6.37407 9.71002 4.33256C6.71639 5.22533 4.458 7.8235 4.06189 11ZM10.0307 11H13.9693C13.8189 8.56122 13.1222 6.27025 12 4.24799C10.8778 6.27025 10.1811 8.56122 10.0307 11ZM14.29 4.33256C15.2526 6.37407 15.8427 8.62577 15.9727 11H19.9381C19.542 7.8235 17.2836 5.22533 14.29 4.33256Z"
						></path></svg
					>
				</div>
			</div>
			<span class="lang en" class:active={getLocale() === 'en'}>EN</span>
		</button>

		<div class="backdrop"></div>
	</div>

	<a
		href={href('/#contact')}
		class="button"
		onclick={(e) => {
			const target = document.querySelector('#contact')
			if (target) {
				e.preventDefault()
				lenis.scrollTo(target, { duration: 2 })
			}
		}}
	>
		<span class="text">
			{m.nav_contact()}
		</span>

		<span class="icon">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
				><path
					d="M16 13V5H6V13C6 14.1046 6.89543 15 8 15H14C15.1046 15 16 14.1046 16 13ZM5 3H20C21.1046 3 22 3.89543 22 5V8C22 9.10457 21.1046 10 20 10H18V13C18 15.2091 16.2091 17 14 17H8C5.79086 17 4 15.2091 4 13V4C4 3.44772 4.44772 3 5 3ZM18 5V8H20V5H18ZM2 19H20V21H2V19Z"
				></path></svg
			>
		</span>
	</a>
</nav>

<a class="awwwards" href="https://www.awwwards.com/sites/forn-studio" target="_blank" rel="noopener">
	<svg width="53.08" height="171.358" aria-label="Awwwards">
		<path class="js-color-bg" fill="black" d="M0 0h53.08v171.358H0z"></path>
		<g class="js-color-text" fill="white"><path d="M20.047 153.665v-1.9h3.888v-4.093h-3.888v-1.9h10.231v1.9h-4.59v4.093h4.59v1.9zM29.898 142.236c-.331.565-.784.997-1.359 1.294s-1.222.446-1.944.446c-.721 0-1.369-.149-1.943-.446a3.316 3.316 0 0 1-1.36-1.294c-.331-.564-.497-1.232-.497-2.002s.166-1.438.497-2.002a3.316 3.316 0 0 1 1.36-1.294c.574-.297 1.223-.445 1.943-.445.723 0 1.369.148 1.944.445a3.307 3.307 0 0 1 1.359 1.294c.331.564.497 1.232.497 2.002s-.166 1.438-.497 2.002m-1.703-3.347c-.435-.33-.967-.496-1.601-.496-.633 0-1.166.166-1.601.496-.433.332-.649.78-.649 1.346 0 .564.217 1.013.649 1.345.435.331.968.497 1.601.497.634 0 1.166-.166 1.601-.497.435-.332.649-.78.649-1.345.001-.566-.214-1.014-.649-1.346M22.911 134.852v-1.813h1.186a3.335 3.335 0 0 1-.951-1.009 2.423 2.423 0 0 1-.352-1.271c0-.682.19-1.229.57-1.645.381-.413.932-.621 1.652-.621h5.262v1.812h-4.721c-.419 0-.727.096-.921.285-.195.19-.292.447-.292.769 0 .302.115.58.35.833.234.254.577.458 1.03.613.454.156.993.234 1.616.234h2.938v1.813h-7.367zM29.898 125.136a3.314 3.314 0 0 1-1.359 1.294c-.575.297-1.222.445-1.944.445-.721 0-1.369-.148-1.943-.445a3.322 3.322 0 0 1-1.36-1.294c-.331-.565-.497-1.232-.497-2.002 0-.771.166-1.438.497-2.003a3.313 3.313 0 0 1 1.36-1.293c.574-.297 1.223-.446 1.943-.446.723 0 1.369.149 1.944.446s1.028.728 1.359 1.293.497 1.232.497 2.003c.001.769-.166 1.436-.497 2.002m-1.703-3.347c-.435-.331-.967-.497-1.601-.497-.633 0-1.166.166-1.601.497-.433.331-.649.778-.649 1.345 0 .564.217 1.013.649 1.344.435.332.968.498 1.601.498.634 0 1.166-.166 1.601-.498.435-.331.649-.779.649-1.344.001-.567-.214-1.014-.649-1.345M22.911 117.75v-1.812h1.199c-.419-.265-.742-.586-.972-.966s-.345-.784-.345-1.213c0-.272.05-.569.146-.892l1.682.336a1.429 1.429 0 0 0-.205.76c0 .576.261 1.048.783 1.418.521.37 1.342.557 2.461.557h2.617v1.812h-7.366zM29.812 111.252c-.391.511-.857.851-1.403 1.016l-.776-1.446c.381-.138.68-.329.893-.577.215-.249.321-.544.321-.885a1.2 1.2 0 0 0-.168-.658c-.112-.175-.294-.263-.548-.263-.225 0-.406.105-.548.313-.142.21-.291.534-.446.973-.019.068-.058.17-.117.307-.224.565-.506 1.004-.848 1.315-.34.313-.779.467-1.314.467-.381 0-.727-.102-1.039-.306a2.185 2.185 0 0 1-.744-.84 2.554 2.554 0 0 1-.279-1.207c0-.497.105-.949.314-1.359.211-.408.506-.725.886-.949l.993 1.082c-.43.292-.644.686-.644 1.184a.84.84 0 0 0 .154.504.471.471 0 0 0 .401.212c.176 0 .338-.103.49-.307.15-.205.334-.604.547-1.199.205-.564.474-1.001.805-1.308.332-.308.756-.46 1.271-.46.721 0 1.299.229 1.732.687s.65 1.057.65 1.797c.001.759-.194 1.396-.583 1.907M35.481 17.006l-4.782 14.969h-3.266l-2.584-9.682-2.584 9.682h-3.268l-4.782-14.969h3.713l2.673 10.276 2.525-10.276h3.445l2.524 10.276 2.674-10.276zM37.978 27.163c1.426 0 2.496 1.068 2.496 2.495 0 1.425-1.07 2.495-2.496 2.495-1.425 0-2.494-1.07-2.494-2.495-.001-1.427 1.069-2.495 2.494-2.495"></path></g>
	</svg>
</a>

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
			border-top: solid 1px $ultralight-grey;

			&.hidden {
				transform: translateY(200%);
			}
		}

		@media (min-width: $mobile) {
			border-bottom: solid 1px transparent;
			background-color: $broken-white;

			&.floating {
				border-color: $ultralight-grey;
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

	.awwwards {
		position: fixed;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
		z-index: 999;
		line-height: 0;
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
		gap: 0.5rem;
		align-items: center;
		border-radius: 20px 0 20px 0;

		> * {
			pointer-events: none;
		}

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
</style>
