<script>
	import { onMount } from 'svelte'

	let lines = $state([])
	let id = 0

	const rand = (min, max) => Math.random() * (max - min) + min

	const spawn = () => {
		const line = {
			id: id++,
			x: rand(0, 100),
			y: rand(0, 100),
			rotation: rand(0, 180),
			width: rand(40, 100),
			life: rand(300, 1200),
			visible: false
		}
		lines.push(line)

		requestAnimationFrame(() => {
			const idx = lines.findIndex((l) => l.id === line.id)
			if (idx !== -1) lines[idx].visible = true
		})

		setTimeout(() => {
			const idx = lines.findIndex((l) => l.id === line.id)
			if (idx !== -1) lines[idx].visible = false
			setTimeout(() => {
				lines = lines.filter((l) => l.id !== line.id)
			}, 250)
		}, line.life)
	}

	onMount(() => {
		spawn()
		setTimeout(spawn, 200)
		setTimeout(spawn, 400)

		const interval = setInterval(spawn, rand(250, 450))
		return () => clearInterval(interval)
	})
</script>

<div class="ironwork">
	<div class="anchor"></div>
	{#each lines as line (line.id)}
		<div
			class="line"
			class:visible={line.visible}
			style="
				top: {line.y}%;
				left: {line.x}%;
				width: {line.width}%;
				transform: translate(-50%, -50%) rotate({line.rotation}deg);
			"
		></div>
	{/each}
</div>

<style lang="scss">
	@use 'src/lib/scss/variables.scss' as *;

	.ironwork {
		width: 42px;
		height: 42px;
		position: relative;
		overflow: visible;
	}

	.anchor {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 2px solid $ultralight-grey;
		transform: translate(-50%, -50%);
	}

	.line {
		position: absolute;
		height: 1.5px;
		background-color: $accent;
		border-radius: 1px;
		opacity: 0;
		transition: opacity 250ms ease;

		&.visible {
			opacity: 1;
		}
	}
</style>
