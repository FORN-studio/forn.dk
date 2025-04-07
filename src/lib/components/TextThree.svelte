<script>

    import Pili from '$lib/components/Pili.svelte'
    import { spring } from 'svelte/motion'
    import { browser } from '$app/environment'
    import { m } from '$lib/paraglide/messages.js'

    const piliCounts = [
        { breakpoint: 999999, count: 22, radius: 400 },
        { breakpoint: 1440, count: 22, radius: 400 },
        { breakpoint: 1024, count: 20, radius: 300 },
        { breakpoint: 768, count: 18, radius: 250 }
    ]

    let innerWidth = $state(0)
    let piliCount = $derived.by(() => {
        const idx = piliCounts.findIndex(piliCount => innerWidth >= piliCount.breakpoint)
        return piliCounts[idx - 1]?.count || piliCounts[3].count
    })

    let radius = $derived.by(() => {
        const idx = piliCounts.findIndex(piliCount => innerWidth >= piliCount.breakpoint)
        return piliCounts[idx - 1]?.radius || piliCounts[3].radius
    })

    let scrollY = $state(0);
    let circleElement = $state(null);
    let parallaxOffset = spring(0, {
        stiffness: 0.02,
        damping: 0.5
    })

    const handleScroll = () => {
        if (!browser || !circleElement) return

        const rect = circleElement.getBoundingClientRect();
        const scrolled = (rect.top + rect.height / 2) - (window.innerHeight / 2);

        $parallaxOffset = scrolled / 20;
    }

</script>

<svelte:window bind:innerWidth bind:scrollY onscroll={handleScroll} />

<div class="centered-text">
    <div class="text-wrapper">
        <p>{m.text_three_intro()}</p>
        <h2>{m.text_three_heading()}</h2>
        <p class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 16.1716L18.3641 10.8076L19.7783 12.2218L12.0001 20L4.22192 12.2218L5.63614 10.8076L11.0001 16.1716V4H13.0001V16.1716Z"></path></svg>
        </p>
    </div>

    <div class="pili-circle-wrapper">
        <div class="pili-circle" bind:this={circleElement} style="--offset: {$parallaxOffset}deg; --radius: {radius}px;">
            {#each Array(piliCount) as _, i}
                <div 
                    class="pili-wrapper" 
                    style="--angle: {(i * 360 / piliCount)}deg;"
                >
                    <Pili />
                </div>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">

    @use 'src/lib/scss/variables' as *;

    .centered-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 22rem 0;
        text-align: center;
        gap: 2rem;
        position: relative;
        margin-top: 8rem;

        @media (max-width: $mobile) {
            margin-top: 0;
            padding: 8rem 0;
        }

        .icon {
            text-align: center;
            display: inline-block;
            width: 100%;
            
            svg {
                width: 24px;
                height: 24px;
                position: relative;
                animation: indicate 2s ease infinite;
            }
        }

        .text-wrapper {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            p {
                @media (max-width: $mobile) {
                    max-width: 250px;
                }
            }
        }

        .pili-circle {
            position: absolute;
            width: calc(var(--radius, 150px) * 2);
            height: calc(var(--radius, 150px) * 2);
            left: 50%;
            top: 45%;
            transform: translate(-50%, -50%) rotate(var(--offset));
            
            .pili-wrapper {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                transform-origin: center;
                transform: rotate(var(--angle));
                
                :global(.pili) {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }
        }
    }

    @keyframes indicate {
        0%, 100% {
            transform: translateY(0);
        }

        50% {
            transform: translateY(10px);
        }
    }

</style>