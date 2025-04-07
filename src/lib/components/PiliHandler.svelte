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
        const piliElements = document.querySelectorAll('.pili.living')
        let intervals = []

        console.log(piliElements)

        document.addEventListener('visibilitychange', () => {
            focus.focused = !document.hidden
        })

        piliElements.forEach(element => {
            const img = element.querySelector('img')

            element.addEventListener('mouseenter', () => {
                img.classList.add('ping')

                setTimeout(() => {
                    img.classList.remove('ping')
                }, 1500)
            })

            const sleepDuration = Math.random() * 3 + 1
            const interval = setInterval(() => {
                const randomId = ids[Math.floor(Math.random() * ids.length)]
                img.src = `/asapili/${randomId}.svg`
            }, sleepDuration * 1000)

            intervals.push(interval)
        })

        return () => {
            intervals.forEach(interval => clearInterval(interval))
        }
    })
    

</script>