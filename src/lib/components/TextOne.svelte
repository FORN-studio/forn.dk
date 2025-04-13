<script>

    import Pili from '$lib/components/Pili.svelte'
    import { m } from '$lib/paraglide/messages.js'

</script>

<div class="text-one">
    <div class="text-wrapper">
        <p>{m.text_one_intro()}</p>
        <h2>{m.text_one_heading_line1()}<br /> {m.text_one_heading_line2()}<br /> {m.text_one_heading_line3()}</h2>
        <p>{m.text_one_outro()}</p>
    </div>
</div>

<style lang="scss">

    @use 'src/lib/scss/variables' as *;

    .text-one {
        display: flex;
        flex-direction: row;
        padding: 8rem 0;

        h2 {
            margin: 1rem 0;
        }

        p {
            margin-left: $p-inset;

            @media (max-width: $mobile) {
                margin-left: $p-inset-mobile;
            }
        }
    }

</style>