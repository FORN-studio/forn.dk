---
title: data as architecture
description: Why data models are the true architecture of any system - schema decisions outlast every other technical choice you make.
category: Systems Design
slug: data-as-architecture
date: 2025-10-05
icon: systems
---

Ask an engineer to describe their system's architecture and they will draw boxes with arrows. Services, queues, caches, load balancers - the topology of computation. Ask them about their data model and the answer is usually vaguer. A handful of tables, some JSON documents, maybe an event stream. The data model is treated as an implementation detail of the services that use it.

This is backwards. The data model is the architecture. Everything else is plumbing.

## Schema decisions are permanent

You can rewrite a service in a weekend. You can swap a message broker in a sprint. You can migrate from monolith to microservices over a quarter. But changing a data model that has been in production for two years, with millions of rows and dozens of consumers? That is a multi-month project with a real chance of breaking things.

Schema decisions compound. A column you add today becomes a filter in someone's query tomorrow, a dimension in an analytics dashboard next month, and a contractual obligation in an API by next year. Removing it requires coordinating across all these consumers - many of whom you do not know about.

This asymmetry means data modeling deserves more architectural attention than any other decision. The service topology will change. The data model will persist.

## Relational vs. document vs. event

The choice of data paradigm is not about technology preferences. It is about the structure of your domain.

**Relational models** excel when the relationships between entities are as important as the entities themselves. Orders reference customers who reference addresses. The integrity constraints - foreign keys, unique constraints, check constraints - encode business rules that would otherwise live as bugs waiting to happen in application code.

**Document models** work when your data is naturally hierarchical and self-contained. A product listing with its variants, images, and descriptions is a single document. You read it as a unit, update it as a unit, and rarely need to join it with unrelated data. The trap is modeling relational data as documents - embedding references that should be joins, duplicating data across documents, and losing consistency guarantees.

**Event sourcing** captures state as a sequence of immutable events rather than a mutable current state. The appeal is total auditability and the ability to derive any view of the data by replaying events. The cost is complexity: event schemas must be versioned, projections must be maintained, and the eventual consistency model requires careful handling.

Most systems need more than one paradigm. Transactional data in PostgreSQL, search indexes in Elasticsearch, event streams in Kafka, caches in Redis. The architecture is in how these are kept consistent, not in the choice of any individual store.

## Designing for evolution

The only certainty about your data model is that it will change. Requirements evolve, domains deepen, edge cases emerge. Designing for evolution means making change cheap and safe:

**Additive changes only** - adding a column, a table, or a field is safe. Removing or renaming is dangerous. Design your migrations to be additive. When you need to restructure, add the new shape alongside the old, migrate consumers, then remove the old shape. Never in a single step.

**Explicit versioning** - if your data is consumed by external systems (APIs, exports, integrations), version the schema explicitly. Version 2 of the API can reshape the data freely; version 1 consumers continue working until they are migrated. This is more work than "just change the column" but prevents the coordination nightmare of synchronized changes across teams.

**Separate read and write models** - CQRS (Command Query Responsibility Segregation) is often presented as an architectural pattern, but its real value is at the data layer. The write model is optimized for consistency and integrity. Read models are optimized for the specific queries your application needs. They can be denormalized, materialized, cached - whatever serves the read path best - without compromising the write model.

## The gravity of data

Data has gravity. Once it exists, systems form around it. Dashboards query it. Reports depend on it. Integrations export it. Machine learning models train on it. Each consumer adds weight, making the data harder to move or reshape.

This gravity is not inherently bad - it is a sign that the data is valuable. But it means that early data modeling decisions have outsized impact. A poorly normalized schema creates performance problems that compound as data grows. A missing audit trail cannot be retroactively constructed. A conflated entity (using a single table for two distinct concepts) creates subtle bugs that surface years later.

The discipline is to treat data modeling as the most consequential design activity in any system. Not the most glamorous, not the most technically challenging, but the most consequential. Get the data right and the services are straightforward. Get it wrong and no amount of clever service design will compensate.
