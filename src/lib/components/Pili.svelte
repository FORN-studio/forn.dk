<script>

    import Asa from '$lib/assets/asapili/asa.svg';
    import Bete from '$lib/assets/asapili/bete.svg';
    import Buni from '$lib/assets/asapili/buni.svg';
    import Dala from '$lib/assets/asapili/dala.svg';
    import Dudi from '$lib/assets/asapili/dudi.svg';
    import Fasi from '$lib/assets/asapili/fasi.svg';
    import Feno from '$lib/assets/asapili/feno.svg';
    import Fudo from '$lib/assets/asapili/fudo.svg';
    import Gano from '$lib/assets/asapili/gano.svg';
    import Kana from '$lib/assets/asapili/kana.svg';
    import Kene from '$lib/assets/asapili/kene.svg';
    import Kodu from '$lib/assets/asapili/kodu.svg';
    import Mafa from '$lib/assets/asapili/mafa.svg';
    import Muno from '$lib/assets/asapili/muno.svg';
    import Nima from '$lib/assets/asapili/nima.svg';
    import Nugo from '$lib/assets/asapili/nugo.svg';
    import Pali from '$lib/assets/asapili/pali.svg';
    import Pili from '$lib/assets/asapili/pili.svg';
    import Sadi from '$lib/assets/asapili/sadi.svg';
    import Sibi from '$lib/assets/asapili/sibi.svg';
    import Sila from '$lib/assets/asapili/sila.svg';
    import Sufu from '$lib/assets/asapili/sufu.svg';
    import Sumi from '$lib/assets/asapili/sumi.svg';
    import Taku from '$lib/assets/asapili/taku.svg';
    import Tega from '$lib/assets/asapili/tega.svg';
    import Yaka from '$lib/assets/asapili/yaka.svg';
    import Yalu from '$lib/assets/asapili/yalu.svg';

    import { onMount } from 'svelte'
    import { scale } from 'svelte/transition'

    const piliComponents = [
        Asa,
        Bete,
        Buni,
        Dala,
        Dudi,
        Fasi,
        Feno,
        Fudo,
        Gano,
        Kana,
        Kene,
        Kodu,
        Mafa,
        Muno,
        Nima,
        Nugo,
        Pali,
        Pili,
        Sadi,
        Sibi,
        Sila,
        Sufu,
        Sumi,
        Taku,
        Tega,
        Yaka,
        Yalu
    ];

    const pickRandom = () => piliComponents[Math.floor(Math.random() * piliComponents.length)]
    let selectedPili = $state(pickRandom())
    let ping = $state(false)
    let timeoutId = $state(null)
    let isTabActive = $state(true)

    onMount(() => {
        const changePili = () => {
            // Only schedule next change if tab is active
            if (isTabActive) {
                // Pick a random sleep duration between 1 and 4 seconds
                const sleepDuration = Math.random() * 3 + 1;
                
                timeoutId = setTimeout(() => {
                    // Select a new random Pili
                    selectedPili = pickRandom();
                    // Call again to create an infinite loop
                    changePili();
                }, sleepDuration * 1000); // Convert to milliseconds
            }
        };
        
        // Start the cycle
        changePili();

        // Add event listeners for visibility change
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Cleanup on component unmount
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    });

    function handleVisibilityChange() {
        if (document.hidden) {
            // Tab is not visible, pause the animation
            isTabActive = false;
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        } else {
            // Tab is visible again, resume the animation
            isTabActive = true;
            changePili();
        }
    }

    function changePili() {
        // Pick a random sleep duration between 1 and 4 seconds
        const sleepDuration = Math.random() * 3 + 1;
        
        timeoutId = setTimeout(() => {
            // Select a new random Pili
            selectedPili = pickRandom();
            // Call again to create an infinite loop
            changePili();
        }, sleepDuration * 1000);
    }

    const handleMouseEnter = () => {
        ping = true

        setTimeout(() => {
            ping = false
        }, 1500)
    }

</script>

<div class="pili">
    {#key selectedPili}
        <img class:ping onmouseenter={handleMouseEnter} in:scale={{ duration: 500, start: 0.8 }} out:scale={{ duration: 500, start: 1.2 }} src={selectedPili} alt="Pili" />
    {/key}
</div>

<style lang="scss">

    @use 'src/lib/scss/variables' as *;

    .pili {
        width: 60px;
        height: 60px;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;

        @media (max-width: $tablet) and (min-width: $mobile) {
            width: 55px;
            height: 55px;
        }
        
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            grid-column: 1;
            grid-row: 1;

            &.ping {
                animation: ping 1.5s;
            }
        }
    }

    @keyframes ping {
        0% {
            filter: brightness(0) saturate(100%) invert(11%) sepia(86%) saturate(5000%) hue-rotate(224deg) brightness(94%) contrast(106%);
        }

        100% {
            filter: none;
        }
    }

</style>