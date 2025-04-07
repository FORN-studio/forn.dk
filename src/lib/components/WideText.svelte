<script>
    import { m } from '$lib/paraglide/messages.js'
</script>

<div class="wide-text">

    <div class="text-wrapper">
        <p>{m.wide_text_intro()}</p>
        <h2 class="spanning">
            <span>{m.wide_text_heading_part1()}</span>
            <span>{m.wide_text_heading_part2()}</span>
            <span>{m.wide_text_heading_part3()}</span>
        </h2>
        <p>{m.wide_text_outro()}</p>
    </div>

</div>

<style lang="scss">

    @use 'src/lib/scss/variables' as *;

    .wide-text {
        padding: 14rem 0;

        @media (max-width: $mobile) {
            padding: 8rem 0;
        }

        .text-wrapper {
            display: flex;
            flex-direction: column;
            gap: 1rem;

            h2 {
                display: flex;
                flex-direction: row;
                width: 100%;
                justify-content: space-between;

                span {
                    &:nth-child(2) {
                        margin-top: 6rem;
                    }
                    &:nth-child(3) {
                        margin-top: 12rem;
                    }
                }
            }

            p {
                &:nth-child(1) {
                    padding-left: $p-inset;

                    @media (max-width: $mobile) {
                        padding-left: $p-inset-mobile;
                    }
                }

                &:last-child {
                    text-align: right;
                    width: 100%;
                    padding-right: $p-inset;
                    max-width: 450px;
                    align-self: flex-end;
                    padding-top: 1rem;

                    @media (max-width: $mobile) {
                        padding-right: $p-inset-mobile;
                    }
                }
            }
        }
    }

</style>