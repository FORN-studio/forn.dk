<script>

    import Portrait from '$lib/assets/eder.jpg'
    import { scale } from 'svelte/transition'
    import LargePili from '$lib/components/LargePili.svelte'
    import { m } from '$lib/paraglide/messages.js'
    import { gsap, ScrollTrigger } from '$lib/utils/gsap.svelte'
    import { onMount } from 'svelte';

    onMount(() => {
        gsap.to('.image-wrapper img', {
            yPercent: -40, // Move image down by 100px during scroll
            ease: 'none',
            scrollTrigger: {
                trigger: '.self-portrait',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true, // Smooth scrubbing effect tied to scroll position
                invalidateOnRefresh: true // Recalculate on window resize
            }
        });
    })
</script>

<div class="self-portrait">
    <div class="image-wrapper">
        <div class="inner-img-wrapper">
            <img src={Portrait} alt="Eder" />
        </div>
        <span class="label">{m.self_portrait_label()}</span>
    </div>

    <div class="pili-wrapper">
        <LargePili />
    </div>
</div>

<style lang="scss">

    @use 'src/lib/scss/variables' as *;

    .self-portrait {
        display: flex;
        flex-direction: row;
        position: relative;
        padding: 14rem 0;

        @media (max-width: $mobile) {
            flex-direction: column;
        }

        .image-wrapper {
            display: flex;
            flex-direction: row;
            gap: .5rem;
            flex-basis: 50%;
            transform: scale(.85);
            position: relative;
            z-index: 2;

            .inner-img-wrapper {
                width: 100%;
                height: 100%;
                overflow: hidden;
            }

            @media (max-width: $mobile) {
                left: -20px;
            }

            .label {
                writing-mode: vertical-rl;

                @media (max-width: $mobile) {
                    max-height: 250px;
                }
            }

            img {
                width: 140%;
                height: 140%;
                object-fit: cover;
            }
        }

        .pili-wrapper {
            flex-basis: 50%;
            flex-grow: 1;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            justify-content: center;
            align-items: center;
        }
    }

</style>