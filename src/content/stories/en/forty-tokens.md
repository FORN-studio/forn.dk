---
title: forty tokens
description: On building a character-level transformer that cleans addresses - a two-million-parameter argument for specialization over scale.
category: Machine Learning
slug: forty-tokens
date: 2026-03-08
icon: ml
---

Addresses are one of those problems that seem trivial until you look at real data. A human reading "Nørrebrogde 42 2 th, 2200 Kbh N" will arrive at the right place. A database lookup will not, because the street is misspelled, the city is abbreviated, and the floor designation follows a convention the system wasn't told about. Multiply this by a few million rows of OCR output, manual entry, and legacy migrations, and you have a dataset where the information is present but the form is unreliable.

The obvious modern response is to throw a large language model at it. And it would probably work, in the same way that chartering a helicopter works for crossing a river - technically effective, comically disproportionate, and expensive to keep running. The interesting question is what happens when you build the smallest thing that could actually solve the problem.

## a vocabulary

The model I built reads addresses one character at a time. Its entire vocabulary is forty tokens - the lowercase Latin alphabet, the Danish letters æ, ø, and å, digits, a handful of punctuation marks, a padding token, and a token for anything it hasn't seen before. There is no word-level tokenization, no subword segmentation, no BPE. Just characters.

This turns out to be a strength in precisely the domain where it sounds like a limitation. Address corruption happens at the character level - a transposed letter, a missing digit, an OCR artifact that turned ø into o. A model that sees characters individually can learn to recognize "Nørrebrogade" and "Nørebrogde" as the same street in the same way that you can read a word with jumbled middle letters, because the structural pattern is intact even when individual characters are wrong.

The architecture is a small transformer - four layers, four attention heads, 128 dimensions, roughly two million parameters. Rotary position embeddings handle sequence order without learned positional vectors, and attention-based pooling compresses a variable-length sequence of character embeddings into a single 128-dimensional vector. The entire model fits comfortably on a CPU.

## patterns, not noise

The training philosophy came from a question that initially seemed like a dead end: how do you generate training data for errors you haven't seen? You can't enumerate every possible misspelling of every Danish address. You can't anticipate what an OCR engine from 2003 will do to a handwritten postal code. Trying to model the noise directly is an infinite game.

The inversion that made it work was to stop thinking about noise entirely and think about invariance instead. If you take a correct address and apply random chaos to it - insert characters, delete characters, substitute characters, shuffle word order, occasionally drop the postal code or city - and then train the model to produce the same embedding for both the clean and corrupted versions, what the model learns is what remains stable under perturbation. It learns the patterns that survive noise, which is a fundamentally different thing from learning what the noise looks like.

The contrastive loss function formalizes this: an anchor address and its augmented version should land close together in embedding space, while all other addresses in the batch should be pushed apart. The model doesn't need to know what OCR artifacts look like. It needs to know that "Vesterbrogade 24, 1620 København V" and "Vestrbrogde 24 1620 kbhvn" share a deeper identity that survives the surface damage.

## three stages

Embedding alone doesn't solve the problem, because neural models are excellent at capturing semantic similarity and mediocre at distinguishing near-identical strings. "Nørrebrogade 42" and "Nørrebrogade 44" will land almost on top of each other in embedding space, and the difference between them is everything.

The inference pipeline addresses this by separating what the model is good at from what it isn't. First, the query address is embedded. Then a vector search against the full baseline of known addresses retrieves the nearest 250 candidates - this is the step where the model's understanding of address structure does the heavy lifting, surviving misspellings and missing components that would defeat any exact-match system. Finally, fuzzy string matching re-ranks those 250 candidates by edit distance, and the candidate that is both semantically close and textually closest wins.

The neural stage handles the hard part - recognizing that a badly mangled address refers to a real place - and the fuzzy stage handles the precise part, distinguishing between house numbers and floors that the embeddings can't separate. Each stage does what it's good at, and the combination is more accurate than either approach alone.

## the argument for smallness

There is a broader point buried in a model this size, which is that specialization and scale are not the same axis. A two-million-parameter model trained on a specific task with the right inductive biases will outperform a model a thousand times its size that treats the same task as a general text problem, because the small model's entire capacity is devoted to understanding the structure of Danish addresses and nothing else. It has no knowledge of poetry, no ability to summarize articles, no opinion on the capital of France. It reads addresses, and it reads them well.

This matters beyond the specific application. The default trajectory in machine learning right now is toward larger models with broader capabilities, and the results are genuinely impressive. But there is a parallel path that gets less attention, where the question is how small and focused a model can be while still solving a real problem in production, on a CPU, at a cost that rounds to zero. The answer, it turns out, is remarkably small - forty tokens and two million parameters small - if you're willing to think carefully about what the model actually needs to know.
