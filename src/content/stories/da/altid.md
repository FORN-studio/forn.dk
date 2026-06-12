---
title: AltID er en katastrofe for retten til privatliv
description: Det nye digitale ID-kort fra Digitaliseringsstyrelsen bliver markedsført som gennemsigtigt, men i virkeligheden må borgerne afgive følsomme data i blinde.
category: Privatliv
slug: altid
date: 2026-06-12
icon: infrastructure
---

Digitaliseringsstyrelsen lancerede i starten af juni deres nye platform, AltID, der skal fungere som et digitalt ID-kort og er en frivillig tilføjelse til MitID. Idéen er, at man med appen kan nøjes med at vise, at man er over 18 år uden at være tvunget til at dele navn eller andre personoplysninger.

Men der mangler centrale dele i den offentliggjorte kode bag appen, og det efterlader borgerne uden reel mulighed for at efterprøve, om deres ret til privatliv er beskyttet.

AltID er bygget på et princip om, at de følsomme oplysninger ikke samles i et centralt register, men ligger lokalt på borgerens egen telefon. Det flytter altså hele tillidsspørgsmålet ét sted hen: til selve appen. Netop derfor er det så vigtigt, at vi i fællesskab bliver givet muligheden for at inspicere og verificere appens opførsel - altså hvilken data den indsamler og hvad den stiller op med det.

Vi skal have tillid til, at appen kan beskytte de værdifulde data mod hackere, kriminelle og andre uvedkommende. Dertil skal vi have tillid til, at hverken myndigheden eller dens private leverandører, hverken nu eller på et senere tidspunkt, lader appen indsamle eller videregive mere end den burde, eller overleverer den indsamlede data til flere end den burde.

Den slags tillid bør vi ikke blive bedt om at udstede i blinde. De danske myndigheders egen historik giver fine eksempler på hvorfor: i 2012 blev blandt andet kørekortregisteret og politiets registre kopieret ved det såkaldte CSC-hack, Danmarks hidtil største hackersag. I 2015 sendte Statens Serum Institut ved en fejl ukrypterede CD'er med sundhedsdata og cpr-numre på 5,3 millioner danskere, som endte hos det kinesiske visumkontor i København. Og Datatilsynet behandler løbende sager om ansatte hos politi og kommuner, der uberettiget har slået borgere op i diverse registre. Tillid til myndighedernes håndtering af vores data kan ikke tages for givet - den skal kunne efterprøves.

I forbindelse med lanceringen af AltID har Digitaliseringsstyrelsen valgt at offentliggøre hovedparten af kildekoden, altså 'opskriften' bag appen. Et forfriskende og spændende initiativ og helt sikkert en god imødekommelse af de borgere, der bekymrer sig for deres privatliv.

For med opskriften bag den nye app frit tilgængelig kan vi alle sammen verificere, at AltID faktisk ikke er den privatlivstrussel, det ellers hurtigt kunne ligne. Vi burde endda kunne afgøre med sikkerhed, at de kritiske data aldrig forlader telefonen.

Men en nærmere undersøgelse af den publicerede kildekode afslører desværre det modsatte.

## kildekoden mangler de dele, der kan koste brugerne deres privatliv

Digitaliseringsstyrelsen skriver selv om løsningen: »Kildekode for både app og bagvedliggende systemer er offentligt tilgængelig.«

Men det er en sandhed med væsentlige modifikationer. Der findes nemlig flere steder i kildekoden det, man kalder stubs, hvilket på normalt dansk oversætter til tomme pladsholdere, der hvor koden skulle have været. Styrelsen oplyser selv, at delene er udeladt af hensyn til sikkerhed og/eller licensvilkår.

De to primære manglende elementer er samtidig de to, der med allerstørst sandsynlighed kan bryde med brugerens privatliv.

Den ene manglende komponent overvåger appens sikkerhed, mens den kører på telefonen. Den arbejder usynligt med adgang til alt, hvad appen selv kan se, og indsamler oplysninger om telefonen. Men da koden er hemmelig, kan ingen udefra kontrollere, hvad den indsamler, eller hvor det sendes hen. Den anden komponent står for at læse den chip, der sidder i vores pas.

## at vise koden bag er et PR-stunt

Normalt ville man i princippet kunne bygge appen ud fra den offentliggjorte opskrift og sammenligne resultatet med den app, der ligger i App Store og Google Play, og dermed bevise, at opskriften faktisk er den, appen er bagt efter. Det kan man ikke her. Manglerne betyder, at koden slet ikke kan samles til en færdig app, og der findes ingen måde at sammenligne med den, der er udgivet.

Den kildekode, Digitaliseringsstyrelsen har offentliggjort, kunne altså lige så godt være komplet konstrueret, som den kunne være reelt repræsentativ for deres nye app. Sikkert er i hvert fald, at den fulde kodebase, som den rigtige AltID-app bygges fra, ikke er offentlig.

Alligevel vælger Digitaliseringsstyrelsen at læne sig op ad kildekoden for at understøtte sin egen påstand om, at AltID er til at stole på.

Man kan centralt i beskrivelsen af kildekoden læse følgende: »Denne åbenhed skal understøtte tillid gennem transparens ved, at interesserede selv kan inspicere kildekoden, bidrage med kvalificeret feedback samt verificere, at løsningen lever op til de fremsatte principper om privacy by design.«

Men det stemmer ikke overens med virkeligheden. Ud fra den offentliggjorte kildekode er det ikke teknisk muligt at verificere, at AltID reelt fungerer efter de privatlivsgarantier, der fremhæves. Borgerne bliver derfor bedt om at stole på Digitaliseringsstyrelsen og styrelsens leverandører, uden mulighed for selvstændigt at kontrollere, om tilliden er berettiget.

Offentliggørelsen af kildekoden bliver altså mere et PR-stunt fra Digitaliseringsstyrelsen end en reel garanti for gennemsigtighed og sikkerhed.

Hvis Digitaliseringsstyrelsen mener åbenheden alvorligt, er opfordringen herfra enkel: Offentliggør de manglende dele. Hvis appens sikkerhed afhænger af, at de manglende dele holdes skjulte - såkaldt security by obscurity - kan appen ikke betragtes som sikker; og hvis komponenter er skjult af licens-hensyn, skal beslutningen om at uddelegere kritisk infrastruktur til private tredjeparter genovervejes på det kraftigste. Indtil det sker, vil løftet om gennemsigtighed aldrig leve op til virkeligheden.
