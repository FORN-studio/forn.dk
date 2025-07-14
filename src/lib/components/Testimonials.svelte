<script>

    import emblaCarouselSvelte from "embla-carousel-svelte";
    import Autoplay from "embla-carousel-autoplay";
    import ClassNames from "embla-carousel-class-names";
    import SingleTestimonial from "$lib/components/SingleTestimonial.svelte";
    import { m } from "$lib/paraglide/messages";

    const testimonials = [
        {
            signature: 'signatures/victor.png',
            title: 'CEO at ePact',
            name: 'Victor P. Holmark',
            testimonial: m.victor_testimonial(),
            profile_picture: 'testimonial_profiles/victor.webp',
            url: 'https://www.epact.dk/'
        },
        {
            signature: 'signatures/fady.png',
            title: 'Marketing Lead at K-Ink',
            name: 'Fady Allan',
            testimonial: m.fady_testimonial(),
            profile_picture: 'testimonial_profiles/fady.webp',
            url: 'https://k-ink.forn.dk/'
        },
        {
            signature: 'signatures/dino.png',
            title: 'CEO at Dinomite',
            name: 'Dino Visnjic',
            testimonial: m.dino_testimonial(),
            profile_picture: 'testimonial_profiles/dino.webp',
            url: 'https://dinomite.dk/'
        },
        {
            signature: 'signatures/mette.png',
            title: 'Selvstændig Psykolog',
            name: 'Mette Bratlann',
            testimonial: m.mette_testimonial(),
            profile_picture: 'testimonial_profiles/mette.webp',
            url: 'https://mettebratlann.dk/'
        },
    ]

    let emblaApi = $state(null)
    const onEmblaInit = (event) => {
        emblaApi = event.detail
    }

    const onEmblaSelect = (event) => {
        console.log(e)
    }

    const getSlideIdx = (name) => {
        return testimonials.findIndex(t => t.name == name)
    }

    const scrollTo = (target) => {
        const current = emblaApi.selectedScrollSnap()

        if (current === target) return

        const total = testimonials.length * 2

        // find best path to target (least steps)
        const fw = (target - current + total) % total
        const bw = (current - target + total) % total
        const direction = fw <= bw ? 1 : -1

        emblaApi.scrollTo(current + direction)
    }

</script>

<div class="swipe-indicator">
    <div class="arrow">
        <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M20 14C18.8954 14 18 13.1046 18 12C18 10.8954 18.8954 10 20 10C21.1046 10 22 10.8954 22 12C22 13.1046 21.1046 14 20 14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 12H2M2 12L5 9M2 12L5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    </div>

    <span class="text">Scroll</span>

    <div class="arrow">
        <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M4 14C2.89543 14 2 13.1046 2 12C2 10.8954 2.89543 10 4 10C5.10457 10 6 10.8954 6 12C6 13.1046 5.10457 14 4 14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 12H22M22 12L19 9M22 12L19 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    </div>
</div>

<div class="embla" use:emblaCarouselSvelte={{ options: { loop: true, align: 'center' }, plugins: [Autoplay(), ClassNames()] }} onemblaInit={onEmblaInit}>

    <div class="embla__container">
        {#each [...testimonials, ...testimonials] as testimonial, i}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="embla__slide" onclick={(e) => {
                scrollTo(i)
            }}>
                <SingleTestimonial {testimonial} />
            </div>
        {/each}
    </div>

</div>

<style lang="scss">

    @use 'src/lib/scss/variables.scss' as *;

    .swipe-indicator {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin-bottom: -1rem;
        margin-top: 1rem;
        
        .text, .arrow {
            color: $light-grey;
        }

        .text {
            margin-top: -.3rem;
        }
    }

    .embla {
        overflow: hidden;
        width: calc(100% + 2rem);
        border-right: solid 1px $ultralight-grey;
        border-left: solid 1px $ultralight-grey;
        margin: 2rem 0;
        margin-bottom: 0;
        margin-left: -1rem;

        @media (max-width: $mobile) {
            margin-bottom: -1rem;
            margin-top: 0rem;
        }

        .embla__container {
            display: flex;
            flex-direction: row;
            align-items: stretch;
            padding: calc($p-inset / 2);
            gap: calc($p-inset / 2);

            .embla__slide {
                transition: ease opacity 500ms, ease filter 500ms;
            }
        }
    }

    :global(.embla__slide:not(.is-snapped)) {
        opacity: .3;
        filter: grayscale(1);
    }

</style>