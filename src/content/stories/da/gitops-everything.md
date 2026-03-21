---
title: gitops alt
description: Deklarativ infrastruktur og applikationslevering gennem Git som den eneste sandhedskilde - forsoning frem for imperative kommandoer.
category: DevOps
slug: gitops-everything
date: 2025-11-20
icon: devops
---

Det første der går galt i enhver infrastrukturopsætning er drift. Nogen anvender en manuel ændring for at fikse et produktionsproblem. Ændringen virker men committes aldrig nogen steder. En måned senere genprovisionerer en anden miljøet fra "sanhedskilden" og fikset forsvinder. Hændelsen gentager sig.

GitOps eliminerer denne klasse af problemer ved at gøre Git til den eneste måde at ændre noget på.

## Kernepricippet

GitOps er en enkelt idé anvendt konsekvent: den ønskede tilstand af dit system er deklareret i et Git-repository, og en automatiseret proces forsoner kontinuerligt den faktiske tilstand til at matche. Ingen imperative kommandoer, ingen ad-hoc scripts, ingen SSH-sessioner til produktion.

Det er ikke nyt i koncept - konfigurationsstyringsværktøjer som Puppet og Chef lovede det samme. Det der er nyt er eksekveringsmodellen. I stedet for at pushe ændringer fra en CI-pipeline, trækker en controller inde i klyngen den ønskede tilstand og konvergerer mod den. Distinktionen er vigtig for sikkerhed (intet eksternt system behøver credentials til din klynge), pålidelighed (controlleren prøver igen indtil tilstanden matcher) og sporbarhed (enhver ændring er en Git-commit).

## Flux og ArgoCD

De to dominerende GitOps-controllere er Flux og ArgoCD. De løser det samme fundamentale problem med forskellige trade-offs.

**Flux** er et sæt komponerbare controllere. Source-controllere overvåger Git-repositories, Helm-repositories eller OCI-registries. Kustomize- og Helm-controllere forsoner manifester. Notification-controllere rapporterer status. Du komponerer de dele du har brug for. Filosofien er Unix-lignende: små, fokuserede værktøjer der kædes sammen.

**ArgoCD** er en applikationscentreret platform med web-UI, RBAC og projektabstraktioner indbygget. Den er mere opinioneret og giver en rigere out-of-box oplevelse, særligt for teams der ønsker synlighed i deployment-tilstand uden at forespørge klyngen direkte.

Til bare-metal-opsætninger hvor operationel enkelhed er vigtigt, tenderer Flux til at være det bedre fit. Dets footprint er mindre, dets CRD'er er ligetil, og det integrerer rent med Kustomize-baserede repository-strukturer. Men begge virker - valget er mindre vigtigt end forpligtelsen til modellen.

## Repository-struktur

Hvordan du organiserer dit GitOps-repository bestemmer hvor vedligeholdeligt systemet er i skala. Strukturen jeg er landet på separerer bekymringer i tre lag:

```
├── infrastructure/    # klynge-niveau ressourcer
│   ├── controllers/   # ingress, cert-manager, monitoring
│   ├── configs/       # klyngepolitikker, resource quotas
│   └── crds/          # custom resource definitions
├── apps/              # applikations-workloads
│   ├── production/
│   └── staging/
└── clusters/          # per-klynge konfiguration
    ├── production/
    └── staging/
```

`clusters/`-mappen er indgangspunktet. Hver klynges Kustomization peger på de infrastruktur- og app-lag den har brug for. Miljøspecifikke overrides (replikaantal, ressourcebegrænsninger, feature flags) lever i klyngemappen. Delte definitioner lever i infrastructure og apps.

Denne struktur betyder at tilføjelse af en ny klynge er et spørgsmål om at oprette en ny mappe med de passende Kustomization-overlays. Ingen ændringer til applikationsmanifester, ingen betinget logik, ingen templating-hacks.

## Secrets management

Den oplagte udfordring med Git som sandhedskilde: du kan ikke committe secrets. Flere tilgange eksisterer, og ingen er perfekte.

**Sealed Secrets** krypterer secrets med en klyngespecifik nøgle. Den krypterede form er sikker at committe. Controlleren i klyngen dekrypterer dem. Simpelt, men nøglerotation kræver genkryptering af alle secrets, og du mister evnen til at læse secret-værdier fra repositoryet.

**SOPS med age eller GPG** krypterer secret-værdier in-place i YAML-filer. Strukturen af manifestet er synlig; kun værdierne er krypterede. Flux har native SOPS-support. Det er min foretrukne tilgang fordi det holder secrets ved siden af de ressourcer der bruger dem mens det bevarer læsbarhed.

**Eksterne secret stores** (Vault, AWS Secrets Manager) holder secrets uden for Git helt. En operator synkroniserer dem ind i Kubernetes secrets. Mere infrastruktur at håndtere, men giver centraliseret secret lifecycle management, rotation og adgangsauditering.

## Progressiv levering

GitOps foreskriver ikke hvordan du deployer - kun at den ønskede tilstand er i Git. Deployment-strategien er defineret i manifesterne selv.

Canary-deployments med Flagger: push et nyt image-tag til Git, Flagger skifter automatisk trafik inkrementelt, overvåger metrikker og promoverer eller ruller tilbage. Hele processen er automatiseret og sporbar. Hvis canaryen fejler, afspejler Git-repositoryet stadig den ønskede tilstand, og rollback er bare controlleren der vender tilbage til den.

Blue-green deployments: vedligehold to komplette miljøer, skift trafik atomisk. Mere ressourcekrævende men eliminerer risikovinduet ved inkrementelle udrulninger.

Pointen er at deployment-strategien er kode, committet ved siden af applikationsmanifesterne, reviewet i pull requests og versioneret med alt andet.

## Det operationelle skift

GitOps ændrer hvordan du opererer. I stedet for `kubectl apply` eller `helm upgrade` åbner du en pull request. I stedet for at debugge hvad nogen ændrede manuelt, læser du Git-loggen. I stedet for runbooks der siger "SSH til bastionen og kør dette script", har du et repository der beskriver præcis hvad der skal køre.

Indlæringskurven er reel. Ingeniører vant til imperative workflows finder det frustrerende at lave en ændring ved at committe YAML og vente på forsoning. Men gevinsten er en infrastruktur der er reproducerbar, sporbar og gendannelig. Hvis en klynge dør, peger du en ny på det samme Git-repository og venter. Alt konvergerer.
