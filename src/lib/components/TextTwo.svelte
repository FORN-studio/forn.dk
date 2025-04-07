<script>

    import Pili from '$lib/components/Pili.svelte'

    const piliCounts = [
        { breakpoint: 999999, rows: [16, 14, 11, 8, 7, 5, 4, 2, 1] },
        { breakpoint: 1440, rows: [12, 10, 6, 4, 2, 1] },
        { breakpoint: 1024, rows: [9, 6, 4, 2, 1] },
        { breakpoint: 768, rows: [10] }
    ]

    let innerWidth = $state(0)
    let piliRows = $derived.by(() => {
        const idx = piliCounts.findIndex(piliCount => innerWidth >= piliCount.breakpoint)
        return piliCounts[idx - 1]?.rows || piliCounts[3].rows
    })

</script>

<svelte:window bind:innerWidth />

<div class="text-two">

    <div class="pili-wrapper">
        {#each piliRows as row}
            <div class="row">
                {#each { length: row } as _}
                    <Pili />
                {/each}
            </div>
        {/each}
    </div>

    <div class="text-wrapper">
        <p>Feeding off of</p>
        <h2>grand<br /> ambitions</h2>
        <p>To create solutions that cut through the noise.</p>
    </div>

</div>

<style lang="scss">

    @use 'src/lib/scss/variables' as *;

    .text-two {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        padding: 8rem 0;

        @media (max-width: $mobile) {
            flex-direction: row-reverse;
            gap: 2rem;
        }

        .pili-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 1rem;
            flex-shrink: 0;

            .row {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
        }

        .text-wrapper {
            flex-grow: 1;
        }

        h2 {
            margin: 1rem 0;
            text-align: right;
            hyphens: auto;

            @media (max-width: $mobile) {
                margin-right: $p-inset-mobile;
            }
        }

        p {
            margin-right: $p-inset;
            text-align: right;

            @media (max-width: $mobile) {
                margin-right: 0;
            }
        }
    }

</style>