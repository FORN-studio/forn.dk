---
title: fyrre tokens
description: Om at bygge en character-level transformer der renser adresser - et argument med to millioner parametre for specialisering over skala.
category: Machine Learning
slug: forty-tokens
date: 2026-03-21
icon: ml
---

Adresser er et af de problemer der virker trivielle indtil man kigger på rigtige data. Et menneske der læser "Nørrebrogde 42 2 th, 2200 Kbh N" finder frem. Et databaseopslag gør ikke, fordi gaden er stavet forkert, byen er forkortet, og etagebetegnelsen følger en konvention systemet ikke kender til. Gang det med et par millioner rækker af OCR-output, manuel indtastning og legacy-migrationer, og du har et datasæt hvor informationen er til stede men formen er upålidelig.

Det oplagte moderne svar er at kaste en stor sprogmodel efter det. Og det ville formentlig virke, på samme måde som det virker at chartre en helikopter for at krydse en flod - teknisk effektivt, komisk uforholdsmæssigt, og dyrt at holde kørende. Det interessante spørgsmål er hvad der sker når man bygger den mindste ting der rent faktisk kunne løse problemet.

## et vokabular

Modellen jeg byggede læser adresser ét tegn ad gangen. Hele dens vocabulary er fyrre tokens - det lille latinske alfabet, de danske bogstaver æ, ø og å, cifre, en håndfuld tegnsætningstegn, en padding token og en token for alt den ikke har set før. Der er ingen word-level tokenization, ingen subword-segmentering, ingen BPE. Bare tegn.

Det viser sig at være en styrke i præcis det domæne hvor det lyder som en begrænsning. Adressekorruption sker på character-niveau - et ombyttet bogstav, et manglende ciffer, en OCR-artefakt der forvandlede ø til o. En model der ser tegn individuelt kan lære at genkende "Nørrebrogade" og "Nørebrogde" som den samme gade på samme måde som du kan læse et ord med blandede midterbogstaver, fordi det strukturelle mønster er intakt selv når individuelle tegn er forkerte.

Arkitekturen er en lille transformer - fire lag, fire attention heads, 128 dimensioner, omtrent to millioner parametre. Rotary position embeddings håndterer sekvensrækkefølge uden lærte positionelle vektorer, og attention-based pooling komprimerer en variabel-længde sekvens af character embeddings til en enkelt 128-dimensional vektor. Hele modellen kører komfortabelt på en CPU.

## mønstre, ikke støj

Træningsfilosofien kom fra et spørgsmål der i starten virkede som en blindgyde: hvordan genererer man træningsdata for fejl man ikke har set? Man kan ikke opremse enhver mulig stavefejl af enhver dansk adresse. Man kan ikke forudse hvad en OCR-motor fra 2003 vil gøre ved et håndskrevet postnummer. At forsøge at modellere støjen direkte er et uendeligt spil.

Inversionen der fik det til at virke var at holde op med at tænke på støj og i stedet tænke på invarians. Hvis man tager en korrekt adresse og påfører tilfældigt kaos - indsætter tegn, sletter tegn, substituerer tegn, blander ordrækkefølge, lejlighedsvis fjerner postnummeret eller byen - og så træner modellen til at producere den samme embedding for både den rene og den korrupte version, er det modellen lærer hvad der forbliver stabilt under perturbation. Den lærer de mønstre der overlever støj, hvilket er en fundamentalt anderledes ting end at lære hvordan støjen ser ud.

Contrastive loss-funktionen formaliserer dette: en anker-adresse og dens augmenterede version bør lande tæt på hinanden i embedding space, mens alle andre adresser i batchen skal skubbes fra hinanden. Modellen behøver ikke vide hvordan OCR-artefakter ser ud. Den skal vide at "Vesterbrogade 24, 1620 København V" og "Vestrbrogde 24 1620 kbhvn" deler en dybere identitet der overlever overfladeskaden.

## tre stadier

Embedding alene løser ikke problemet, fordi neurale modeller er fremragende til at fange semantisk lighed og middelmådige til at skelne næsten identiske strenge. "Nørrebrogade 42" og "Nørrebrogade 44" lander næsten oven på hinanden i embedding space, og forskellen mellem dem er alt.

Inference-pipelinen adresserer dette ved at adskille hvad modellen er god til fra hvad den ikke er. Først embeddes query-adressen. Så henter en vector search mod hele baseline af kendte adresser de nærmeste 250 kandidater - dette er det trin hvor modellens forståelse af adressestruktur gør det tunge arbejde, overlever stavefejl og manglende komponenter der ville besejre ethvert exact-match system. Til sidst re-ranker fuzzy string matching de 250 kandidater efter edit distance, og den kandidat der er både semantisk tæt og tekstuelt nærmest vinder.

Det neurale stadie håndterer den svære del - at genkende at en slemt beskadiget adresse refererer til et virkeligt sted - og fuzzy-stadiet håndterer den præcise del, at skelne mellem husnumre og etager som embeddings ikke kan separere. Hvert stadie gør det det er godt til, og kombinationen er mere præcis end nogen af tilgangene alene.

## argumentet for lidenhed

Der er en bredere pointe begravet i en model af denne størrelse, nemlig at specialisering og skala ikke er den samme akse. En model med to millioner parametre trænet på en specifik opgave med de rigtige inductive biases vil overgå en model tusind gange dens størrelse der behandler den samme opgave som et generelt tekstproblem, fordi den lille models hele kapacitet er dedikeret til at forstå strukturen af danske adresser og intet andet. Den har ingen viden om poesi, ingen evne til at opsummere artikler, ingen holdning til Frankrigs hovedstad. Den læser adresser, og den læser dem godt.

Det betyder noget ud over den specifikke anvendelse. Standardtrajektorien inden for machine learning lige nu peger mod større modeller med bredere kapabiliteter, og resultaterne er genuint imponerende. Men der er en parallel vej der får mindre opmærksomhed, hvor spørgsmålet er hvor lille og fokuseret en model kan være mens den stadig løser et virkeligt problem i produktion, på en CPU, til en pris der rundes ned til nul. Svaret viser sig at være bemærkelsesværdigt lille - fyrre tokens og to millioner parametre lille - hvis man er villig til at tænke omhyggeligt over hvad modellen rent faktisk har brug for at vide.
