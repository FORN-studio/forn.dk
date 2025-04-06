<script>

    import Splash from '$lib/components/Splash.svelte';
    import TextOne from '$lib/components/TextOne.svelte';
    import TextTwo from '$lib/components/TextTwo.svelte';
    import Marquee from '$lib/components/Marquee.svelte';
    import CenteredText from '$lib/components/CenteredText.svelte';
    import SelfPortrait from '$lib/components/SelfPortrait.svelte';
    import WideText from '$lib/components/WideText.svelte';
    import EyeMarquee from '$lib/components/EyeMarquee.svelte';
    import TextThree from '$lib/components/TextThree.svelte';
    import Contact from '$lib/components/Contact.svelte';
    import Footer from '$lib/components/Footer.svelte';

    const components = [
        Splash,
        TextOne,
        TextTwo,
        Marquee,
        CenteredText,
        SelfPortrait,
        WideText,
        EyeMarquee,
        TextThree,
        Contact,
        Footer
    ]

</script>

<div class="wrapper">
    {#each components as Component}
        <Component />
    {/each}
</div>

<style lang="scss">

    .wrapper {
        padding: 1rem;
    }

</style>