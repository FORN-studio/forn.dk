<script>
    import { onMount } from 'svelte'
    import { focus } from '$lib/utils/state.svelte'

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

    onMount(() => {
        let intervalId = null;
        const CHANGE_PROBABILITY = 0.2; // 20% chance to change each visible pili
        const INTERVAL_MS = 200; // Check every 50ms
        
        const piliElements = document.querySelectorAll('.pili.living:not(.preset)');
        
        document.addEventListener('visibilitychange', () => {
            focus.focused = !document.hidden;
            
            // Pause the interval when page is not visible
            if (document.hidden && intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            } else if (!document.hidden && !intervalId) {
                startInterval();
            }
        });
        
        function startInterval() {
            intervalId = setInterval(() => {
                if (!focus.focused) return;
                
                // Get all pili elements currently in viewport
                const visiblePilis = Array.from(piliElements).filter(element => {
                    const rect = element.getBoundingClientRect();
                    return (
                        rect.top >= 0 &&
                        rect.left >= 0 &&
                        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                    );
                });
                
                // For each visible pili, randomly decide whether to change its image
                visiblePilis.forEach(element => {
                    if (Math.random() < CHANGE_PROBABILITY) {
                        const img = element.querySelector('img');
                        const randomId = ids[Math.floor(Math.random() * ids.length)];
                        img.src = `/asapili/${randomId}.svg`;
                    }
                });
            }, INTERVAL_MS);
        }
        
        // Start the interval
        startInterval();
        
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    });
</script>