<script>

    import Pili from '$lib/components/Pili.svelte'
    import { m } from '$lib/paraglide/messages.js'

</script>

<div class="text-one">
    <h1 class="text-wrapper">
        <span>{m.text_one_intro()}</span>
        <span class="h2">{m.text_one_heading_line1()}<br /> {m.text_one_heading_line2()}<br /> {m.text_one_heading_line3()}</span>
        <span>{m.text_one_outro()}</span>
    </h1>
</div>

<style lang="scss">

    @use 'src/lib/scss/variables' as *;

    .text-one {
        display: flex;
        flex-direction: row;
        padding: 8rem 0;

        h1 {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        .h2 {
            margin: 1rem 0;
            font-size: $fs-xxxl;
            text-transform: lowercase;
            color: $accent;

            @media (max-width: $tablet) {
                font-size: $fs-xxl;
            }

            @media (max-width: $mobile) {
                font-size: $fs-xl;
            }
        }

        span {
            margin-left: $p-inset;
            display: inline-block;

            @media (max-width: $mobile) {
                margin-left: $p-inset-mobile;
            }
        }
    }

</style>