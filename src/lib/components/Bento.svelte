<script>
	import BentoGradient from '$lib/components/BentoGradient.svelte'
	import LargePili from '$lib/components/LargePili.svelte'
	import { lenis } from '$lib/utils/lenis'
	import { m } from '$lib/paraglide/messages'

	const icons = {
		platforms: `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v16"/><path d="m19 13 2-1a9 9 0 0 1-18 0l2 1"/><path d="M9 11h6"/><circle cx="12" cy="4" r="2"/></svg>`,
		ml: `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 8v8"/><path d="m8.5 14 7-4"/><path d="m8.5 10 7 4"/></svg>`,
		webapps: `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"/><path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/><circle cx="12" cy="12" r="10"/></svg>`,
		architecture: `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12.99 6.74 1.93 3.44"/><path d="M19.136 12a10 10 0 0 1-14.271 0"/><path d="m21 21-2.16-3.84"/><path d="m3 21 8.02-14.26"/><circle cx="12" cy="5" r="2"/></svg>`
	}
</script>

{#snippet textItem(title, subtitle, icon, paragraph)}
	<div class="item textual {icon}">
		<div class="icon">
			{@html icons[icon]}
		</div>

		<div class="title">
			<span class="subtitle">
				{subtitle}
			</span>

			<h3 class="title">
				{title}
			</h3>
		</div>

		<p>
			{paragraph}
		</p>

		<a
			class="cta"
			href="#contact"
			onclick={(e) => {
				e.preventDefault()
				const target = document.querySelector('#contact')
				lenis.scrollTo(target, { duration: 2 })
			}}
		>
			<span class="text">
				{m.nav_contact()}
			</span>
			<span class="icon">
				<svg
					width="24px"
					height="24px"
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
		</a>
	</div>
{/snippet}

<div class="bento">
	<div class="item portrait">
		<enhanced:img class="portrait-img" src="/static/polaroideder.webp" alt="Eder" />
	</div>

	{@render textItem(
		m.bento_one_title(),
		m.bento_one_subtitle(),
		'platforms',
		m.bento_one_paragraph()
	)}

	<div class="item pili">
		<LargePili />
	</div>

	{@render textItem(
		m.bento_two_title(),
		m.bento_two_subtitle(),
		'ml',
		m.bento_two_paragraph()
	)}

	{@render textItem(
		m.bento_three_title(),
		m.bento_three_subtitle(),
		'webapps',
		m.bento_three_paragraph()
	)}

	<div class="item gradient">
		<BentoGradient />
	</div>

	{@render textItem(
		m.bento_four_title(),
		m.bento_four_subtitle(),
		'architecture',
		m.bento_four_paragraph()
	)}
</div>

<style lang="scss">
	@use 'src/lib/scss/variables' as *;

	:global(.bento picture) {
		height: 100%;
	}

	.bento {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: stretch;
		gap: 20px;

		@media (max-width: $mobile) {
			margin-top: 8rem;
		}

		.item {
			flex-basis: 21%;
			flex-grow: 1;
			min-height: 250px;
			max-width: calc(100vh - 2rem);
			min-width: 300px;
			background-color: $white;
			border-radius: 40px;

			&.pili {
				display: flex;
				justify-content: center;
				align-items: center;
				border: solid 1px $ultralight-grey;
				overflow: hidden;
				padding: 120px;

				@media (max-width: 1560px) and (min-width: 942px) {
					display: none;
				}

				img {
					filter: opacity(0.25);
				}
			}

			&.textual {
				border: solid 1px $ultralight-grey;
				padding: 3rem;
				display: flex;
				flex-direction: column;
				gap: 3rem;

				@media (max-width: $mobile) {
					padding: 2rem;
				}

				@media (any-pointer: fine) {
					&:not(:hover) {
						a.cta {
							opacity: 0;
						}

						p {
							transform: translateY(40px);
						}
					}
				}

				a.cta {
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					gap: 0.5rem;
					align-items: center;
					margin-bottom: -1rem;
					margin-top: -1.5rem;
					text-decoration: none;
					transition: ease all 300ms;
					height: 20px;

					@media (max-width: $mobile) {
						margin-bottom: -0.5rem;
					}

					&:hover {
						gap: 1rem;
						color: $accent;
					}
				}

				&.webapps {
					flex-basis: 15%;
				}

				&.ml {
					min-width: 350px;

					@media (max-width: $mobile) {
						min-width: 310px;
					}
				}

				h3 {
					color: $accent;
					font-size: 3.5rem;
					white-space: pre-wrap;

					@media (max-width: $mobile) {
						font-size: 3rem;
					}
				}

				.subtitle {
					color: $light-grey;
				}

				p {
					text-transform: none;
					font-size: 1rem;
					margin-top: auto;
					transition: ease all 250ms;
				}

				.icon {
					color: $accent;
				}
			}

			&.portrait {
				overflow: hidden;
				min-width: 250px;

				.portrait-img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
		}
	}
</style>
