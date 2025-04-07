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
        let observers = []

        console.log(piliElements)

        document.addEventListener('visibilitychange', () => {
            focus.focused = !document.hidden
        })

        const isElementInViewport = (element) => {
            const rect = element.getBoundingClientRect()
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            )
        }

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
                if (isElementInViewport(element)) {
                    const randomId = ids[Math.floor(Math.random() * ids.length)]
                    img.src = `/asapili/${randomId}.svg`
                }
            }, sleepDuration * 1000)

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    element.dataset.visible = entry.isIntersecting
                })
            })
            
            observer.observe(element)
            observers.push(observer)
            intervals.push(interval)
        })

        return () => {
            intervals.forEach(interval => clearInterval(interval))
            observers.forEach(observer => observer.disconnect())
        }
    })
</script>