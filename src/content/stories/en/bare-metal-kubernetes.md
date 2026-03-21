---
title: bare metal kubernetes
description: Running Kubernetes on commodity hardware with Talos Linux - immutable, API-driven infrastructure without the cloud bill.
category: Platform Engineering
slug: bare-metal-kubernetes
date: 2026-03-10
icon: infrastructure
---

There is a particular satisfaction in racking your own servers and knowing exactly what runs on them. Not because the cloud is bad - it is genuinely excellent at what it does - but because for certain workloads, the economics and control of bare metal are impossible to beat.

## Why bare metal

The cloud abstracts away the machine. That is its selling point and, occasionally, its problem. When you need predictable latency, sustained compute, or simply refuse to pay three times the hardware cost for the privilege of someone else's API, bare metal starts looking attractive.

The challenge has always been operational overhead. Managing an OS, patching kernels, configuring networking - the kind of work that makes engineers nostalgic for managed services within a week. Talos Linux changes this equation.

## Talos as the OS layer

Talos is not a general-purpose Linux distribution. It is a purpose-built OS for Kubernetes that exposes no SSH, no shell, and no package manager. The entire system is configured through a declarative API. You define machine configs as YAML, apply them, and the node converges to the desired state.

This sounds restrictive until you realize that everything you would SSH into a node to do - update a kernel parameter, configure a network interface, rotate certificates - is handled through the API. The node becomes cattle in the truest sense. If it misbehaves, you do not debug it. You replace it.

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

## Bootstrapping the cluster

A Talos cluster starts with generating a secrets bundle and machine configurations. The secrets bundle contains the PKI material - cluster CA, service account keys, etcd CA - and is generated once, stored securely, and used to derive all node configs.

The bootstrap sequence is straightforward: boot nodes from the Talos ISO (PXE or USB), apply machine configs via `talosctl`, then bootstrap the first control plane node. etcd forms, the Kubernetes API comes up, and worker nodes join automatically.

The entire process is repeatable. Destroy the cluster, re-apply configs, and you get an identical environment. No Ansible playbooks, no shell scripts with hidden state.

## Networking with Cilium

The default Kubernetes networking model works but leaves performance and observability on the table. Cilium, running as the CNI, replaces kube-proxy entirely with eBPF programs attached directly to the kernel's networking stack.

On bare metal, this matters. There is no virtual network to abstract away - packets hit real NICs, traverse real switches, and any overhead in the networking stack translates directly to latency. Cilium's eBPF datapath avoids the iptables chain traversal that kube-proxy relies on, cutting per-packet processing time significantly.

Beyond performance, Cilium gives you network policies that actually work, transparent encryption between nodes via WireGuard, and Hubble for network observability. Being able to see exactly which pod talked to which service, with latency percentiles, is invaluable when debugging in production.

## The operational reality

Running your own control plane means owning etcd. This is the part that keeps people on managed Kubernetes. etcd is a consensus-based store that requires careful attention to disk latency, member health, and backup strategy.

On Talos, etcd management is handled by the OS. Automated snapshots, member promotion and demotion during scaling, and disaster recovery through the API. It is not zero-ops, but it is close. The remaining operational surface is hardware failures (disks die, NICs flake) and capacity planning.

The payoff is complete control. No cloud provider throttling your API server. No surprise bills from cross-AZ traffic. No waiting for a managed service to support the Kubernetes version you need. You upgrade when you want, configure what you want, and pay only for the hardware and power.

For workloads that justify it - ML training, persistent storage clusters, latency-sensitive services - bare metal Kubernetes with Talos is as close to the ideal infrastructure layer as I have found.
