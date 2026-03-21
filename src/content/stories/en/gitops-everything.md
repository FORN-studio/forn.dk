---
title: gitops everything
description: Declarative infrastructure and application delivery through Git as the single source of truth - reconciliation over imperative commands.
category: DevOps
slug: gitops-everything
date: 2025-11-20
icon: devops
---

The first thing that goes wrong in any infrastructure setup is drift. Someone applies a manual change to fix a production issue. The change works but is never committed anywhere. A month later, someone else re-provisions the environment from the "source of truth" and the fix disappears. The incident repeats.

GitOps eliminates this class of problem by making Git the only way to change anything.

## The core principle

GitOps is a single idea applied consistently: the desired state of your system is declared in a Git repository, and an automated process continuously reconciles the actual state to match. No imperative commands, no ad-hoc scripts, no SSH sessions to production.

This is not new in concept - configuration management tools like Puppet and Chef promised the same thing. What is new is the execution model. Instead of pushing changes from a CI pipeline, a controller running inside the cluster pulls the desired state and converges toward it. The distinction matters for security (no external system needs credentials to your cluster), reliability (the controller retries until the state matches), and auditability (every change is a Git commit).

## Flux and ArgoCD

The two dominant GitOps controllers are Flux and ArgoCD. They solve the same fundamental problem with different trade-offs.

**Flux** is a set of composable controllers. Source controllers watch Git repositories, Helm repositories, or OCI registries. Kustomize and Helm controllers reconcile manifests. Notification controllers report status. You compose the pieces you need. The philosophy is Unix-like: small, focused tools that chain together.

**ArgoCD** is an application-centric platform with a web UI, RBAC, and project abstractions built in. It is more opinionated and provides a richer out-of-box experience, particularly for teams that want visibility into deployment state without querying the cluster directly.

For bare-metal setups where operational simplicity matters, Flux tends to be the better fit. Its footprint is smaller, its CRDs are straightforward, and it integrates cleanly with Kustomize-based repository structures. But either works - the choice is less important than the commitment to the model.

## Repository structure

How you organize your GitOps repository determines how maintainable the system is at scale. The structure I have settled on separates concerns into three layers:

```
├── infrastructure/    # cluster-level resources
│   ├── controllers/   # ingress, cert-manager, monitoring
│   ├── configs/       # cluster policies, resource quotas
│   └── crds/          # custom resource definitions
├── apps/              # application workloads
│   ├── production/
│   └── staging/
└── clusters/          # per-cluster configuration
    ├── production/
    └── staging/
```

The `clusters/` directory is the entry point. Each cluster's Kustomization points to the infrastructure and app layers it needs. Environment-specific overrides (replica counts, resource limits, feature flags) live in the cluster directory. Shared definitions live in infrastructure and apps.

This structure means adding a new cluster is a matter of creating a new directory with the appropriate Kustomization overlays. No changes to application manifests, no conditional logic, no templating hacks.

## Secrets management

The obvious challenge with Git as the source of truth: you cannot commit secrets. Several approaches exist, and none are perfect.

**Sealed Secrets** encrypt secrets with a cluster-specific key. The encrypted form is safe to commit. The controller in the cluster decrypts them. Simple, but key rotation requires re-encrypting all secrets, and you lose the ability to read secret values from the repository.

**SOPS with age or GPG** encrypts secret values in-place within YAML files. The structure of the manifest is visible; only the values are encrypted. Flux has native SOPS support. This is my preferred approach because it keeps secrets alongside the resources that use them while maintaining readability.

**External secret stores** (Vault, AWS Secrets Manager) keep secrets outside Git entirely. An operator syncs them into Kubernetes secrets. More infrastructure to manage, but provides centralized secret lifecycle management, rotation, and access auditing.

## Progressive delivery

GitOps does not prescribe how you deploy - only that the desired state is in Git. The deployment strategy is defined in the manifests themselves.

Canary deployments with Flagger: push a new image tag to Git, Flagger automatically shifts traffic incrementally, monitors metrics, and either promotes or rolls back. The entire process is automated and auditable. If the canary fails, the Git repository still reflects the desired state, and the rollback is just the controller reverting to it.

Blue-green deployments: maintain two complete environments, switch traffic atomically. More resource-intensive but eliminates the risk window of incremental rollouts.

The point is that the deployment strategy is code, committed alongside the application manifests, reviewed in pull requests, and versioned with everything else.

## The operational shift

GitOps changes how you operate. Instead of `kubectl apply` or `helm upgrade`, you open a pull request. Instead of debugging what someone changed manually, you read the Git log. Instead of runbooks that say "SSH to the bastion and run this script", you have a repository that describes exactly what should be running.

The learning curve is real. Engineers accustomed to imperative workflows find it frustrating to make a change by committing YAML and waiting for reconciliation. But the payoff is an infrastructure that is reproducible, auditable, and recoverable. If a cluster dies, you point a new one at the same Git repository and wait. Everything converges.
