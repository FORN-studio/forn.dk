<script>

    import Pili from '$lib/components/Pili.svelte'

    const piliCounts = [
        { breakpoint: 999999, rows: [13, 10, 9, 8, 7, 5, 4, 2, 1] },
        { breakpoint: 1440, rows: [8, 6, 4, 2] },
        { breakpoint: 1024, rows: [6, 4, 2] },
        { breakpoint: 768, rows: [4, 2] }
    ]

    let innerWidth = $state(0)
    let piliRows = $derived.by(() => {
        const idx = piliCounts.findIndex(piliCount => innerWidth >= piliCount.breakpoint)
        return piliCounts[idx - 1]?.rows || piliCounts[3].rows
    })

    $inspect(piliRows)

</script>

<svelte:window bind:innerWidth />

<div class="text-one">

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
        <h2>dead<br /> police</h2>
        <p>To create solutions that cut through the noise.</p>
    </div>

</div>

<style lang="scss">

    @use 'src/lib/scss/variables' as *;

    .text-one {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        padding: 14rem 0;

        .pili-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .text-wrapper {
            flex-grow: 1;
        }

        h2 {
            margin: 1rem 0;
            text-align: right;
        }

        p {
            margin-right: $p-inset;
            text-align: right;
        }
    }

</style>