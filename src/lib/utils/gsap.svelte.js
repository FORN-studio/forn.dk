import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { browser } from '$app/environment'
import Lenis from 'lenis'

let lenis = null

if (browser) {
    lenis = new Lenis({
        duration: 1.5,
        autoRaf: true,
        lerp: 0.3,
        syncTouch: true,
        touchMultiplier: 2,
        touchInertiaMultiplier: 85
    })

    gsap.registerPlugin(ScrollTrigger)

    lenis.on('scroll', (e) => {
        ScrollTrigger.update()
    })

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)
}

export { gsap, lenis, ScrollTrigger }
