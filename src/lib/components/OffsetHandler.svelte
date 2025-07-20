<script>
	import { offset } from '$lib/utils/state.svelte.js'
	import { spring } from 'svelte/motion'
	import { onMount } from 'svelte'

	let screenDimensions = $state({ width: 0, height: 0 })
	let rafId = null
	let lastUpdate = 0
	const THROTTLE_MS = 50 // Update at most every 50ms

	let offsetSpring = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.01,
			damping: 0.3
		}
	)

	$effect(() => {
		offset.x = ($offsetSpring.x - screenDimensions.width / 2) / 30
		offset.y = ($offsetSpring.y - screenDimensions.height / 2) / 30
	})

	const updatePosition = (x, y) => {
		const now = Date.now()
		if (now - lastUpdate < THROTTLE_MS) return

		lastUpdate = now
		if (rafId) cancelAnimationFrame(rafId)

		rafId = requestAnimationFrame(() => {
			$offsetSpring = { x, y }
		})
	}

	const handleMouseMove = (e) => {
		updatePosition(e.clientX, e.clientY)
	}

	const handleOrientation = (e) => {
		updatePosition(e.gamma * 20, e.beta * 20)
	}

	onMount(() => {
		return () => {
			if (rafId) cancelAnimationFrame(rafId)
		}
	})
</script>

<svelte:window
	bind:innerHeight={screenDimensions.height}
	bind:innerWidth={screenDimensions.width}
	onmousemove={handleMouseMove}
	ondeviceorientation={handleOrientation}
/>
