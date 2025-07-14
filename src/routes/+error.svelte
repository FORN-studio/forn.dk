<script>

    import { page } from '$app/state'
    import { m } from '$lib/paraglide/messages';

</script>

<div class="error">
    <h1>{page.status}</h1>

    <a href="/">
        {m.error_back_button()}
    </a>
</div>

<style lang="scss">

    @use 'src/lib/scss/variables' as *;

    .error {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 4rem;

        a {
            border: solid 1px $ultralight-grey;
            padding: 1rem 2rem;
            border-radius: 9999px;
            transition: ease all 300ms;
            text-decoration: none;

            &:hover {
                border-color: $accent;
                color: $accent;
            }
        }

        h1 {
            font-size: 10rem;
        }
    }

</style>