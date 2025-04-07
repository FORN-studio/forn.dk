<script>

    import { offset } from '$lib/utils/state.svelte.js';
    import { spring } from 'svelte/motion';

    let screenDimensions = $state({ width: 0, height: 0 })

    let offsetSpring = spring({ x: 0, y: 0 }, {
        stiffness: 0.01,
        damping: 0.3,
    })

    $effect(() => {
        offset.x = ($offsetSpring.x - (screenDimensions.width / 2)) / 30;
        offset.y = ($offsetSpring.y - (screenDimensions.height / 2)) / 30;
    })

    const handleMouseMove = (e) => {
        $offsetSpring = { x: e.clientX, y: e.clientY }
    }

    const handleOrientation = (e) => {
        $offsetSpring = { x: e.gamma * 20, y: e.beta * 20 }
    }

</script>

<svelte:window bind:innerHeight={screenDimensions.height} bind:innerWidth={screenDimensions.width} onmousemove={handleMouseMove} ondeviceorientation={handleOrientation} />