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

    const scrollOnce = (target) => {
        const current = emblaApi.selectedScrollSnap()
        
        if (current === target) return
        
        const direction = (current > target && current + 1 !== testimonials.length * 2) || current == 0 && target + 1 == testimonials.length * 2
            ? 'prev'
            : 'next'
        if (direction === 'next') emblaApi.scrollTo(current + 1)
        else if (direction === 'prev') emblaApi.scrollTo(current - 1)
    }

    const scrollToIdx = (idx) => {
        emblaApi.scrollTo(idx)
        console.log(emblaApi.selectedScrollSnap())
    }

</script>
<div class="embla" use:emblaCarouselSvelte={{ options: { loop: true, align: 'center' }, plugins: [Autoplay(), ClassNames()] }} onemblaInit={onEmblaInit}>

    <div class="embla__container">
        {#each [...testimonials, ...testimonials] as testimonial, i}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="embla__slide" onclick={(e) => {
                scrollOnce(i)
            }}>
                <SingleTestimonial {testimonial} />
            </div>
        {/each}
    </div>

</div>

<style lang="scss">

    @use 'src/lib/scss/variables.scss' as *;

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