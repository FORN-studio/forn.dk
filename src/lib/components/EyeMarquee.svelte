<script>

    import Marquee from '$lib/assets/marquee.svg'
    import { offset } from '$lib/utils/state.svelte.js'
    import { onMount } from 'svelte'

    onMount(() => {
        const trinkets = document.querySelectorAll('#eye_marquee > path')
        trinkets.forEach(trinket => {
            trinket.addEventListener('mouseenter', () => {
                if (!trinket.classList.contains('ping')) {
                    trinket.classList.add('ping')

                    setTimeout(() => {
                        trinket.classList.remove('ping')
                    }, 1500)
                }
            })
        })

        const pupil = document.querySelector('#pupil')
        pupil.addEventListener('mouseenter', () => {
            if (!pupil.classList.contains('owch')) {
                pupil.classList.add('owch')

                setTimeout(() => {
                    pupil.classList.remove('owch')
                }, 1500)
            }
        })
    })

</script>

<div class="marquee" style="--offset-x: {offset.x}px; --offset-y: {offset.y}px; --half-offset-x: {offset.x / 2}px; --half-offset-y: {offset.y / 2}px;">
    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_2" viewBox="0 0 1316.1 423"><g id="FORN"><g id="eye_marquee"><g id="wrapper"><circle id="iris" cx="659.8" cy="213.1" r="115.3" style="fill:#002ab5;stroke-width:0"/><path id="pupil" d="M575.9 211.8c44.5-44.5 116.7-44.5 161.2 0-44.6 44.5-116.7 44.5-161.2 0Z" style="stroke-width:0"/><path id="cover" d="M921.2 211.2C921.2 96.3 803.3 3.1 657.9 3.1S394.7 96.2 394.7 211.2s117.8 208 263.2 208 263.3-93.1 263.3-208ZM628.5 374.9c-64-98.3-64-225.1 0-323.5l27.2-42.6L687.3 52l.5.8c63.4 97.5 63.4 223.2 0 320.7l-.5.8-29.6 45.5-29.2-44.9Z" style="fill:#fff;stroke-width:0"/><path id="outline" d="m655.7 14 21.2 27.8c77.1 101.2 77.1 241.5 0 342.7l-21.2 27.8-19.5-27.3c-73.5-102.8-73.5-241 0-343.8L655.7 14Z" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:11.48px"/></g><path d="M0 0v423h180V0H0Zm90 414c-44.7 0-81-36.3-81-81s36.3-81 81-81 81 36.3 81 81-36.3 81-81 81Zm81-234s.1 63.5-80.9 63.8c-59 .2-81.1 50-81.1 50V76.7C9 39.3 39.3 9 76.7 9H171v171Z" style="stroke-width:0"/><path d="M378.1 0h180v423h-180v-99h9v41c0 27.1 21.9 49 49 49h41V198h-5.4c-16.9 0-30.6 13.7-30.6 30.6V405h-4.8c-22.2 0-40.2-18-40.2-40.2V189H503c25.5 0 46.1-20.6 46.1-46.1V9l-111 .1c-17 0-25.8 20.2-14.3 32.7l102.8 112.1c-1.4 2.7-3.6 5-6.2 6.4l-.5.3L417.7 48.8c-10.8-11.8-30.6-4.2-30.6 11.9V315h-9V0Z" style="stroke-width:0"/><path d="M189 0h180v216H242c-24.3 0-44 19.7-44 44v46h171v9H246.5c-26.8 0-48.5 21.7-48.5 48.5V414h123c21.5 0 39-17.4 39-39v-51h9v99H189V207h130.5c22.3 0 40.5-18.1 40.5-40.4V9H243.2c-25 0-45.2 20.2-45.2 45.2v90.3c0 24.6 19.9 44.5 44.5 44.5H288v9h-99V0Z" style="stroke-width:0"/><path d="M1136.1 0v10.1c0 59.1 47.9 106.9 106.9 106.9h10.2c29.8 0 53.9 24.1 53.9 53.9V414c-5 0-9-4-9-9V281.9c0-31.4-25.5-56.9-56.9-56.9h-105.1v198h180V0h-180Zm171 108h-63c-54.7 0-99-44.3-99-99h63c54.7 0 99 44.3 99 99Z" style="stroke-width:0"/><path d="M947.5 0v423h180V0h-180Zm171 264.5c0 82.6-66.9 149.5-149.5 149.5h-12.5V155c0-80.6 65.4-146 146-146h16v255.5Z" style="stroke-width:0"/><path d="M757.4 0v423h180V0h-180Zm171 414h-162s0-90 63-153c40.8-40.8 99-54 99-54v207Zm-69.6-188c-69.9 37.7-92.5 125-92.5 125V9h81v163.1c0 20.2-9.5 39.3-25.6 51.6l-14.5 11 .6 21s7.7-10.1 23.3-21.9c14.2-10.8 25.2-16.8 25.2-16.8V9h72v99c.1 0 9.8 75.2-69.5 118Z" style="stroke-width:0"/></g></g></svg>
</div>

<style lang="scss">

    @use 'src/lib/scss/variables' as *;

    .marquee {
        padding: 14rem 0;

        @media (max-width: $mobile) {
            padding-top: 8rem;
        }
        
        svg {
            width: 137vw;
            position: relative;
            left: 50%;
            transform: translateX(-50%);

            @media (max-width: $mobile) {
                width: 230vw;
            }

            #pupil {
                transform: translate(var(--offset-x), var(--offset-y));
            }

            #iris {
                transform: translate(var(--half-offset-x), var(--half-offset-y));
            }
        }
    }

    :global(path.ping) {
        animation: ping 1.5s;
    }

    :global(path.owch) {
        animation: owch 1.5s;
    }

    @keyframes owch {
        0% {
            fill: $accent;
        }

        100% {
            fill: $black;
        }
    }

    @keyframes ping {
        0% {
            fill: $accent;
        }

        100% {
            fill: $black;
        }
    }

</style>