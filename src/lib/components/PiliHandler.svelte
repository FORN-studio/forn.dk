<script>
	import { onMount } from 'svelte'
	import { focus } from '$lib/utils/state.svelte'

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

	onMount(() => {
		let intervalId = null
		const CHANGE_PROBABILITY = 0.2
		const INTERVAL_MS = 250
		const visiblePilis = new Set()

		const piliElements = document.querySelectorAll('.pili.living:not(.preset)')

		// Use IntersectionObserver for better performance
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visiblePilis.add(entry.target)
					} else {
						visiblePilis.delete(entry.target)
					}
				})
			},
			{
				threshold: 0.1 // Trigger when 10% visible
			}
		)

		// Observe all pili elements
		piliElements.forEach((el) => observer.observe(el))

		document.addEventListener('visibilitychange', () => {
			focus.focused = !document.hidden

			if (document.hidden && intervalId) {
				clearInterval(intervalId)
				intervalId = null
			} else if (!document.hidden && !intervalId) {
				startInterval()
			}
		})

		function startInterval() {
			intervalId = setInterval(() => {
				if (!focus.focused || visiblePilis.size === 0) return

				// Process only visible pilis
				visiblePilis.forEach((element) => {
					if (Math.random() < CHANGE_PROBABILITY) {
						const img = element.querySelector('img')
						if (img) {
							const randomId = ids[Math.floor(Math.random() * ids.length)]
							img.src = `/asapili/${randomId}.svg`
						}
					}
				})
			}, INTERVAL_MS)
		}

		// Start the interval
		startInterval()

		return () => {
			if (intervalId) {
				clearInterval(intervalId)
			}
			observer.disconnect()
		}
	})
</script>
