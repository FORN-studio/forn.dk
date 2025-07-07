<script>

    import { m } from "$lib/paraglide/messages";
    import Pili from "$lib/components/Pili.svelte";

    let { testimonial } = $props()

    let selfNode = $state(null)

</script>

<a bind:this={selfNode} target="_blank" class="testimonial" href={testimonial.url} aria-label={m.visit_site()} title={m.visit_site()} onclick={(e) => {
    if (!selfNode.parentElement.classList.contains('is-snapped')) {
        e.preventDefault()
    }
}}>
    <div class="img">
        <img src={testimonial.profile_picture} alt="Profile image of {testimonial.name}" />
    </div>

    <div class="body">
        <p>"{testimonial.testimonial}"</p>
    </div>

    <div class="signature">
        <!-- <img src={testimonial.signature} alt="Decorative signature" /> -->
         <span class="fraktur">{testimonial.name}</span>
        <span class="title">{testimonial.title}</span>
    </div>

    <div class="outbound">
        <span class="icon">
            <svg width="20px" height="20px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M9.17137 14.8284L14.8282 9.17152M14.8282 9.17152H9.87848M14.8282 9.17152V14.1213" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </span>
    </div>
</a>

<style lang="scss">

    @use 'src/lib/scss/variables.scss' as *;

    $padding: 2.5rem;

    a.testimonial {
        display: flex;
        flex-direction: column;
        padding: $padding;
        gap: 2rem;
        width: 500px;
        background-color: $white;
        position: relative;
        height: 100%;
        user-select: none;
        border: solid 1px $ultralight-grey;
        text-align: left;
        border-radius: 60px;
        text-decoration: none;
        transition: ease all 500ms;

        &:hover {
            transform: scale(1.02);
        }

        @media (max-width: $mobile) {
            width: 340px;
            padding: calc($padding / 2);
            border-radius: 40px;
        }

        .outbound {
            position: absolute;
            bottom: $padding;
            right: $padding;
            color: $accent;

            @media (max-width: $mobile) {
                bottom: calc($padding / 2);
                right: calc($padding / 2);
            }
        }

        div.img {
            display: flex;
            flex-direction: row;
            width: 100%;
            align-items: center;
            gap: $padding;

            img {
                width: 65px;
                height: 65px;
                object-fit: cover;
                border-radius: 50%;
            }

            .pili {
                opacity: .1;
            }
        }

        div.body {
            p {
                text-transform: none;
                font-size: 1rem;
                color: $dark-grey;
                max-width: 350px;
            }
        }

        div.signature {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            gap: .5rem;
            margin-top: 5rem;
            flex-grow: 1;

            @media (max-width: $mobile) {
                margin-top: .5rem;
            }

            img {
                width: 120px;
            }

            span.fraktur {
                font-size: 4rem;
                max-width: 7ch;
                line-height: 4rem;
                color: $accent;
            }

            span.title {
                color: $light-grey;
                font-size: .9rem;
                max-width: 15ch;
            }
        }
    }

</style>