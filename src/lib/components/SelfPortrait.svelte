<script>

    import Portrait from '$lib/assets/eder.jpg'
    import { scale } from 'svelte/transition'
    import LargePili from '$lib/components/LargePili.svelte'
    import { m } from '$lib/paraglide/messages.js'

</script>

<div class="self-portrait">
    <div class="image-wrapper">
        <img src={Portrait} alt="Eder" />
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

            .label {
                writing-mode: vertical-rl;
            }

            img {
                width: 100%;
                height: 100%;
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

            .pili {
                color: $accent;
                grid-column: 1;
                grid-row: 1;
            }
        }
    }

</style>