---
title: bare metal kubernetes
description: Kubernetes på fysisk hardware med Talos Linux - uforanderlig, API-drevet infrastruktur uden skyregningen.
category: Platform Engineering
slug: bare-metal-kubernetes
date: 2026-03-10
icon: infrastructure
---

Der er en særlig tilfredsstillelse i at racke sine egne servere og vide præcis hvad der kører på dem. Ikke fordi skyen er dårlig - den er oprigtigt fremragende til det den gør - men fordi økonomien og kontrollen ved fysisk hardware for visse workloads er umulig at slå.

## Hvorfor bare metal

Skyen abstraherer maskinen væk. Det er dens salgsargument og lejlighedsvis dens problem. Når du har brug for forudsigelig latens, vedvarende compute, eller simpelthen nægter at betale tre gange hardwareprisen for privilegiet af en andens API, begynder bare metal at se attraktivt ud.

Udfordringen har altid været den operationelle overhead. At administrere et OS, patche kerner, konfigurere netværk - den slags arbejde der gør ingeniører nostalgiske efter managed services inden for en uge. Talos Linux ændrer denne ligning.

## Talos som OS-lag

Talos er ikke en generel Linux-distribution. Det er et specialbygget OS til Kubernetes der ikke eksponerer SSH, shell eller pakkehåndtering. Hele systemet konfigureres gennem en deklarativ API. Du definerer maskinkonfigurationer som YAML, anvender dem, og noden konvergerer til den ønskede tilstand.

Det lyder restriktivt indtil man indser at alt hvad man ville SSH'e ind på en node for at gøre - opdatere en kerneparameter, konfigurere et netværksinterface, rotere certifikater - håndteres gennem API'et. Noden bliver cattle i ordets sande forstand. Hvis den opfører sig dårligt, debugger du den ikke. Du erstatter den.

```yaml
machine:
  type: controlplane
  network:
    hostname: cp-01
    interfaces:
      - interface: eth0
        dhcp: false
        addresses:
          - 10.0.0.10/24
  install:
    disk: /dev/sda
    image: ghcr.io/siderolabs/installer:v1.9.0
```

## Bootstrapping af klyngen

En Talos-klynge starter med generering af en secrets-bundle og maskinkonfigurationer. Secrets-bundlen indeholder PKI-materialet - klynge-CA, service account-nøgler, etcd-CA - og genereres én gang, opbevares sikkert og bruges til at udlede alle nodekonfigurationer.

Bootstrap-sekvensen er ligetil: boot noder fra Talos ISO (PXE eller USB), anvend maskinkonfigurationer via `talosctl`, og bootstrap den første control plane-node. etcd dannes, Kubernetes API'et kommer op, og worker-noder tilslutter sig automatisk.

Hele processen er reproducerbar. Ødelæg klyngen, genanvend konfigurationer, og du får et identisk miljø. Ingen Ansible playbooks, ingen shell-scripts med skjult tilstand.

## Netværk med Cilium

Standard Kubernetes-netværksmodellen fungerer men efterlader performance og observerbarhed på bordet. Cilium, der kører som CNI, erstatter kube-proxy fuldstændigt med eBPF-programmer knyttet direkte til kernens netværksstack.

På bare metal betyder dette noget. Der er intet virtuelt netværk at abstrahere væk - pakker rammer rigtige NIC'er, krydser rigtige switches, og enhver overhead i netværksstakken oversættes direkte til latens. Ciliums eBPF-datapath undgår den iptables-kædetraversering som kube-proxy er afhængig af, hvilket reducerer per-pakke-behandlingstiden markant.

Ud over performance giver Cilium dig netværkspolitikker der faktisk virker, transparent kryptering mellem noder via WireGuard, og Hubble til netværksobserverbarhed. At kunne se præcis hvilken pod der talte med hvilken service, med latenspercentiler, er uvurderligt når man debugger i produktion.

## Den operationelle virkelighed

At køre sin egen control plane betyder at eje etcd. Det er den del der holder folk på managed Kubernetes. etcd er et konsensusbaseret lager der kræver omhyggelig opmærksomhed på disk-latens, member-sundhed og backup-strategi.

På Talos håndteres etcd-administration af OS'et. Automatiserede snapshots, member-promovering og -degradering under skalering, og disaster recovery gennem API'et. Det er ikke zero-ops, men det er tæt på. Den resterende operationelle overflade er hardwarefejl (diske dør, NIC'er fejler) og kapacitetsplanlægning.

Gevinsten er fuldstændig kontrol. Ingen cloud-udbyder der throttler din API-server. Ingen overraskelsesregninger fra cross-AZ-trafik. Ingen ventetid på at en managed service understøtter den Kubernetes-version du har brug for. Du opgraderer når du vil, konfigurerer hvad du vil, og betaler kun for hardware og strøm.

For workloads der retfærdiggør det - ML-træning, persistent storage-klynger, latensfølsomme services - er bare metal Kubernetes med Talos så tæt på det ideelle infrastrukturlag som jeg har fundet.
