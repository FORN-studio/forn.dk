---
title: konsent
description: Om det første jeg nogensinde byggede - en konsensusbaseret beslutningsplatform inspireret af anarkosyndikalistiske organisationsmodeller, hardcodede secrets og det hele.
category: Arkitektur
slug: konsent
date: 2026-01-11
icon: architecture
---

*Fair advarsel: kodebasen bag denne historie er ni år gammel. Hardcodede secrets, jQuery, Bootstrap 3 - hele pakken. Du er hermed advaret.*

Det første jeg byggede var en konsensusbaseret beslutningsplatform inspireret af anarkosyndikalistiske organisationsmodeller - en Flask-applikation med en oprigtig tro på at software kunne operationalisere principperne bag den spanske borgerkrig's arbejderråd.

Ideen var at fællesskaber ikke burde have brug for repræsentanter. Repræsentativt demokrati er, i den anarkistiske læsning, en handling hvor man overgiver sin autonomi til nogen der uundgåeligt vil udvikle interesser adskilt fra ens egne - og svaret er ikke bedre repræsentanter men elimineringen af selve repræsentantfunktionen. Det man har brug for i stedet er en proces: en måde for grupper at rejse emner, deliberere, konvergere mod løsninger, og beskytte individer mod flertallets tyranni. Konsent var mit forsøg på at kode den proces ind i en webapplikation, hvilket set i bakspejlet er en vildt ambitiøs ting at forsøge som et første projekt, men ambitionen var pointen.

## modellen

De fire faser mappede til en beslutningsstruktur som anarkistiske organisationer har brugt i over et århundrede, tilpasset asynkron digital deltagelse.

Fase et var prioritering. Et emne trådte ind i systemet og havde brug for halvdelen af gruppens stemmer for at komme videre - et groft filter for relevans der forhindrede systemet i at drukne i forslag ingen gik op i. Fase to var diskussion: løsninger blev foreslået som kommentarer, eksternt læsemateriale kunne vedhæftes, og efter en konfigurerbar hvileperiode avancerede den mest-stemte løsning. Fase tre var vetovinduet - en periode hvor ethvert medlem kunne afgive et offentligt veto, deres navn vedhæftet og synligt for alle, hvis udfaldet ville forårsage reel skade. Fase fire var afslutning: løsningen stod som en registrering af hvad fællesskabet besluttede.

Systemet havde ingen roller, ingen moderatorer, intet admin-panel. Alle i en union så de samme emner og havde den samme magt, fordi hele præmissen var at hierarki er problemet, og et værktøj der genintroducerer hierarki mens det hævder at løse det har misset sin egen pointe.

## koden

Koden var præcis hvad man ville forvente fra en der var mere interesseret i politisk teori end software engineering. Hardcodede CSRF secrets. N+1 database queries i nestede loops. Et APScheduler-job der pollede hvert tredive sekund for at tjekke om nogen posts var udløbet, fordi jeg ikke kendte til database triggers eller event-driven arkitekturer. Flask blueprints som jeg opdagede halvvejs igennem og eftermonterede med synlige sømme. En CSS-footer positioneret med `position: fixed; width: 7vw; left: 47%`, som virkede på præcis én skærmstørrelse.

Static assets-mappen indeholdt PDF'er af Det Anarkistiske Manifest og Kropotkins Brødets Erobring, hvilket fortæller alt om hvor mine prioriteter lå på det tidspunkt.

Men under den naive implementation var noget af tænkningen sund. Vetomekanismen fangede noget virkeligt om konsensusprocesser - at flertalsstyre uden individuel rekurs bare er demokrati med færre trin, og at magten til at sige "dette vil forårsage skade" er den minimale garanti et ikke-hierarkisk system skal tilbyde. Den offentlige natur af vetoet, knyttet til et navn, skabte ansvarlighed uden autoritet. Den faseopdelte progression tvang deliberation by design - man kunne ikke springe fra problem til løsning uden at passere gennem diskussion.

## ni år senere

Kerneprincippet - at grupper kan organisere sig uden hierarki hvis processen er rigtig - føles stadig sundt for mig. Det Konsent beviste, lige akkurat, var at princippet overhovedet kunne tage form i software. Alt ud over den kerne forblev urealiseret: tærsklerne var vilkårlige, timingen var rigid, vetomekanismen havde brug for langt mere nuance end en binær kontakt. At bringe dette til noget der rent faktisk virker kræver betydelig tanke om hvordan konsensus skalerer, hvordan forskellige grupper opererer i forskellige tempi, og hvordan man balancerer individuel beskyttelse mod kollektiv paralyse. Den tænkning er stadig i gang.

Koden er, naturligvis, meget af sin tid. Men software koder filosofi ind uanset om man har tænkt sig det eller ej, og de sværeste problemer at løse er dem i modellen snarere end i koden. Konsent var det første jeg byggede, og de spørgsmål det forsøgte at besvare informerer stadig alt der kom efter.
