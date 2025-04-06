<script>

    import Pili from '$lib/components/Pili.svelte'

</script>

<div class="text-one">

    <div class="text-wrapper">
        <p>FORN is a one-man army</p>
        <h2>Production<br /> and<br /> design</h2>
        <p>Studio based in Copenhagen,</p>
    </div>

</div>

<style lang="scss">

    @use 'src/lib/scss/variables' as *;

    .text-one {
        display: flex;
        flex-direction: row;
        margin-bottom: 14rem;

        h2 {
            margin: 1rem 0;
        }

        p {
            margin-left: $p-inset;
        }
    }

</style>