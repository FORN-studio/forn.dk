---
title: voksende beregning
description: Om emergens, eksotiske beregningssubstrater, og et grid af identiske celler der lærte at balancere en stang gennem selvorganisering.
category: Machine Learning
slug: growing-computation
date: 2026-03-21
icon: ml
---

Emergens er et af de koncepter der modstår ren definition præcis fordi fænomenet selv modstår reduktion. En flok stære producerer murmurations - store, flydende former der bølger og folder sig hen over himlen - og ingen enkelt fugl styrer. En termitkoloni bygger katedralagtige tuer med ventilationssystemer der regulerer temperaturen inden for en grad, og ingen termit har en tegning. Neuroner, individuelt, gør næsten intet interessant: de akkumulerer ladning, de fyrer, de nulstiller. Milliarder af dem sammen producerer bevidsthed, eller i det mindste noget vi ikke kan skelne fra det.

Det der gør emergens magnetisk som koncept er at det bryder med intuitionen om at kompleks adfærd kræver komplekst design. Det modsatte bliver ved med at vise sig - at tilstrækkeligt mange simple agenter, der følger simple regler og interagerer lokalt, producerer global adfærd som ingen har forfattet. Kompleksiteten lever i interaktionen, ikke i komponenterne, og dette har implikationer der breder sig ud fra biologi til beregning, fordi det antyder at der findes former for computing der overhovedet ikke ligner de arkitekturer vi har lært at bygge.

## eksotiske substrater

Konventionel computing er designet fra toppen og ned. Man specificerer lag, forbindelser, aktiveringsfunktioner, dataflow. Information bevæger sig gennem pathways som en ingeniør har tegnet, bogstaveligt eller billedligt, før træning begyndte. Det virker ekstraordinært godt, og det er også, i en dyb forstand, skrøbeligt - arkitekturen er flaskehalsen, og hvis problemet ikke passer den form man designede, redesigner man formen eller accepterer tabet.

Naturen beregner anderledes. En slimsvamp finder den korteste vej gennem en labyrint uden et nervesystem, ved at vokse mod føde og trække sig tilbage fra affald, og løsningen emergerer fra de fysiske dynamikker i dens vækst. Reaktions-diffusionssystemer producerer leopardpletter, zebrasstriber og lungernes forgreningsmønstre gennem lokale kemiske interaktioner der ingen forestilling har om det globale mønster de skaber. Disse er beregninger i bredeste forstand - input der producerer output gennem en proces - men processen er ikke designet. Den er groet.

Spørgsmålet der ledte til dette eksperiment var om man kunne gro beregning på et digitalt grid. Ikke simulere et biologisk system, men låne princippet: start med et homogent substrat af identiske celler, giv hver celle en lærbar opdateringsregel, og se om træning kan producere emergent beregning der løser en virkelig opgave.

## griddet

Neurale cellulære automater er værktøjet til at stille dette spørgsmål. Konceptet blev udforsket smukt i [Growing Neural Cellular Automata](https://distill.pub/2020/growing-ca/) og udvidet mod universel funktionsapproksimation i [A Path to Universal Neural Cellular Automata](https://arxiv.org/pdf/2505.13058). Hver celle i griddet kører et lille neuralt netværk der kigger på sit umiddelbare 3x3 nabolag og beslutter hvordan den skal opdatere sin egen tilstand. Reglerne er identiske for hver celle og lært gennem gradient descent, hvilket betyder at man kan pege systemet mod en måladfærd og lade optimering finde ud af hvilke lokale interaktioner der producerer den.

Griddet jeg byggede behandler dette som et beregningssubstrat - information ankommer ved input nodes arrangeret i en cirkel omkring periferien, og forlader ved output nodes samlet nær centeret. Imellem dem sender hver celle information til sine naboer gennem hidden channels som træningsprocessen giver mening. Der er ingen wiring, ingen eksplicit routing mellem input og output. Cellerne skal lære at videresende information hen over griddet gennem rent lokale interaktioner, og hvis dette lyder som om det ikke burde virke, er det fordi intuitionen fra konventionelle netværk - hvor information flyder gennem designede pathways - ikke gælder her. Pathways emergerer.

Fire rate-mekanismen tilføjer en yderligere begrænsning: ved hvert skridt opdaterer omtrent halvdelen af cellerne slet ikke. Denne stokastiske dropout tvinger griddet til at udvikle robuste kommunikationsmønstre der overlever delvis stilhed, og forhindrer det i at falde til ro i skrøbelige fixed-point løsninger der kun virker når hver celle fyrer i perfekt synkroni. Det er en form for regularisering der samtidig fungerer som en analogi til biologiske systemer, hvor heller ikke hver neuron fyrer ved hvert tidstrin.

## at balancere en stang

Proof of concept var CartPole - det standard reinforcement learning-benchmark hvor en agent balancerer en stang på en vogn ved at påføre venstre eller højre kræfter. Fire observationer går ind (vognposition, vognhastighed, stangvinkel, stangens vinkelhastighed) og én beslutning kommer ud (skub venstre eller skub højre). Tilgangen trækker kraftigt på arbejdet i [Towards Self-Organized Control](https://arxiv.org/abs/2106.15240), som demonstrerede at NCA'er kunne fungere som control policies for RL-opgaver.

At træne dette med en Double DQN føltes som at undervise en organisme snarere end at tune en model. Griddet skulle prætrænes på en simplere opgave først - at beregne gennemsnittet af sine inputs - bare for at etablere at information overhovedet kunne flyde fra kanterne til centeret. Uden dette curriculum-trin var RL-signalet for sparsomt til at griddet kunne opdage kommunikation fra bunden, som at forsøge at lære sprog til et system der endnu ikke har lært at høre.

Da pathways eksisterede, kunne reinforcement learning forfine dem. Griddet lærte at balancere stangen, og at se celletilstandene under en rollout var oprigtigt fascinerende - bølger af aktivering der propagerede indad fra input nodes, hidden channels der udviklede spatiale mønstre som korrelerede med stangens vinkel, output-celler der flimrede mellem tilstande mens beslutningsgrænsen blev krydset. Beregningen skete, synligt, hen over griddet, og intet af det var designet. Det voksede.

## hvad der emergerer

Den praktiske nytte af dette er, ærligt talt, begrænset. Et standard feedforward-netværk løser CartPole på en brøkdel af tiden med en brøkdel af parametrene, og kræver hverken et pretraining-curriculum eller overflow penalties for at holde griddet fra at divergere. Der er ingen god grund til at bruge en cellulær automat til kontrolopgaver som konventionelle arkitekturer håndterer trivielt.

Men grunden til at bygge det var aldrig effektivitet, det var spørgsmålet nedenunder: hvad sker der når beregning ikke er designet men emergent? Cellerne i dette grid kører alle den samme funktion. Der er ingen forskel mellem lag et og lag fire, ingen skip connections, ingen attention-mekanismer. Strukturen opstår fra træning, og den opstår forskelligt afhængigt af opgaven, griddets størrelse og fire rate. Det samme substrat, formet af forskellige pres, producerer forskellige beregningstopologier - hvilket er tæt på hvordan biologiske nervesystemer fungerer, udifferentierede celler der specialiserer sig gennem eksponering for signaler.

At se det ske i miniature, i en JAX kernel, på et problem så simpelt som at balancere en pind, bærer en særlig slags svimmelhed. Griddet ved ikke hvad en stang er. Det ved ikke at det løser et problem. Det lærte bare at reagere på mønstre ved sine kanter ved at producere mønstre ved sit center, og de mønstre holder tilfældigvis en simuleret stang oprejst.

Implikationerne er mere interessante end implementeringen, hvilket sandsynligvis er kendetegnet på et godt eksperiment.
