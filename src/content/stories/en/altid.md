---
title: AltID is a disaster for the right to privacy
description: The new digital ID card from the Danish Agency for Digital Government is marketed as transparent, but in reality citizens are asked to hand over sensitive data blindly.
category: Privacy
slug: altid
date: 2026-06-12
icon: infrastructure
---

In early June, the Danish Agency for Digital Government (Digitaliseringsstyrelsen) launched its new platform, AltID, meant to serve as a digital ID card and a voluntary addition to MitID. The idea is that with the app, you can simply show that you're over 18 without being forced to share your name or any other personal information.

But central parts of the published code behind the app are missing, and that leaves citizens with no real way of verifying whether their right to privacy is protected.

AltID is built on the principle that the sensitive information is not gathered in a central register but lives locally on the citizen's own phone. This moves the entire question of trust to a single place: the app itself. That is exactly why it is so important that we, collectively, are given the opportunity to inspect and verify the app's behavior - that is, what data it collects and what it does with it.

We have to trust that the app can protect this valuable data against hackers, criminals and other prying parties. We also have to trust that neither the authority nor its private suppliers, now or at any later point, let the app collect or pass on more than it should, or hand the collected data to more parties than it should.

That kind of trust should not be something we are asked to issue blindly. The Danish authorities' own track record offers fine examples of why: in 2012, the driving licence register and police registers, among others, were copied in the so-called CSC hack, the largest hacking case in Danish history. In 2015, Statens Serum Institut mistakenly sent unencrypted CDs containing health data and CPR numbers of 5.3 million Danes, which ended up at the Chinese visa office in Copenhagen. And the Danish Data Protection Agency continually handles cases of police and municipal employees looking up citizens in various registers without authorization. Trust in the authorities' handling of our data cannot be taken for granted - it has to be verifiable.

In connection with the launch of AltID, the Agency for Digital Government has chosen to publish the majority of the source code, that is, the 'recipe' behind the app. A refreshing and exciting initiative, and certainly a welcome gesture toward the citizens who worry about their privacy.

Because with the recipe behind the new app freely available, all of us can verify that AltID is in fact not the privacy threat it could otherwise quickly resemble. We should even be able to determine with certainty that the critical data never leaves the phone.

Unfortunately, a closer examination of the published source code reveals the opposite.

## the source code is missing the parts that could cost users their privacy

The Agency for Digital Government itself writes about the solution: "Source code for both the app and the underlying systems is publicly available."

But that is a truth with significant modifications. In several places, the source code contains what are known as stubs, which in plain language translates to empty placeholders where the code should have been. The agency itself states that the parts have been omitted for reasons of security and/or licensing terms.

The two primary missing elements also happen to be the two most likely to break the user's privacy.

One missing component monitors the app's security while it runs on the phone. It works invisibly, with access to everything the app itself can see, and collects information about the phone. But since the code is secret, no outsider can check what it collects or where it is sent. The other component is responsible for reading the chip embedded in our passports.

## publishing the code is a PR stunt

Normally, you would in principle be able to build the app from the published recipe and compare the result with the app in the App Store and Google Play, thereby proving that the recipe is in fact the one the app was baked from. Not here. The missing parts mean the code cannot even be assembled into a finished app, and there is no way to compare it with the one that has been released.

The source code the Agency for Digital Government has published could therefore just as well be entirely fabricated as genuinely representative of its new app. What is certain, at least, is that the full codebase the real AltID app is built from is not public.

Still, the agency chooses to lean on the source code to support its own claim that AltID can be trusted.

At the heart of the description of the source code, you can read the following: "This openness is meant to support trust through transparency by allowing interested parties to inspect the source code themselves, contribute qualified feedback, and verify that the solution lives up to the stated principles of privacy by design."

But that does not match reality. From the published source code, it is not technically possible to verify that AltID actually operates according to the privacy guarantees being highlighted. Citizens are thus asked to trust the Agency for Digital Government and its suppliers, with no way of independently checking whether that trust is warranted.

The publication of the source code thus amounts to a PR stunt by the Agency for Digital Government rather than a real guarantee of transparency and security.

If the agency is serious about its openness, the call from here is simple: publish the missing parts. If the app's security depends on the missing parts staying hidden - so-called security by obscurity - the app cannot be considered secure; and if components are hidden for licensing reasons, the decision to delegate critical infrastructure to private third parties should be reconsidered in the strongest terms. Until that happens, the promise of transparency will never live up to reality.
