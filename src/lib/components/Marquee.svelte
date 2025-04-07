<script>

    import Marquee from '$lib/assets/marquee.svg'
    import { onMount } from 'svelte'
    import { browser } from '$app/environment'
    import { spring } from 'svelte/motion'

    let marqueeElement;

    onMount(() => {
        const desktopPaths = marqueeElement.querySelectorAll('.desktop > path');
        const mobilePaths = marqueeElement.querySelectorAll('.mobile > path');
        
        const allPaths = [...desktopPaths, ...mobilePaths];
        allPaths.forEach(path => {
            path.addEventListener('mouseenter', () => {
                if (!path.classList.contains('ping')) {
                    const isSpecialElement = ['f', 'o', 'r', 'n'].includes(path.id);
                    
                    path.classList.add(isSpecialElement ? 'ping-reverse' : 'ping');

                    setTimeout(() => {
                        path.classList.remove(isSpecialElement ? 'ping-reverse' : 'ping');
                    }, 1500);
                }
            });
        });
    });

    let scrollY = $state(0);
    let parallaxOffset = spring(0, {
        stiffness: 0.02,
        damping: 0.5
    })

    const handleScroll = () => {
        if (!browser || !marqueeElement) return

        const rect = marqueeElement.getBoundingClientRect();
        const scrolled = (rect.top + rect.height / 2) - (window.innerHeight / 2);

        $parallaxOffset = scrolled / 3;
    }

</script>

<svelte:window bind:scrollY onscroll={handleScroll} />

<div class="marquee" bind:this={marqueeElement} style="--offset: {$parallaxOffset}px;">
    <svg class="desktop" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" id="FORN" x="0" y="0" style="enable-background:new 0 0 1881.9 423" version="1.1" viewBox="0 0 1881.9 423"><path id="f" d="M675.2 423h-108V0h180v72h-9s0-63-81.7-63.5c-90.8-.6-81.2 63-81.2 63V144h172v72H738c-.5-62.5-63.8-62.5-80.8-63.1-.4 0-.9.1-1.3.1h-80.7v198s.5 63.5 100 63.5v8.5z"/><path id="o" d="M846.2 0h-90v351s-.5 72 90 72h90l.5-350.5S936.2 0 846.2 0zm80 305c-.5 53.5-45 45-45 45h-117s.5-170.5 0-225 54-54 54-54h108s.5 180.5 0 234z"/><path id="r" d="M1125.6 89.7C1125.2 0 1035.8 0 1035.8 0h-90.7l-.5 423h180.5v-72h-9c-.5 71.5-81 63-81 63h-81v-17.3c.5-53.7 81.9-53.7 81.9-53.7l89.6-1c0-117.5-90.1-117-90.1-117h-81.3v-9h171s.4-117.1.4-126.3zM1008.2 72s23.5-.5 38.5 14.5 15.5 39.5 15.5 39.5-24.5 3.5-39.5-12.5C1007.2 97 1008.2 72 1008.2 72z"/><path id="n" d="M1314.2 72c-.5-72.5-90-72-90-72h-90v423h9V125.8c0-17.2 6-29 14.8-37.1 9.8-10.4 27.9-16.7 43.3-16.7h103.9v279c0 62.5-81 63-81 63v9h90s.5-278.5 0-351z"/><path d="M0 0v423h180V0H0zm90 414c-44.7 0-81-36.3-81-81s36.3-81 81-81 81 36.3 81 81-36.3 81-81 81zm81-234s.1 63.5-80.9 63.8c-59 .2-81.1 50-81.1 50V76.7C9 39.3 39.3 9 76.7 9H171v171z"/><path d="M378.1 0h180v423h-180v-99h9v41c0 27.1 21.9 49 49 49h41V198h-5.4c-16.9 0-30.6 13.7-30.6 30.6V405h-4.8c-22.2 0-40.2-18-40.2-40.2V189H503c25.5 0 46.1-20.6 46.1-46.1V9l-111 .1c-17 0-25.8 20.2-14.3 32.7l102.8 112.1c-1.4 2.7-3.6 5-6.2 6.4l-.5.3L417.7 48.8c-10.8-11.8-30.6-4.2-30.6 11.9V315h-9V0z"/><path d="M189 0h180v216H242c-24.3 0-44 19.7-44 44v46h171v9H246.5c-26.8 0-48.5 21.7-48.5 48.5V414h123c21.5 0 39-17.4 39-39v-51h9v99H189V207h130.5c22.3 0 40.5-18.1 40.5-40.4V9H243.2c-25 0-45.2 20.2-45.2 45.2v90.3c0 24.6 19.9 44.5 44.5 44.5H288v9h-99V0z"/><path d="M1701.9 0v10.1c0 59.1 47.9 106.9 106.9 106.9h10.2c29.8 0 53.9 24.1 53.9 53.9V414c-5 0-9-4-9-9V281.9c0-31.4-25.5-56.9-56.9-56.9h-105.1v198h180V0h-180zm171 108h-63c-54.7 0-99-44.3-99-99h63c54.7 0 99 44.3 99 99z"/><path d="M1513.3 0v423h180V0h-180zm171 264.5c0 82.6-66.9 149.5-149.5 149.5h-12.5V155c0-80.6 65.4-146 146-146h16v255.5z"/><path d="M1323.2 0v423h180V0h-180zm171 414h-162s0-90 63-153c40.8-40.8 99-54 99-54v207zm-69.6-188c-69.9 37.7-92.5 125-92.5 125V9h81v163.1c0 20.2-9.5 39.3-25.6 51.6l-14.5 11 .6 21s7.7-10.1 23.3-21.9c14.2-10.8 25.2-16.8 25.2-16.8V9h72v99c.1 0 9.8 75.2-69.5 118z"/></svg>
    <svg class="mobile" xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 747.22 1287"><path id="f" d="M108 855H0V432h180v72h-9.03s0-63-81.74-63.5c-90.76-.56-81.24 63-81.24 63V576h172v72h-9.19c-.5-62.5-63.82-62.5-80.82-63.06-.44 0-.89.06-1.33.06H7.98v198s.5 63.5 100 63.5v8.5h.02Z" style="stroke-width:0"/><path id="o" d="M279 432h-90v351s-.51 72 90 72h90l.5-350.5S369 432 279 432Zm80 305c-.5 53.5-45 45-45 45H197s.5-170.5 0-225 54-54 54-54h108s.5 180.5 0 234Z" style="stroke-width:0"/><path id="r" d="M558.4 521.71C558 432 468.69 432 468.69 432H378l-.5 423H558v-72h-9c-.5 71.5-81 63-81 63h-81v-17.27C387.5 775 468.85 775 468.85 775l89.55-1c0-117.5-90.05-117-90.05-117h-81.34v-9h171s.44-117.1.4-126.29h-.01ZM441 504s23.5-.5 38.5 14.5S495 558 495 558s-24.5 3.5-39.5-12.5C440.02 528.99 441 504 441 504Z" style="stroke-width:0"/><path id="n" d="M747 504c-.5-72.5-90-72-90-72h-90v423h9V557.83c0-17.19 6.04-29.01 14.8-37.12 9.84-10.39 27.89-16.71 43.33-16.71H738v279c0 62.5-81 63-81 63v9h90s.5-278.5 0-351Z" style="stroke-width:0"/><path id="purification" d="M0 864v423h180V864H0Zm90 414c-44.74 0-81-36.26-81-81s36.26-81 81-81 81 36.26 81 81-36.26 81-81 81Zm81-234s.11 63.47-80.89 63.78C31.16 1108 9 1157.8 9 1157.8V940.7C9 903.31 39.31 873 76.7 873H171v171Z" style="stroke-width:0"/><path id="inversion" d="M378.15 864h180v423h-180v-99h9v41c0 27.06 21.94 49 49 49h41v-216h-5.35c-16.93 0-30.65 13.72-30.65 30.65V1269h-4.78c-22.22 0-40.22-18.01-40.22-40.22v-175.77h106.92c25.45 0 46.08-20.63 46.08-46.08V873l-110.98.07c-16.95.01-25.8 20.16-14.34 32.65l102.82 112.05c-1.4 2.72-3.58 4.96-6.25 6.44l-.5.28-102.18-111.67c-10.84-11.84-30.57-4.18-30.57 11.88v254.31h-9V864Z" style="stroke-width:0"/><path id="persona" d="M189 864h180v216H242c-24.3 0-44 19.7-44 44v46h171v9H246.5c-26.79 0-48.5 21.71-48.5 48.5v50.5h123.05c21.51 0 38.95-17.44 38.95-38.95V1188h9v99H189v-216h130.55c22.34 0 40.45-18.11 40.45-40.45V873H243.2c-24.96 0-45.2 20.24-45.2 45.2v90.3c0 24.58 19.92 44.5 44.5 44.5H288v9h-99V864Z" style="stroke-width:0"/><path id="despair" d="M378.75 0v10.06c0 59.06 47.88 106.94 106.94 106.94h10.16c29.77 0 53.9 24.13 53.9 53.9V414a9 9 0 0 1-9-9V281.9c0-31.42-25.47-56.9-56.9-56.9h-105.1v198h180V0h-180Zm171 108h-63c-54.68 0-99-44.32-99-99h63c54.68 0 99 44.32 99 99Z" style="stroke-width:0"/><path id="vacua" d="M190.2 0v423h180V0h-180Zm171 264.5c0 82.57-66.93 149.5-149.5 149.5h-12.5V155c0-80.63 65.37-146 146-146h16v255.5Z" style="stroke-width:0"/><path id="trickster" d="M0 0v423h180V0H0Zm171 414H9s0-90 63-153c40.75-40.75 99-54 99-54v207Zm-69.53-188C31.61 263.69 9 351 9 351V9h81v163.13c0 20.24-9.46 39.31-25.57 51.55l-14.48 11.01.56 21s7.66-10.05 23.29-21.94C88.05 222.91 99 216.99 99 216.99V9h72v99s9.79 75.22-69.53 118Z" style="stroke-width:0"/><path id="disobedience" d="M567 864v423h180V864H567Zm9 282.67V873h153l-108.91 281.89c-9.11 23.57-44.09 17.05-44.09-8.22ZM738 1278H585l50.79-131.46C656.9 1091.9 738 1107.02 738 1165.6v112.41Z" style="stroke-width:0"/><path id="distillation" d="M567 0v423h180V0H567Zm171 414H576l-.9-225s11.25 27 40.65 26.4C667.65 214.34 738 248.99 738 329.66V414ZM618.43 209.07c-23.44-.21-42.43-19-42.43-42.43V9c89.51 0 162.11 72.49 162.26 162l.19 121.95c-21.67-61.86-75.56-83.47-120.02-83.88Z" style="stroke-width:0"/></svg>
</div>

<style lang="scss">

    @use 'src/lib/scss/variables' as *;

    .marquee {
        padding: 14rem 0;
        transform: translateX(var(--offset));
        
        @media (max-width: $mobile) {
            padding-top: 8rem;
            transform: none;
        }
        
        svg {
            width: 140vw;
            position: relative;
            left: 50%;
            transform: translateX(-50%);

            &.mobile {
                display: none;
                width: auto;
                left: auto;
                transform: none;

                @media (max-width: $mobile) {
                    display: block;
                }
            }

            &.desktop {
                display: block;

                @media (max-width: $mobile) {
                    display: none;
                }
            }

            #f, #o, #r, #n {
                fill: $accent;
            }
        }
    }

    :global(path.ping) {
        animation: ping 1.5s;
    }
    
    :global(path.ping-reverse) {
        animation: ping-reverse 1.5s;
    }

    @keyframes ping {
        0% {
            fill: $accent;
        }

        100% {
            fill: $black;
        }
    }
    
    @keyframes ping-reverse {
        0% {
            fill: $black;
        }

        100% {
            fill: $accent;
        }
    }

</style>