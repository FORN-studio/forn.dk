<script>

    import Portrait from '$lib/assets/kontoreder.webp'
    import LargePili from '$lib/components/LargePili.svelte'
    import { m } from '$lib/paraglide/messages.js'
    import { gsap, ScrollTrigger } from '$lib/utils/gsap.svelte'
    import { onMount } from 'svelte';

    onMount(() => {
        gsap.to('.image-wrapper img', {
            scale: 1.4, // Increase scale by 20% during scroll
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
            <div class="pili-wrapper">
                <LargePili />
            </div>

            <img src={Portrait} alt="Eder" />
        </div>
        <span class="label">{m.self_portrait_label()}</span>
    </div>
</div>

<style lang="scss">

    @use 'src/lib/scss/variables' as *;

    .self-portrait {
        display: flex;
        flex-direction: row;
        position: relative;
        padding: 14rem 0;
        justify-content: center;
        align-items: center;

        @media (max-width: $mobile) {
            flex-direction: column;
        }

        .image-wrapper {
            display: flex;
            flex-direction: row;
            gap: .5rem;
            position: relative;
            z-index: 2;
            width: 70%;

            .inner-img-wrapper {
                width: 100%;
                height: 100%;
                overflow: hidden;
                border-radius: 20px;
                position: relative;

                .pili-wrapper {
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-template-rows: 1fr;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    width: 90%;
                    height: 90%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 2;
                }
            }

            @media (max-width: $mobile) {
                width: 100%;
                transform: scale(1);
            }

            .label {
                writing-mode: vertical-rl;
                margin-top: 1rem;

                @media (max-width: $mobile) {
                    max-height: 250px;
                }
            }

            img {
                width: 120%;
                height: 120%;
                object-fit: cover;
            }
        }
    }

</style>