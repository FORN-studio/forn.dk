import { browser } from '$app/environment'
import SplitType from 'split-type'

class ScrollAnimationSystem {
    constructor() {
        this.observers = new Map()
        this.animatedElements = new Set()
        this.scrollListeners = new Map()
    }

    // character reveal animations for text elements
    animateTextReveal(targets) {
        if (!browser) return

        targets.forEach(target => {
            const split = new SplitType(target)
            const chars = split.chars
            
            if (!chars || chars.length === 0) return

            // set initial state
            chars.forEach((char, index) => {
                char.style.transform = 'translateY(100%)'
                char.style.opacity = '1'
                char.style.transformOrigin = 'center left'
                
                // ensure parent has overflow hidden
                const line = char.closest('.line')
                if (line) {
                    line.style.overflow = 'hidden'
                }
            })

            this.addScrollListener(target, chars)
        })
    }

    updateCharacterAnimation(chars, progress) {
        const totalChars = chars.length
        const staggerAmount = 0.3
        
        chars.forEach((char, index) => {
            const startTime = (index / Math.max(1, totalChars - 1)) * staggerAmount
            const charProgress = Math.max(0, Math.min(1, (progress - startTime) / (1 - staggerAmount)))
            const easeProgress = this.easeExpoInOut(charProgress)
            
            const translateY = 100 - (easeProgress * 100)
            char.style.transform = `translateY(${translateY}%)`
        })
    }

    addScrollListener(target, chars) {
        const handleScroll = () => {
            const rect = target.getBoundingClientRect()
            const windowHeight = window.innerHeight
            
            // trigger points: start 110%, end 10%
            const start = windowHeight * 1.1
            const end = windowHeight * 0.1
            const current = rect.top
            
            const progress = Math.max(0, Math.min(1, (start - current) / (start - end)))
            this.updateCharacterAnimation(chars, progress)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        
        const cleanup = () => window.removeEventListener('scroll', handleScroll)
        this.scrollListeners.set(target, cleanup)
    }

    // parallax scale effect for images
    animateParallaxScale(element, options = {}) {
        if (!browser) return

        const {
            scaleFrom = 1,
            scaleTo = 1.4,
            triggerSelector = null
        } = options

        const trigger = triggerSelector ? document.querySelector(triggerSelector) : element

        const handleScroll = () => {
            const rect = trigger.getBoundingClientRect()
            const windowHeight = window.innerHeight
            
            const progress = Math.max(0, Math.min(1, 
                (windowHeight - rect.top) / (windowHeight + rect.height)
            ))
            
            const currentScale = scaleFrom + (scaleTo - scaleFrom) * progress
            element.style.transform = `scale(${currentScale})`
            element.style.transformOrigin = 'center center'
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        
        const cleanup = () => window.removeEventListener('scroll', handleScroll)
        this.scrollListeners.set(element, cleanup)
    }

    // multi-element animations like widetext
    animateMultiElementReveal(elements, options = {}) {
        if (!browser) return

        elements.forEach((config, index) => {
            const { element, from, trigger, start, end } = config
            
            // set initial state
            Object.assign(element.style, {
                opacity: from.autoAlpha !== undefined ? from.autoAlpha.toString() : '0',
                transform: this.buildTransform(from)
            })

            const triggerElement = trigger ? document.querySelector(trigger) : element
            const elementHeight = triggerElement.offsetHeight

            const handleScroll = () => {
                const rect = triggerElement.getBoundingClientRect()
                const windowHeight = window.innerHeight
                
                // start when enters viewport, end when centered
                const startPos = windowHeight
                const endPos = (windowHeight / 2) - (elementHeight / 2)
                const current = rect.top
                
                const progress = Math.max(0, Math.min(1, 
                    (startPos - current) / (startPos - endPos)
                ))

                const easedProgress = this.easeExpoInOut(progress)
                
                element.style.opacity = from.autoAlpha !== undefined ? 
                    (from.autoAlpha + (1 - from.autoAlpha) * easedProgress).toString() : easedProgress.toString()
                
                element.style.transform = this.interpolateTransform(from, {}, easedProgress)
            }

            window.addEventListener('scroll', handleScroll, { passive: true })
            handleScroll()
            
            const cleanup = () => window.removeEventListener('scroll', handleScroll)
            this.scrollListeners.set(element, cleanup)
        })
    }

    buildTransform(from) {
        const transforms = []
        if (from.yPercent !== undefined) transforms.push(`translateY(${from.yPercent}%)`)
        if (from.xPercent !== undefined) transforms.push(`translateX(${from.xPercent}%)`)
        if (from.scale !== undefined) transforms.push(`scale(${from.scale})`)
        return transforms.join(' ')
    }

    interpolateTransform(from, to, progress) {
        const transforms = []
        
        if (from.yPercent !== undefined) {
            const toY = to.yPercent || 0
            const currentY = from.yPercent + (toY - from.yPercent) * progress
            transforms.push(`translateY(${currentY}%)`)
        }
        
        if (from.xPercent !== undefined) {
            const toX = to.xPercent || 0
            const currentX = from.xPercent + (toX - from.xPercent) * progress
            transforms.push(`translateX(${currentX}%)`)
        }
        
        if (from.scale !== undefined) {
            const toScale = to.scale || 1
            const currentScale = from.scale + (toScale - from.scale) * progress
            transforms.push(`scale(${currentScale})`)
        }
        
        return transforms.join(' ')
    }

    // expo.inout easing
    easeExpoInOut(t) {
        if (t === 0) return 0
        if (t === 1) return 1
        if (t < 0.5) {
            return Math.pow(2, 20 * t - 10) / 2
        }
        return (2 - Math.pow(2, -20 * t + 10)) / 2
    }

    destroy() {
        this.observers.forEach(observer => observer.disconnect())
        this.observers.clear()
        
        this.scrollListeners.forEach(cleanup => cleanup())
        this.scrollListeners.clear()
        
        this.animatedElements.clear()
    }
}

export const scrollAnimations = new ScrollAnimationSystem()