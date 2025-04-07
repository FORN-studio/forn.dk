<script>

    import Pili from '$lib/components/Pili.svelte'
    import { onMount } from 'svelte'
    import { m } from '$lib/paraglide/messages.js'

    const randomLength = () => Math.floor(Math.random() * 15) + 1

    let piliRows = $state(Array(70).fill(0).map(() => randomLength()))

    onMount(() => {
        setInterval(() => {
            piliRows = piliRows.map(() => randomLength())
        }, 150)
    })

</script>

<div class="footer">
    <div class="texts">
        <span>
            {m.footer_copyright()}
        </span>
        <span>
            {m.footer_symbols()}
        </span>
        <span>
            {m.footer_crafted_with()} <span class="inline-icon"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="#000" stroke-width="1.6"><circle cx="6" cy="6" r="5.21"/><path d="M2.19 9.56 6.02 1.58l2.42 4.96H3.64h4.81l1.49 3.02"/></svg></span> {m.footer_by()}
        </span>
        <span>
            {m.footer_name()}
        </span>
    </div>

    <div class="pili-rows">
        {#each piliRows as row}
            <div class="pili-row">
                {#each Array(15 - row) as _}
                    <div class="pili-placeholder"></div>
                {/each}
                {#each Array(row) as _}
                    <Pili />
                {/each}
            </div>
        {/each}
    </div>
</div>

<style lang="scss">

    @use 'src/lib/scss/variables' as *;

    .footer {
        margin-top: 8rem;

        .pili-rows {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: flex-end;
            height: calc(60px * 20);
            flex-shrink: 0;
        }
        
        .pili-placeholder {
            width: 60px;
            height: 60px;
        }

        .texts {
            display: flex;
            flex-direction: row;
            gap: 2rem;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            opacity: .5;
            font-size: .8rem;
            margin-bottom: -16rem;

            @media (max-width: $mobile) {
                flex-direction: column;
                gap: 1rem;
            }

            .inline-icon svg {
                transform: translateY(0.1rem);
                margin: 0 .2rem;
            }
        }
    }

</style>