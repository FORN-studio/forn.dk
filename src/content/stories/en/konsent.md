---
title: konsent
description: On the first thing I ever built - a consensus-based decision-making platform inspired by anarcho-syndicalist organizational models, hardcoded secrets and all.
category: Architecture
slug: konsent
date: 2026-03-21
icon: architecture
---

*Fair warning: the codebase behind this story is nine years old. Hardcoded secrets, jQuery, Bootstrap 3 - the works. Here be dragons.*

The first thing I built was a consensus-based decision-making platform inspired by anarcho-syndicalist organizational models - a Flask application with a sincere belief that software could operationalize the principles underneath the Spanish Civil War's worker councils.

The idea was that communities shouldn't need representatives. Representative democracy, in the anarchist reading, is an act of surrendering your agency to someone who will inevitably develop interests separate from yours - and the answer isn't better representatives but the elimination of the representative function entirely. What you need instead is a process: a way for groups to raise issues, deliberate, converge on solutions, and protect individuals from the tyranny of the majority. Konsent was my attempt to encode that process in a web application, which in retrospect is a wildly ambitious thing to attempt as a first project, but the ambition was the point.

## the model

The four phases mapped onto a decision-making structure that anarchist organizations have used for over a century, adapted for asynchronous digital participation.

Phase one was prioritization. An issue entered the system and needed half the group's votes to proceed - a rough filter for relevance that prevented the system from drowning in proposals nobody cared about. Phase two was discussion: solutions were proposed as comments, external reading material could be attached, and after a configurable resting period the most-voted solution advanced. Phase three was the veto window - a period where any member could place a public veto, their name attached and visible to all, if the outcome would cause genuine harm. Phase four was completion: the solution stood as a record of what the community decided.

The system had no roles, no moderators, no admin panel. Everyone in a union saw the same issues and had the same power, because the whole premise was that hierarchy is the problem, and a tool that reintroduces hierarchy while claiming to solve it has missed its own point.

## the code

The code was exactly what you'd expect from someone more interested in political theory than software engineering. Hardcoded CSRF secrets. N+1 database queries in nested loops. An APScheduler job polling every thirty seconds to check whether any posts had expired, because I didn't know about database triggers or event-driven architectures. Flask blueprints that I discovered halfway through and retrofitted with visible seam marks. A CSS footer positioned with `position: fixed; width: 7vw; left: 47%`, which worked on exactly one screen size.

The static assets folder contained PDFs of the Anarchist Manifesto and Kropotkin's Conquest of Bread, which tells you everything about where my priorities were at the time.

But underneath the naive implementation, some of the thinking was sound. The veto mechanism captured something real about consensus processes - that majority rule without individual recourse is just democracy with fewer steps, and that the power to say "this will cause harm" is the minimum guarantee a non-hierarchical system needs to offer. The public nature of the veto, attached to a name, created accountability without authority. The phased progression forced deliberation by design - you couldn't jump from problem to solution without passing through discussion.

## nine years later

The core principle - that groups can organize without hierarchy if the process is right - still feels sound to me. What Konsent proved, barely, was that the principle could take shape in software at all. Everything beyond that core remained unrealized: the thresholds were arbitrary, the timing was rigid, the veto mechanism needed far more nuance than a binary switch. Bringing this to something that actually works requires significant thought about how consensus scales, how different groups operate at different tempos, and how to balance individual protection against collective paralysis. That thinking is still ongoing.

The code is, naturally, very of its time. But software encodes philosophy whether you intend it to or not, and the hardest problems to solve are the ones in the model rather than the code. Konsent was the first thing I built, and the questions it was trying to answer still inform everything that came after.
