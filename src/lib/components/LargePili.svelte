<script>
    import { onMount } from 'svelte'
    import { fly, scale } from 'svelte/transition'

    const ids = [
        'asa',
        'bete',
        'buni',
        'dala',
        'dudi',
        'fasi',
        'feno',
        'fudo',
        'gano',
        'kana',
        'kene',
        'kodu',
        'mafa',
        'muno',
        'nima',
        'nugo',
        'pali',
        'pili',
        'sadi',
        'sibi',
        'sila',
        'sufu',
        'sumi',
        'taku',
        'tega',
        'yaka',
        'yalu'
    ]

    const pickRandom = () => ids[Math.floor(Math.random() * ids.length)]
    let selectedPili = $state(ids[0])
    let timeoutId = $state(null)
    let isTabActive = $state(true)
    let initialPauseComplete = $state(false)
    let isInViewport = $state(false)
    let piliElement;

    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            isInViewport = entry.isIntersecting;
            
            if (isInViewport && isTabActive && initialPauseComplete) {
                if (!timeoutId) changePili();
            } else if (!isInViewport && timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        }, { threshold: 0.1 });
        
        if (piliElement) {
            observer.observe(piliElement);
        }

        setTimeout(() => {
            initialPauseComplete = true;
            if (isTabActive && isInViewport) {
                changePili();
            }
        }, 1000);

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (piliElement) observer.unobserve(piliElement);
        };
    });

    function handleVisibilityChange() {
        if (document.hidden) {
            isTabActive = false;
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        } else {
            isTabActive = true;
            if (initialPauseComplete && isInViewport) {
                changePili();
            }
        }
    }

    function changePili() {
        if (!initialPauseComplete || !isInViewport) return;
        
        timeoutId = setTimeout(() => {
            selectedPili = pickRandom();
            changePili();
        }, 1000);
    }

</script>

<div class="pili" bind:this={piliElement}>
    {#key selectedPili}
        <img in:fly={{ duration: 500, y: -100, delay: 150 }} out:scale={{ duration: 500, start: 0.8 }} src={`/asapili/${selectedPili}.svg`} alt="Pili" />
    {/key}
</div>

<style lang="scss">

    @use 'src/lib/scss/variables' as *;

    .pili {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            grid-column: 1;
            grid-row: 1;
            filter: brightness(0) saturate(100%) invert(11%) sepia(86%) saturate(5000%) hue-rotate(224deg) brightness(94%) contrast(106%);
        }
    }

</style>