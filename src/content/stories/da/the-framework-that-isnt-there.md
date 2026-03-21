---
title: frameworket der ikke er
description: Om Sveltes compiler-filosofi, SvelteKits komplekse simplicitet, og et lille lokale i Stockholm hvor et community opdagede at det var virkeligt.
category: Web Development
slug: the-framework-that-isnt-there
date: 2026-03-21
icon: webapp
---

Der er et spørgsmål der ligger under ethvert framework-valg, som sjældent bliver stillet: hvad er det egentlig jeg sender til brugeren? Med de fleste frameworks inkluderer svaret selve frameworket - en runtime der fortolker dine intentioner i det øjeblik de skal blive til pixels på en skærm. React shipper en reconciler, en scheduler, en diffing-algoritme. Vue shipper en reactivity engine og en virtual DOM. Det er sofistikerede maskiner, og enhver bruger betaler omkostningen ved at køre dem uanset om siden viser et blogindlæg eller et real-time dashboard.

Svelte begynder fra en anden præmis: frameworket er et værktøj for udviklerens sind, og brugerens browser har ingen brug for det. En `.svelte`-fil er et sæt instruktioner til en compiler, og det der kommer ud på den anden side er vanilla JavaScript der manipulerer DOM'en direkte - ingen mellemmand, ingen runtime, intet framework i traditionel forstand. Det du arbejdede med under udviklingen er væk inden nogen besøger siden, og det viser sig at være en inversion af hvad et framework er til for, mere end en optimering af et eksisterende.

## med udgangspunkt i HTML

De fleste moderne frameworks starter fra JavaScript og tager HTML med som passager. JSX ligner HTML men lever inde i JavaScript, underlagt JavaScripts regler - ét root-element, `className` i stedet for `class`, expressions i krøllede parenteser hvor attributter plejede at være. Markup'en tjener sproget.

Svelte inverterer dette. En `.svelte`-fil er valid HTML som udgangspunkt - du kan paste rå markup ind i én og det virker. `<script>`-tagget tilføjer logik, `<style>`-tagget tilføjer scoped CSS, og begge er valgfrie. Sproget tjener markup'en, hvilket er et udsagn om hvad webbens native medium faktisk er, og det giver compileren en afgrænset, analyserbar struktur som JavaScript-first tilgange strukturelt set ikke kan replikere.

Hvad dette betyder i praksis er at Svelte-komponenter har en tendens til at læses som siden vil se ud. Kodens struktur afspejler outputtets struktur, og den kognitive afstand mellem det du skriver og det brugeren ser er kortere end i noget andet framework jeg har arbejdet med.

## reactivity som sprog

Måden Svelte tænker om state har ændret sig over tid, og selve ændringen er instruktiv. Svelte 3 tog den position at reactivity burde være usynlig - du erklærer en variabel, du assignér til den, og UI'et opdaterer. Ingen `setState`, ingen hooks, intet API at lære. Compileren instrumenterer assignments bag kulisserne, og udvikleren skriver bare JavaScript.

Det var smukt og det var også, på en specifik måde, uærligt. Magien virkede kun inde i `.svelte`-filer. I det øjeblik du extraherede logik til et almindeligt `.js`-modul - et naturligt refactoring-skridt - brød reactivity'en sammen fordi compileren ikke længere kunne se assignments. Kode opførte sig forskelligt afhængigt af filendelsen, hvilket er den slags subtilitet der eroderer tillid over tid.

Svelte 5's runes (`$state`, `$derived`, `$effect`) bytter et par tegn syntaks for noget mere værdifuldt: konsistens. `let count = $state(0)` er mere eksplicit end `let count = 0`, og det virker identisk overalt - i komponenter, i moduler, i delte utilities. Reactivity'en rejser med koden. Rich Harris kaldte distinktionen "magical, not magic" - oplevelsen bør føles bemyndigende uden at være ugennemsigtig, og den tidligere version havde krydset over i ugennemsigtighed.

## the kit

SvelteKit er hvor tingene bliver genuint interessante, fordi det tager compilerens filosofi og udvider den til applikationsarkitektur med et sæt holdninger der lyder simple og viser sig at være dybe.

Filbaseret routing med `+` prefix-konventionen (`+page.svelte`, `+layout.svelte`, `+page.server.js`) løste et specifikt problem - at colocate hjælpekomponenter med routes uden at de ved et uheld blev routes selv - og det det reelt etablerede var en kontrakt. `+`-namespacet siger: disse filer deltager i frameworkets orkestrering. Alt andet er dit.

Load-funktionen er det mest gennemtænkte stykke af arkitekturen. Den skaber en formel adskillelse mellem dataforberedelse og rendering - data er klar før komponenten mounter, der er ingen loading spinners som default, ingen waterfalls medmindre du skaber dem. Two-tier systemet, universelle loads der kører på både server og client og server loads der aldrig rører browseren, placerer serialization boundary på resource-niveau frem for komponentniveau. Du beslutter, per route, hvad der kræver serveradgang og hvad der kan køre hvor som helst.

Og så er der form actions, som måske er den mest stille radikale feature i noget moderne framework. En `<form>` med en action virker uden JavaScript. Serveren behandler POST'en, returnerer et resultat, siden opdaterer. Tilføj `use:enhance` og den samme form submitter via fetch, opdaterer UI'et uden reload, håndterer fejl elegant - og server-side koden ændrer sig overhovedet ikke. Progressive enhancement er her default-arkitekturen, og JavaScript'en er rent additiv.

## stockholm

Jeg var i Stockholm i november 2022, da Svelte-communityet samledes i person for første gang. Tidligere summits havde været online - COVID havde holdt alle distribueret, samarbejdende gennem Discord-kanaler og pull request-tråde om et framework uden at have delt et lokale. Stockholm var første gang mange af disse mennesker så hinandens ansigter uden for et videoopkald.

Eventet var lille efter konferencestandarder, hvilket viste sig at være pointen. Ingen expo-hal, ingen vendor-boder, intet lanyardhierarki. Rich Harris talte om vejen til SvelteKit 1.0, som ville shippe en måned senere, og det der ramte mig var lokalet selv, mere end de tekniske detaljer der allerede var tilgængelige i GitHub-diskussionerne. Et par hundrede mennesker der uafhængigt af hinanden var nået frem til den samme æstetiske overbevisning om hvordan webudvikling bør føles, der mødtes for første gang og opdagede at det community de havde bygget online var virkeligt på den måde som kun fysisk tilstedeværelse kan bekræfte.

Der er noget instruktivt ved et framework hvis første fysiske samling skete efter årevis af at communityet allerede arbejdede sammen. Værktøjet havde formet communityet før communityet havde formet sig selv, og det man så i Stockholm var mennesker der genkendte en delt sensibilitet de hver især havde udviklet i isolation - en allergi over for overhead, en respekt for platformen, en præference for løsninger der forsvinder ind i arbejdet frem for at annoncere sig selv.

## kompleks simplicitet

Rich Harris lånte frasen "transitional apps" fra indretningsdesign - en blanding af traditionelt og moderne - til at beskrive afvisningen af SPA versus MPA-binæren. Et veldesignet framework bør lade dig server-rendere for hastighed og resiliens, enhance med JavaScript for flydende oplevelser, og prerendere hvor indhold er statisk, alt sammen inden for den samme applikation, per side hvis nødvendigt.

Det der gør dette til en kompleks simplicitet frem for bare kompleksitet er at hver af disse kapabiliteter eksponeres gennem det samme lille sæt primitiver. En page option (`export const prerender = true`) gør en route til statisk HTML ved build time. En anden (`export const csr = false`) stripper al JavaScript fra en side helt. Load-funktionen håndterer både SSR og client-side navigation gennem den samme code path. Forms virker med og uden JavaScript gennem den samme markup. Overfladearealet er lille, og dybden er enorm.

Det er det mærkværdige ved SvelteKit - at så meget arkitektonisk kraft passer ind i så få koncepter, og at frameworkets holdninger konsekvent peger mod webplatformens native kapabiliteter frem for væk fra dem. Det bruger HTTP i stedet for at abstrahere det, enhancer forms i stedet for at erstatte dem, compiler til browseren i stedet for at kæmpe mod den. Og så, tro mod sin natur, forsvinder det.
