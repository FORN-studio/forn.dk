<script>

    import Pili from '$lib/components/Pili.svelte'
    import { onMount } from 'svelte'

    const randomLength = () => Math.floor(Math.random() * 15) + 1

    let piliRows = $state(Array(70).fill(0).map(() => randomLength()))

    onMount(() => {
        setInterval(() => {
            piliRows = piliRows.map(() => randomLength())
        }, 150)
    })

</script>

<div class="footer">
    <div class="pili-rows">
        {#each piliRows as row}
            <div class="pili-row">
                {#each Array(row) as _}
                    <Pili />
                {/each}
            </div>
        {/each}
    </div>
</div>

<style lang="scss">

    .footer {
        margin-top: 8rem;

        .pili-rows {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: flex-end;
        }
    }

</style>