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

</script>

<div class="embla" use:emblaCarouselSvelte={{ options: { loop: true, align: 'center' }, plugins: [Autoplay(), ClassNames()] }}>

    <div class="embla__container">
        {#each [...testimonials, ...testimonials] as testimonial}
            <div class="embla__slide">
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
        margin: 6rem 0;
        margin-left: -1rem;

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