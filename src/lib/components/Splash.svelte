<script>
	import Logo from '$lib/assets/logo_full.svg'
	import Arrowhead from '$lib/assets/arrowhead.svg'
	import Pili from '$lib/components/Pili.svelte'
	import { onMount } from 'svelte'
	import { m } from '$lib/paraglide/messages.js'

	const piliCounts = [
		{ breakpoint: 999999, count: 11, extraRowCounts: [1, 2, 3, 9, 16, 13, 8, 3] },
		{ breakpoint: 1440, count: 8, extraRowCounts: [1, 1, 2, 3, 4, 5, 14] },
		{ breakpoint: 1024, count: 6, extraRowCounts: [2, 4, 7, 5, 3] },
		{ breakpoint: 768, count: 20, extraRowCounts: [2, 4, 7, 5, 3] }
	]

	let innerWidth = $state(0)
	let piliCount = $derived.by(() => {
		const idx = piliCounts.findIndex((piliCount) => innerWidth >= piliCount.breakpoint)
		return piliCounts[idx - 1]?.count || 20
	})

	let piliExtraRowCount = $derived.by(() => {
		const idx = piliCounts.findIndex((piliCount) => innerWidth >= piliCount.breakpoint)
		return piliCounts[idx - 1]?.extraRowCounts || [2, 4, 7, 5, 3]
	})

	let ready = $state(false)
	let softAnimations = $state(true)

	onMount(() => {
		const changedLocale = localStorage.getItem('changed-locale')

		console.log(changedLocale)

		if (!changedLocale || Date.now() - parseInt(changedLocale) > 60000) {
			softAnimations = false
			setTimeout(() => (ready = true), 10)
		} else {
			setTimeout(() => (ready = true), 10)
		}

		const logoElements = document.querySelectorAll('#FORN > path')
		logoElements.forEach((element) => {
			element.addEventListener('mouseenter', () => {
				if (!element.classList.contains('logo-ping')) {
					element.classList.add('logo-ping')

					setTimeout(() => {
						element.classList.remove('logo-ping')
					}, 1500)
				}
			})
		})
	})
</script>

<svelte:window bind:innerWidth />

<div class="splash" class:ready>
	<div class="inner">
		<div class="image-wrapper">

			<svg version="1.1" id="FORN" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				viewBox="0 0 747.2 423" style="enable-background:new 0 0 747.2 423;" xml:space="preserve">
			<style type="text/css">
				.st0{fill:#00218F;}
			</style>
			<path id="f" class="st0" d="M108,423.1H0V-0.1H180v72h-9
				c0-2.5-0.1-13.9-0.1-17.9c0-24.7-20.1-45.6-45.5-45.6c-5.2,0-67.5,0-71.9,0C26.9,8.5,8,30,8,53.8V144H180v72h-9c0-7.6,0-11.5,0-17.9
				c0-24.4-19.2-45.1-45.2-45.1c-0.4,0-36.8,0-37.2,0H8v167.5c0,4.9,0,36.3,0,48.2c0,25.1,20.2,45.3,45.3,45.3c13.2,0,46.4,0,54.7,0
				V423.1z"/>
			<path id="o" class="st0" d="M324.3-0.1L189-0.1l0,377.9
				c0,20.3,16.1,45.2,45.2,45.2h134.8l0.5-377.9C369.6,25.4,354.6-0.1,324.3-0.1z M359.1,305c0,22.4-18.5,45-45,45l-117,0
				c0,0,0-179.2,0-233.7c0-26.7,22.1-45.3,45.3-45.3h116.7C359.1,71,359.1,251.5,359.1,305z"/>
			<path id="r" class="st0" d="M472.8-0.1h-94.7l-0.5,423.1h180.6v-72h-9
				c-0.1,9.5,0,13.7,0,17.7c0,27.2-22.7,45.3-45.3,45.3H387.1v-26.7c0-24.1,19.5-45.3,45.4-45.3l126.2,0c0-6.3,0-15.3,0-31.2
				c0-46.5-37.7-85.9-85.9-85.9h-85.7v-9h171.1c0,0,0.6-121,0.5-130.2C558.7,39.6,522.2-0.1,472.8-0.1z M433.5,73.3
				c30.3,0,62.3,19.4,62.3,60.9C461.2,134.2,433.5,108.7,433.5,73.3z"/>
			<path id="n" class="st0" d="M747.2,44.8c0-25.9-21-44.9-45.1-44.9h-135v423.1
				h9V117.3c0-26.4,21.9-45.3,45.3-45.3l116.7,0V321c0,4.9,0,33,0,47.7c0,23.8-18.8,45.3-45.3,45.3c-13.2,0-43.4,0-51.1,0v9h105.4
				C747.2,423.1,747.2,117.3,747.2,44.8z"/>
			</svg>

		</div>

		<div class="decorative-wrapper">
			<div class="text-wrapper">
				<p>{m.splash_tagline_line1()} <br />{m.splash_tagline_line2()}</p>
				<div class="arrow-wrapper">
					<img src={Arrowhead} alt="Arrowhead" />
				</div>
			</div>

			<div class="pili-wrapper">
				{#each { length: piliCount } as _}
					<Pili />
				{/each}

				<div class="pili-extras-wrapper">
					{#each { length: piliExtraRowCount.length } as _, i}
						<div class="column">
							{#each { length: piliExtraRowCount[i] } as _}
								<Pili />
							{/each}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use 'src/lib/scss/variables' as *;

	.splash {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: calc(100vh - 2rem);
		position: relative;

		&:not(.ready):not(.soft-animations) {
			.pili-wrapper,
			.text-wrapper {
				opacity: 0;
			}

			.image-wrapper {
				transform: translateX(10%);
			}

			.image-wrapper path {
				fill: $white;
			}
		}

		&.soft-animations:not(.ready) {
			.pili-wrapper,
			.text-wrapper {
				opacity: 0;
			}
		}

		.inner {
			display: flex;
			flex-direction: row;
			height: 600px;
			width: 1200px;
			margin: auto;
			gap: 1rem;

			@media (max-width: $desktop) {
				width: 900px;
				height: 450px;
			}

			@media (max-width: $tablet) {
				width: 700px;
				height: 300px;
			}

			@media (max-width: $mobile) {
				width: 100%;
				height: 100dvh;
				flex-direction: column;
				gap: 1rem;
			}
		}

		.decorative-wrapper {
			display: flex;
			gap: 1rem;

			@media (max-width: $mobile) {
				flex-direction: row;
				justify-content: space-between;
				height: 50dvh;
			}
		}

		.pili-wrapper {
			position: relative;
			transition: ease all 500ms;
			transition-delay: 200ms;

			@media (max-width: $mobile) {
				display: flex;
				flex-direction: column;
				max-height: 300px;
				flex-wrap: wrap;
			}

			.pili-extras-wrapper {
				position: absolute;
				right: 0;
				display: flex;
				flex-direction: row;

				@media (max-width: $mobile) {
					display: none;
				}
			}
		}

		.image-wrapper {
			flex-grow: 1;
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
			transition: ease all 500ms;

			@media (max-width: $mobile) {
				flex-grow: 0;
			}

			svg {
				width: 100%;
				height: 100%;
				object-fit: contain;
				align-self: flex-start;

				> path {
					transition: ease all 500ms;

					&:nth-child(1) {
						transition-delay: 0ms;
					}
					&:nth-child(2) {
						transition-delay: 100ms;
					}
					&:nth-child(3) {
						transition-delay: 200ms;
					}
					&:nth-child(4) {
						transition-delay: 300ms;
					}
				}
			}
		}

		.text-wrapper {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			margin-left: 1rem;
			transition: ease all 500ms;
			transition-delay: 100ms;

			@media (max-width: $mobile) {
				margin-left: 0;
			}

			.arrow-wrapper {
				flex-grow: 1;
				display: flex;
				flex-direction: column;

				&::before {
					content: '';
					display: block;
					width: 1px;
					flex-grow: 1;
					background-color: $black;
				}

				img {
					width: 20px;
					height: 20px;
					margin-top: -20px;
				}
			}

			p {
				writing-mode: vertical-rl;
				text-transform: uppercase;
				transform: translateX(-8px);
				margin-bottom: 1rem;
			}
		}
	}

	:global(path.logo-ping) {
		animation: logo-ping 1.5s;
	}

	@keyframes logo-ping {
		0% {
			fill: $black;
		}

		100% {
			fill: #00218f; /* Match the original fill color */
		}
	}
</style>
