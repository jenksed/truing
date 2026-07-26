# Truing product definition

## Repository-native interface intent, verification, and evidence

**Status:** pre-alpha discovery  
**Working version:** v0.1  
**Date:** July 26, 2026

## Definition

Truing is a repository-native system for making interface work explicit, testable, reviewable, and defensible from planning through delivery.

A team declares what must remain true about an interface. Truing prepares named states, observes the running product, evaluates deterministic and heuristic assertions, captures evidence, identifies changes and failures, requires explicit reconciliation, records human judgment where automation is insufficient, and produces a design receipt.

The core chain is:

```text
intent → scenarios → observations → assertions → evidence → findings → reconciliation → receipt
```

## Problem

Existing tools answer useful but incomplete questions:

- Did the pixels change?
- Did the component render?
- Did the interaction execute?
- Did an automated accessibility rule fail?
- Does the implementation resemble a design reference?

They do not fully answer:

> Did the implemented interface preserve the intended information hierarchy, responsive behavior, semantic structure, content resilience, interaction priorities, accessibility expectations, design-system rules, and human judgment boundaries across the states that matter?

Interface intent is usually scattered across design files, tickets, comments, screenshots, developer assumptions, and reviewer memory. Responsive transformation is especially underspecified. Desktop and phone frames rarely explain which information must remain visible, which actions stay primary, how tables transform, what reading order is required, or what happens between showcase widths.

Agentic coding increases the pressure. It accelerates frontend implementation while making it easier to introduce a second design language, omit edge states, overfit screenshots, change hierarchy accidentally, or claim completion without defensible evidence.

## Product thesis

The missing artifact is an interface contract: a versioned statement of the states, relationships, transformations, evidence requirements, and review obligations that matter.

Truing should connect mature tools rather than replace them. Playwright, Storybook, axe-core, design tokens, visual regression systems, and design metadata providers can all produce evidence. Truing supplies the shared contract, assertion model, evidence graph, authority boundaries, reconciliation workflow, and receipt.

## Product boundaries

Truing is not:

- a CSS layout engine;
- a Figma replacement;
- a component library;
- a universal design score;
- a generic AI design critic;
- another screenshot-diff service;
- a guarantee that an interface is beautiful;
- a replacement for product or design judgment.

## Primary users

- frontend and product engineers;
- product designers and design engineers;
- technical product managers and delivery leads;
- QA and accessibility engineers;
- agent-assisted engineering teams;
- design-system maintainers and open-source maintainers.

The strongest initial adopter is likely a small or medium technical team shipping a complex web product through GitHub, using Playwright or Storybook, increasingly using coding agents, and lacking a reliable design-operations layer.

## Core objects

### Target

The route, page, component, dialog, embedded panel, or workflow checkpoint being verified.

### Scenario

A named and reproducible interface state produced by data, permissions, content, runtime conditions, viewport, interaction, locale, theme, or user preferences.

### Contract

The declared interface intent for one or more targets and scenarios.

### Observation

A fact captured from the running interface, such as DOM structure, geometry, accessible names, focus sequence, visible text, computed styles, screenshots, traces, console output, or token usage.

### Assertion

A claim evaluated against observations, such as required content being visible, regions preserving reading order, no horizontal overflow, a table transforming into labeled records, or a dialog returning focus.

### Finding

The result of evaluating an assertion or analyzer, including status, severity, confidence, rationale, evidence, provenance, and review requirements.

### Evidence

An addressable artifact supporting a finding or decision.

### Reconciliation

The explicit resolution of a failure or change: fixed, accepted change, approved exception, false positive, contract correction, deferred debt, blocked, or product decision required.

### Design receipt

The evidence-backed completion record describing what was tested, what passed, what failed, what changed, what was reviewed, what remains unresolved, and whether delivery is allowed.

## Assertion authority

Truing must distinguish:

1. **Deterministic assertions** directly evaluated from stable observations.
2. **Derived deterministic assertions** calculated from multiple observations.
3. **Heuristic assertions** that may produce false positives.
4. **Reference-relative assertions** that prove difference, not necessarily defect.
5. **Model-assisted assertions** that produce non-authoritative critique or triage.
6. **Human assertions** recorded by an authorized reviewer.

A lower-authority result must never silently satisfy a higher-authority requirement. Model critique does not grant human approval. Visual similarity does not prove semantic correctness. Baseline conformity does not prove product quality.

## Product principles

1. Intent before pixels.
2. Explicit passes over magical scoring.
3. Deterministic claims before model judgment.
4. Repository-native and local-first by default.
5. Evidence is addressable and reproducible.
6. Human review is explicit.
7. No universal design score.
8. Exceptions are governed, owned, and time-bounded.
9. Existing tooling is an asset.
10. Complexity follows demonstrated need.

## Verification passes

The long-term workflow separates concerns into explicit passes:

1. repository orientation;
2. contract compilation;
3. deterministic environment preparation;
4. scenario execution;
5. semantic observation;
6. geometry observation;
7. responsive assertions;
8. content resilience;
9. interaction verification;
10. automated accessibility analysis;
11. visual capture and comparison;
12. design-system analysis;
13. optional model-assisted critique;
14. scoped human review;
15. reconciliation;
16. receipt generation.

## Responsive intent

Responsive behavior should be expressed as transformation, not merely screenshots.

Useful transformation terms include:

- preserve;
- reorder;
- stack;
- wrap;
- collapse;
- disclose;
- replace;
- summarize;
- scroll;
- pin;
- table-to-records;
- grid-to-list;
- promote;
- demote.

A transformation can change presentation while preserving content, labels, relationships, reading order, action priority, status visibility, and task completion paths.

## Human review

Automation cannot determine every important quality. Human review remains necessary for information hierarchy, operational density, brand character, trust, clarity, and purposeful exception handling.

A review must record its exact scope:

- revision;
- target;
- scenario;
- viewport;
- rubric;
- evidence set;
- reviewer;
- decision.

Desktop approval does not imply phone approval. A review may be invalidated when affected contracts, targets, tokens, scenarios, or evidence-generation rules change.

## MVP

The first vertical slice should verify one dense web route with three scenarios and three viewports.

Required capabilities:

- YAML interface contract;
- semantic region targeting;
- schema validation and fingerprinting;
- Playwright scenario execution;
- required-region, reading-order, visibility, overflow, clipping, overlap, and target-size assertions;
- axe-core adapter;
- screenshots and traces;
- Markdown and JSON receipts;
- static evidence report;
- manual review record;
- reconciliation record;
- CI exit policy.

The first seeded defect should hide a critical failure reason inside a collapsed mobile disclosure. The page may remain technically valid and visually plausible, but it violates the product requirement that critical diagnostic truth remain visible without optional interaction.

## Open-source posture

The local core should be genuinely useful and open source:

- contract schema;
- compiler;
- CLI;
- Playwright runner;
- core assertions;
- local evidence;
- receipts;
- static review report;
- plugin SDK.

Potential hosted value may later include durable evidence, multi-user review, history, organization policy, managed browser matrices, and private model-assisted triage.

## Relationship to Voilà

Truing should remain independently useful.

Truing owns interface contracts, UI scenarios, observations, design findings, review evidence, reconciliation, and design receipts. Voilà may orchestrate the broader engineering workflow, invoke targeted Truing runs, enforce authority boundaries, and incorporate Truing receipts into larger delivery receipts.

## Immediate recommendation

Build the contract spine before the platform.

The first proof should be small, local, explainable, and difficult to dismiss: one interface contract, one real route, one deliberately seeded product-intent failure, reproducible evidence, explicit human review, and a receipt that ordinary screenshot comparison could not produce by itself.
