<script>
    import { onMount } from 'svelte'
    import { fly, scale } from 'svelte/transition'
    import { cubicInOut } from 'svelte/easing'

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
    let isInViewport = $state(false)
    let piliElement;

    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            isInViewport = entry.isIntersecting;
            
            if (isInViewport && isTabActive) {
                if (!timeoutId) changePili();
            } else if (!isInViewport && timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        }, { threshold: 0.1 });
        
        if (piliElement) {
            observer.observe(piliElement);
        }

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
            if (isInViewport) {
                changePili();
            }
        }
    }

    function changePili() {
        if (!isInViewport) return;
        selectedPili = pickRandom();
        
        timeoutId = setTimeout(() => {
            changePili();
        }, 3000);
    }

</script>

<div class="pili" bind:this={piliElement}>
    {#key selectedPili}
        <img in:fly={{ duration: 2000, opacity: 1, y: '250%', easing: cubicInOut, delay: 300 }} out:fly={{ duration: 2000, opacity: 1, y: '-250%', easing: cubicInOut }} src={`/asapili/${selectedPili}.svg`} alt="Pili" />
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
            filter: opacity(0.3);
        }
    }

</style>