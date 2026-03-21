---
title: the machine you can't log into
description: On the experience of working with Talos Linux across virtualized, bare metal and Hetzner environments - and what happens when the OS removes the premise of logging in.
category: Platform Engineering
slug: the-machine-you-cant-log-into
date: 2026-02-22
icon: infrastructure
---

The first time you work with Talos, you reach for SSH and it isn't there. The binary doesn't exist on the filesystem. There is no shell. The root filesystem is read-only. The only way in is a gRPC API that speaks mutual TLS, and the only thing listening on the other end is an opinion about what an operating system should be.

This is disorienting in a way that's hard to overstate to anyone who's spent years treating servers as places you visit. The muscle memory runs deep - something goes wrong, you SSH in, you poke around, you fix it. Talos removes the entire premise and asks you to reconsider what "fix it" means when the machine is defined by a single YAML document and any state that deviates from that document is, by definition, wrong.

## the virtual rehearsal

Most people meet Talos in a virtualized environment first, a few VMs on Proxmox or a local hypervisor, and this is where the old habits come to die. You boot from an ISO, the machine enters maintenance mode and waits - not for you to log in and configure it, but for you to send it a machine config from your workstation. The node reads the config, converges to the desired state, and either becomes what you described or tells you why it can't.

The small surprises accumulate. Virtual disks appear as `/dev/vda` instead of `/dev/sda` and the config you copied from a tutorial fails silently. etcd needs SSD-backed storage even in a lab, and spinning disk makes it flake in ways that look like network issues. The VIP you configured for the API endpoint doesn't come online until after bootstrap, and you spend twenty minutes troubleshooting something that simply hasn't happened yet. Each of these is the kind of lesson that would be a quick fix on a traditional system - edit a config, restart a service - but here requires you to update the machine config and let the system reconverge. The feedback loop is longer, and the result is always reproducible.

What the virtual environment teaches you, underneath the specifics, is that Talos means it. The immutability isn't a philosophy statement on a landing page; you genuinely cannot install tcpdump. You either bake it into a system extension through the Image Factory or you use `talosctl pcap`. The node is not a place. It is a function of its config.

## bare metal

When you move to physical hardware, the abstraction is tested against reality in a way that VMs can't replicate. Disk paths vary by hardware. Multi-NIC machines need explicit subnet configuration to prevent etcd from binding to the wrong interface. PXE boot chains involve DHCP, TFTP, iPXE scripts, and a matching service like Matchbox that renders machine-specific profiles based on MAC address - infrastructure that exists solely to make the question "what should this machine be?" answerable from the network.

The interesting thing is that once this infrastructure exists, provisioning a new node really does reduce to applying a config. A machine boots, receives its identity from the network, pulls the Talos image, converges, and joins the cluster. No SSH, no Ansible playbook, no engineer manually running through a checklist. The server is indistinguishable from its config, and replacing it means booting a new one with the same YAML.

This is where the cattle metaphor stops being a metaphor. A misbehaving node doesn't get debugged, it gets replaced - the faster path when debugging is possible through talosctl but the investment lives in the config, not the machine.

## hetzner, and the middle ground

Hetzner occupies a space that makes the economics of Talos particularly interesting. A dedicated server with 64GB of RAM, an 8-core Xeon and dual NVMe drives costs less per month than a comparable cloud instance costs per day, and Talos strips the operational burden of managing that hardware down to something a small team can handle.

The installation on a Hetzner dedicated server has its own texture. You boot into Hetzner's rescue system - ironically, one of the last times you'll use SSH in this workflow - wipe any existing RAID configuration, write the Talos image directly to the NVMe, and reboot. The machine comes up in maintenance mode and you apply config from your workstation, same as anywhere else. Hetzner's networking is the main wrinkle: dedicated servers use point-to-point /32 addressing with a gateway that's also a /32, which means explicit static routes in the machine config. Private networking between servers goes through vSwitch VLANs rather than a managed subnet. These are solvable details, but they catch you if you assume standard subnet-based networking.

Hetzner Cloud is a different experience, closer to any other cloud provider but with its own quirks - a 32KB user-data limit that silently truncates your machine config if you leave the default examples and docs in, and a networking model that requires the right variant of the cloud controller manager manifest to enable pod-to-pod communication across nodes. The cloud side works well enough, but the dedicated servers are where the value proposition sharpens, because the whole point of Talos is making powerful hardware manageable without a large ops team, and Hetzner's dedicated pricing makes that hardware accessible.

## what carries across

The thing that emerges from running Talos across all three environments is that the abstraction holds. The machine config is the same YAML whether the underlying hardware is a Proxmox VM, a rack-mounted server, or a Hetzner dedicated box. The operational surface is the same talosctl commands. Upgrades work the same way everywhere - an A/B boot scheme that writes the new image to the inactive slot, reboots, and automatically rolls back if the new version fails to come up.

What changes between environments is the infrastructure around the cluster, the boot mechanism and the networking model and the storage topology, and Talos deliberately doesn't try to abstract those away. It gives you a machine config with the right knobs for each environment and lets you describe what the machine should look like. The rest is convergence.

The real power of Talos, and of abstractions like it, is that they move complexity out of the technicalities and into the conceptualities. How you provision a node, how you patch a kernel, how you rotate a certificate - these stop being questions you spend your days answering. What remains is what the infrastructure should do, what shape the system should take, what problems are actually worth solving. The mechanical dissolves, and what opens up is room to think - about architecture, about design, about the work that only humans can do. After enough time with it, the absence of SSH feels less like a constraint and more like an invitation.
