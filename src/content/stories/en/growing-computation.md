---
title: growing computation
description: On emergence, exotic computing substrates, and a grid of identical cells that learned to balance a pole through self-organization.
category: Machine Learning
slug: growing-computation
date: 2026-01-25
icon: ml
---

Emergence is one of those concepts that resists clean definition precisely because the phenomenon itself resists reduction. A flock of starlings produces murmurations - vast, fluid shapes that ripple and fold across the sky - and no individual bird is steering. A termite colony builds cathedral-like mounds with ventilation systems that regulate temperature to within a degree, and no termite has a blueprint. Neurons, individually, do almost nothing interesting: they accumulate charge, they fire, they reset. Billions of them together produce consciousness, or at least something we can't distinguish from it.

What makes emergence magnetic as a concept is that it violates the intuition that complex behavior requires complex design. The opposite keeps turning out to be true - that sufficiently many simple agents, following simple rules, interacting locally, produce global behavior that no one authored. The complexity lives in the interaction, not in the components, and this has implications that ripple outward from biology into computation, because it suggests there are forms of computing that don't look anything like the architectures we've learned to build.

## exotic substrates

Conventional computing is designed from the top down. You specify layers, connections, activation functions, data flow. Information moves through pathways that an engineer drew, literally or figuratively, before training began. This works extraordinarily well, and it is also, in a deep sense, brittle - the architecture is the bottleneck, and if the problem doesn't fit the shape you designed, you redesign the shape or accept the loss.

Nature computes differently. A slime mold will find the shortest path through a maze without a nervous system, by growing toward food and retracting from waste, and the solution emerges from the physical dynamics of its growth. Reaction-diffusion systems produce leopard spots, zebra stripes, and the branching patterns of lungs through local chemical interactions that have no concept of the global pattern they're creating. These are computations in the broadest sense - inputs producing outputs through a process - but the process isn't designed. It's grown.

The question that led to this experiment was whether you could grow computation on a digital grid. Not simulate a biological system, but borrow the principle: start with a homogeneous substrate of identical cells, give each cell a learnable update rule, and see if training can produce emergent computation that solves a real task.

## the grid

Neural cellular automata are the tool for asking this question. The concept was explored beautifully in [Growing Neural Cellular Automata](https://distill.pub/2020/growing-ca/) and extended toward universal function approximation in [A Path to Universal Neural Cellular Automata](https://arxiv.org/pdf/2505.13058). Each cell in the grid runs a small neural network that looks at its immediate 3x3 neighborhood and decides how to update its own state. The rules are identical for every cell and learned through gradient descent, which means you can point the system at a target behavior and let optimization figure out what local interactions produce it.

The grid I built treats this as a computation substrate - information enters at input nodes arranged in a circle around the perimeter, and exits at output nodes clustered near the center. Between them, every cell passes information to its neighbors through hidden channels that the training process gives meaning to. There is no wiring, no explicit routing between input and output. The cells have to learn to relay information across the grid through purely local interactions, and if this sounds like it shouldn't work, that's because the intuition from conventional networks - where information flows through designed pathways - doesn't apply here. The pathways emerge.

The fire rate mechanism adds a further constraint: at each step, roughly half the cells don't update at all. This stochastic dropout forces the grid to develop robust communication patterns that survive partial silence, preventing it from settling into brittle fixed-point solutions that only work when every cell fires in perfect synchrony. It's a form of regularization that doubles as an analogy to biological systems, where not every neuron fires on every timestep.

## balancing a pole

The proof of concept was CartPole - the standard reinforcement learning benchmark where an agent balances a pole on a cart by applying left or right forces. Four observations go in (cart position, cart velocity, pole angle, pole angular velocity) and one decision comes out (push left or push right). The approach draws heavily from the work in [Towards Self-Organized Control](https://arxiv.org/abs/2106.15240), which demonstrated that NCAs could function as control policies for RL tasks.

Training this with a Double DQN felt like teaching an organism rather than tuning a model. The grid needed to be pretrained on a simpler task first - computing the mean of its inputs - just to establish that information could flow from the edges to the center at all. Without this curriculum step, the RL signal was too sparse for the grid to discover communication from scratch, like trying to teach language to a system that hasn't learned to hear yet.

Once the pathways existed, the reinforcement learning could refine them. The grid learned to balance the pole, and watching the cell states during a rollout was genuinely mesmerizing - waves of activation propagating inward from the input nodes, hidden channels developing spatial patterns that correlated with the pole's angle, output cells flickering between states as the decision boundary was crossed. The computation was happening, visibly, across the grid, and none of it was designed. It grew.

## what emerges

The practical utility of this is, honestly, limited. A standard feedforward network solves CartPole in a fraction of the time with a fraction of the parameters, and doesn't require a pretraining curriculum or overflow penalties to keep the grid from diverging. There is no good reason to use a cellular automaton for control tasks that conventional architectures handle trivially.

But the reason to build it was never efficiency, it was the question underneath: what happens when computation isn't designed but emergent? The cells in this grid all run the same function. There is no distinction between layer one and layer four, no skip connections, no attention mechanisms. The structure arises from training, and it arises differently depending on the task, the grid size, and the fire rate. The same substrate, shaped by different pressures, produces different computational topologies - which is close to how biological nervous systems work, undifferentiated cells specializing through exposure to signals.

Watching it happen in miniature, in a JAX kernel, on a problem as simple as balancing a stick, carries a particular kind of vertigo. The grid doesn't know what a pole is. It doesn't know it's solving a problem. It just learned to respond to patterns at its edges by producing patterns at its center, and those patterns happen to keep a simulated pole upright.

The implications are more interesting than the implementation, which is probably the hallmark of a good experiment.
