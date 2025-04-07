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

    import { onMount } from 'svelte'

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

    let title = $state('FORN | Web Production and Development')

    onMount(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                title = 'Was i too much?';
            } else {
                title = 'FORN | Web Production and Development';
            }
            document.title = title;
        };
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    })

</script>

<svelte:head>
    <title>FORN | Web Production and Development</title>
    <meta name="description" content="FORN is a one-man army production and design studio based in Copenhagen, Denmark, aimed at web production, extraordinary designs and reliable development.">
    <meta property="og:title" content="FORN | Web Production and Development">
    <meta property="og:description" content="FORN is a one-man army production and design studio based in Copenhagen, Denmark, aimed at web production, extraordinary designs and reliable development.">
    <meta property="og:image" content="/og_image.jpg">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="FORN | Web Production and Development">
    <meta name="twitter:description" content="FORN is a one-man army production and design studio based in Copenhagen, Denmark, aimed at web production, extraordinary designs and reliable development.">
    <meta name="twitter:image" content="/og_image.jpg">

    {@html `<script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "FORN",
            "description": "FORN is a one-man army production and design studio based in Copenhagen, Denmark, aimed at web production, extraordinary designs and reliable development.",
            "url": "https://forn.dk",
            "image": "/og_image.jpg",
            "publisher": {
                "@type": "Organization",
                "name": "FORN"
            }
        }
    </script>`}
    
</svelte:head>

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