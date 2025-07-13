<script>

    import { m } from "$lib/paraglide/messages";
    import Pili from "$lib/components/Pili.svelte";
    import { fly } from "svelte/transition";

    let { testimonial } = $props()

    let selfNode = $state(null)
    let outbound = $state(false)

    const toggleOutbound = (e) => {
        if (!selfNode.parentElement.classList.contains('is-snapped')) {
            e.preventDefault()
            return
        }

        outbound = !outbound
    }

</script>

<div class:outbound bind:this={selfNode} class="testimonial" role="button" tabindex="0" aria-label={m.visit_site()} title={m.visit_site()} onclick={toggleOutbound} onkeydown={toggleOutbound}>
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

    <div class="outbound-icon">
        <span class="icon">
            <svg width="20px" height="20px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M9.17137 14.8284L14.8282 9.17152M14.8282 9.17152H9.87848M14.8282 9.17152V14.1213" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </span>
    </div>

    {#if outbound}
        <a transition:fly={{ duration: 500, y: 120, opacity: 1 }} class="outbound-link" target="_blank" href={testimonial.url} aria-label={m.visit_site()} title={m.visit_site()}>
            <span class="text">
                {m.visit_site()}
            </span>
            <span class="icon">
                <svg width="24px" height="24px" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M14 11.9976C14 9.5059 11.683 7 8.85714 7C8.52241 7 7.41904 7.00001 7.14286 7.00001C4.30254 7.00001 2 9.23752 2 11.9976C2 14.376 3.70973 16.3664 6 16.8714C6.36756 16.9525 6.75006 16.9952 7.14286 16.9952" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 11.9976C10 14.4893 12.317 16.9952 15.1429 16.9952C15.4776 16.9952 16.581 16.9952 16.8571 16.9952C19.6975 16.9952 22 14.7577 22 11.9976C22 9.6192 20.2903 7.62884 18 7.12383C17.6324 7.04278 17.2499 6.99999 16.8571 6.99999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </span>
        </a>
    {/if}
</div>

<style lang="scss">

    @use 'src/lib/scss/variables.scss' as *;

    $padding: 2.5rem;

    .testimonial {
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
        overflow: hidden;
        cursor: pointer;

        &:hover {
            transform: scale(1.02);
        }

        @media (max-width: $mobile) {
            width: 340px;
            padding: calc($padding / 2);
            border-radius: 40px;
        }

        & > * { 
            transition: ease all 400ms;
            filter: grayscale(0);
        }

        &.outbound > *:not(.outbound-link) {
            opacity: .2;
            transform: translateY(-30px);
            filter: grayscale(1);
        }

        .outbound-link {
            position: absolute;
            bottom: 1rem;
            left: 1rem;
            right: 1rem;
            background-color: $accent;
            padding: 1.5rem .5rem;
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            color: $white;
            transition: ease all 300ms;
            text-decoration: none;
            border-radius: 9999px;

            &:hover {
                box-shadow: rgba(0, 0, 139, 0.2) 0px 7px 29px 0px;
                transform: scale(1.02);
            }

            .icon {
                transform: translateY(1.5px);
            }

            .text {
                font-size: 1rem;
                font-weight: bold;
                letter-spacing: 2px;
            }
        }

        .outbound-icon {
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
                font-size: 3.5rem;
                max-width: 7ch;
                line-height: 3.5rem;
                color: $accent;

                @media (max-width: $mobile) {
                    font-size: 2rem;
                    line-height: 2.5rem;
                    max-width: 10ch;
                }
            }

            span.title {
                color: $light-grey;
                font-size: .85rem;
                max-width: 15ch;
            }
        }
    }

</style>