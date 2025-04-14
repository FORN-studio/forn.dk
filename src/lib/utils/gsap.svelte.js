import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { browser } from '$app/environment'
import Lenis from 'lenis'

let lenis = null
let ticker = null

if (browser) {
    lenis = new Lenis({
        duration: 1,
        autoRaf: false,
        lerp: 0.3,
        syncTouch: true,
        touchMultiplier: 1.8,
        touchInertiaMultiplier: 60
    })

    gsap.registerPlugin(ScrollTrigger)

    lenis.on('scroll', (e) => {
        ScrollTrigger.update()
    })

    ticker = (time) => {
        lenis.raf(time * 1000)
    }

    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)
}

export { gsap, lenis, ScrollTrigger, ticker }
