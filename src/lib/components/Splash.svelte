<script>

    import Logo from '$lib/assets/logo_full.svg'
    import Arrowhead from '$lib/assets/arrowhead.svg'
    import Pili from '$lib/components/Pili.svelte'

    const piliCounts = [
        { breakpoint: 999999, count: 11, extraRowCounts: [1, 2, 3, 6, 11, 9, 8, 3] },
        { breakpoint: 1440, count: 8, extraRowCounts: [2, 4, 7, 5, 3] },
        { breakpoint: 1024, count: 6, extraRowCounts: [2, 4, 7, 5, 3] },
        { breakpoint: 768, count: 20, extraRowCounts: [2, 4, 7, 5, 3] }
    ]

    let innerWidth = $state(0)
    let piliCount = $derived.by(() => {
        const idx = piliCounts.findIndex(piliCount => innerWidth >= piliCount.breakpoint)
        return piliCounts[idx - 1]?.count || 20
    })

    let piliExtraRowCount = $derived.by(() => {
        const idx = piliCounts.findIndex(piliCount => innerWidth >= piliCount.breakpoint)
        return piliCounts[idx - 1]?.extraRowCounts || [2, 4, 7, 5, 3]
    })

</script>

<svelte:window bind:innerWidth />

<div class="splash">
    <div class="inner">
        <div class="image-wrapper">
            <img src={Logo} alt="Logo" />
        </div>
    
        <div class="decorative-wrapper">
            <div class="text-wrapper">
                <p>Copenhagen-based web <br />design and development</p>
                <div class="arrow-wrapper">
                    <img src={Arrowhead} alt="Arrowhead" />
                </div>
            </div>
        
            <div class="pili-wrapper">
                {#each { length: piliCount } as _}
                    <Pili />
                {/each}

                <div class="pili-extras-wrapper">
                    {#each { length: piliExtraRowCount.length } as _, i}
                        <div class="column">
                            {#each { length: piliExtraRowCount[i] } as _}
                                <Pili />
                            {/each}
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">

    @use 'src/lib/scss/variables' as *;

    .splash {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 2rem);
        position: relative;

        .inner {
            display: flex;
            flex-direction: row;
            height: 600px;
            width: 1200px;
            margin: auto;
            gap: 1rem;

            @media (max-width: $desktop) {
                width: 900px;
                height: 450px;
            }

            @media (max-width: $tablet) {
                width: 700px;
                height: 300px;
            }

            @media (max-width: $mobile) {
                width: 100%;
                height: 100dvh;
                flex-direction: column;
                gap: 1rem;
            }
        }

        .decorative-wrapper {
            display: flex;
            gap: 1rem;
            
            @media (max-width: $mobile) {
                flex-direction: row;
                justify-content: space-between;
                height: 60dvh;
            }
        }

        .pili-wrapper {
            position: relative;

            @media (max-width: $mobile) {
                display: flex;
                flex-direction: column;
                max-height: 300px;
                flex-wrap: wrap;
            }

            .pili-extras-wrapper {
                position: absolute;
                right: 0;
                display: flex;
                flex-direction: row;

                @media (max-width: $mobile) {
                    display: none;
                }
            }
        }

        .image-wrapper {
            flex-grow: 1;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;

            @media (max-width: $mobile) {
                flex-grow: 0;
            }
            
            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                align-self: flex-start;
            }
        }

        .text-wrapper {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-left: 1rem;

            @media (max-width: $mobile) {
                margin-left: 0;
            }

            .arrow-wrapper {
                flex-grow: 1;
                display: flex;
                flex-direction: column;

                &::before {
                    content: '';
                    display: block;
                    width: 1px;
                    flex-grow: 1;
                    background-color: $black;
                }

                img {
                    width: 20px;
                    height: 20px;
                    margin-top: -20px;
                }
            }
            
            p {
                writing-mode: vertical-rl;
                text-transform: uppercase;
                transform: translateX(-8px);
                margin-bottom: 1rem;
            }
        }
    }

</style>