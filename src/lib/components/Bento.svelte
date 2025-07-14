<script>

    import BentoGradient from "$lib/components/BentoGradient.svelte";
    import LargePili from "$lib/components/LargePili.svelte";
    import { m } from "$lib/paraglide/messages";

    const icons = {
        consultancy: `<svg width="42px" height="42px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M6 20.5C7 11 11.5 8 20 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.9086 3.80941L20.3946 5.90126L18.3028 10.3873" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 7C6.10457 7 7 6.10457 7 5C7 3.89543 6.10457 3 5 3C3.89543 3 3 3.89543 3 5C3 6.10457 3.89543 7 5 7Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 20.2426L18.1213 18.1213M18.1213 18.1213L20.2426 16M18.1213 18.1213L16 16M18.1213 18.1213L20.2426 20.2426" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
        websites: `<svg width="42px" height="42px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M3.33789 17C5.06694 19.989 8.29866 22 12.0001 22C15.7015 22 18.9332 19.989 20.6622 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.33789 7C5.06694 4.01099 8.29866 2 12.0001 2C15.7015 2 18.9332 4.01099 20.6622 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13 21.9506C13 21.9506 14.4079 20.0966 15.2947 16.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13 2.04932C13 2.04932 14.4079 3.90328 15.2947 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 21.9506C11 21.9506 9.59215 20.0966 8.70532 16.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 2.04932C11 2.04932 9.59215 3.90328 8.70532 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 10L10.5 15L12 10L13.5 15L15 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 10L2.5 15L4 10L5.5 15L7 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 10L18.5 15L20 10L21.5 15L23 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
        webapps: `<svg width="42px" height="42px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M10.0503 10.6066L2.97923 17.6777C2.19818 18.4587 2.19818 19.7251 2.97923 20.5061V20.5061C3.76027 21.2872 5.0266 21.2872 5.80765 20.5061L12.8787 13.4351" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.1927 13.7994L21.071 17.6777C21.8521 18.4587 21.8521 19.7251 21.071 20.5061V20.5061C20.29 21.2872 19.0236 21.2872 18.2426 20.5061L12.0341 14.2977" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6.73267 5.90381L4.61135 6.61092L2.49003 3.07539L3.90424 1.66117L7.43978 3.78249L6.73267 5.90381ZM6.73267 5.90381L9.5629 8.73404" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.0503 10.6066C9.2065 8.45359 9.37147 5.62861 11.111 3.8891C12.8505 2.14958 16.0607 1.76778 17.8285 2.82844L14.7878 5.86911L14.5052 8.98015L17.6162 8.69754L20.6569 5.65686C21.7176 7.42463 21.3358 10.6349 19.5963 12.3744C17.8567 14.1139 15.0318 14.2789 12.8788 13.435" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
        design: `<svg width="42px" height="42px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M12 14.5C15.3137 14.5 18 11.8137 18 8.5C18 5.18629 15.3137 2.5 12 2.5C8.68629 2.5 6 5.18629 6 8.5C6 11.8137 8.68629 14.5 12 14.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 21.5C19.3137 21.5 22 18.8137 22 15.5C22 12.1863 19.3137 9.5 16 9.5C12.6863 9.5 10 12.1863 10 15.5C10 18.8137 12.6863 21.5 16 21.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 21.5C11.3137 21.5 14 18.8137 14 15.5C14 12.1863 11.3137 9.5 8 9.5C4.68629 9.5 2 12.1863 2 15.5C2 18.8137 4.68629 21.5 8 21.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`
    }

</script>

{#snippet textItem(title, subtitle, icon, paragraph)}
    <div class="item textual {icon}">
        <div class="icon">
            {@html icons[icon]}
        </div>

        <div class="title">
            <span class="subtitle">
                {subtitle}
            </span>

            <h3 class="title">
                {title}
            </h3>
        </div>

        <p>
            {paragraph}
        </p>
    </div>
{/snippet}

<div class="bento">

    <div class="item portrait">
        <enhanced:img
            class="portrait-img"
            src="/static/kontoreder.webp" 
            alt="Eder"
        />
    </div>

    <!-- websites -->
    {@render textItem(m.bento_one_title(), m.bento_one_subtitle(), 'websites', m.bento_one_paragraph())}

    <div class="item pili">
        <LargePili />
    </div>

    <!-- consultancy -->
    {@render textItem(m.bento_two_title(), m.bento_two_subtitle(), 'consultancy', m.bento_two_paragraph())}

    <!-- webapps -->
    {@render textItem(m.bento_three_title(), m.bento_three_subtitle(), 'webapps', m.bento_three_paragraph())}

    <div class="item gradient">
        <BentoGradient />
    </div>

    <!-- webapps -->
    {@render textItem(m.bento_four_title(), m.bento_four_subtitle(), 'design', m.bento_four_paragraph())}

</div>

<style lang="scss">

    @use 'src/lib/scss/variables' as *;

    :global(.bento picture) {
        height: 100%;
    }

    .bento {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: stretch;
        gap: 20px;

        @media (max-width: $mobile) {
            margin-top: 8rem;
        }

        .item {
            flex-basis: 21%;
            flex-grow: 1;
            min-height: 250px;
            max-width: calc(100vh - 2rem);
            min-width: 300px;

            &.pili {
                display: flex;
                justify-content: center;
                align-items: center;
                border: solid 1px $ultralight-grey;
                border-radius: 40px;
                overflow: hidden;
                padding: 120px;

                img {
                    filter: opacity(0.25);
                }
            }

            &.textual {
                border: solid 1px $ultralight-grey;
                padding: 3rem;
                border-radius: 40px;
                display: flex;
                flex-direction: column;
                gap: 3rem;

                &.webapps {
                    flex-basis: 15%;
                }

                h3 {
                    color: $accent;
                    font-size: 3.5rem;
                    white-space: pre-wrap;

                    @media (max-width: $mobile) {
                        font-size: 3rem;
                    }
                }

                .subtitle {
                    color: $light-grey;
                }

                p {
                    text-transform: none;
                    font-size: 1rem;
                    margin-top: auto;
                }

                .icon {
                    color: $dark-grey;
                }
            }

            &.portrait {
                overflow: hidden;
                border-radius: 40px;
                min-width: 250px;
                
                .portrait-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
    }

</style>