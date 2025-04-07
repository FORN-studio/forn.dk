<div class="wide-text">

    <div class="text-wrapper">
        <p>I'm good at completely</p>
        <h2 class="spanning">
            <span>sub</span>
            <span>mer</span>
            <span>ging</span>
        </h2>
        <p>Myself in a single goal, almost drowning in it, and emerging with a solution that feels complete.</p>
    </div>

</div>

<style lang="scss">

    @use 'src/lib/scss/variables' as *;

    .wide-text {
        padding: 14rem 0;

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