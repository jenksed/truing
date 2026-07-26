# Truing

[![CI](https://github.com/jenksed/truing/actions/workflows/ci.yml/badge.svg)](https://github.com/jenksed/truing/actions/workflows/ci.yml)

**Repository-native interface contracts and evidence for proving that implemented UI preserves the product and design intent that matters.**

Truing is an early-stage open-source project for a missing part of frontend delivery.

Design files, screenshots, browser tests, accessibility scans, and review comments all describe pieces of an interface. They rarely preserve the complete agreement behind it:

- which information must remain visible;
- which user capabilities must survive responsive transformation;
- which states and hostile content must work;
- which findings block delivery;
- which exceptions were consciously accepted;
- which conclusions came from deterministic evidence, heuristics, models, or human judgment.

Truing turns that agreement into a versioned interface contract, verifies it against the running product, preserves the evidence, and produces a concise design receipt.

```text
repository + requirements + prior audits
                  ↓
       generated contract proposal
                  ↓ human authorization
        approved interface contract
                  ↓
     scenarios → observations → assertions
                  ↓
       findings → reconciliation → receipt
```

The goal is not more YAML, more screenshots, or another design score.

The goal is to make this question answerable:

> Why do we believe this interface is ready to ship?

## A concrete example

A responsive audit finds that a header overflows at 320 pixels. Hiding several controls removes the overflow.

A browser test can prove that the page no longer scrolls horizontally. It cannot decide whether the fix also removed important functionality.

A Truing contract can state that these capabilities must remain available at every supported width:

- run the failure demo;
- open the project on GitHub;
- choose a theme.

The desktop controls may disappear below a breakpoint while equivalent controls move into the mobile menu. The implementation is allowed to change. The user capability is not.

That distinction—between checking what rendered and verifying what must remain true—is the center of Truing.

The first real validation case comes from a completed Playwright audit of the Switchyard public site. It is documented in [`docs/VALIDATION_SWITCHYARD.md`](docs/VALIDATION_SWITCHYARD.md), and the derived contract is in [`examples/switchyard-home/`](examples/switchyard-home/).

## How Truing is intended to work

### 1. Discover

An LLM examines the repository, routes, components, tests, design documentation, screenshots, prior audits, and existing conventions.

It identifies likely:

- interface targets;
- important states;
- responsive breakpoints and transformations;
- information priorities;
- accessibility requirements;
- content stress cases;
- known exceptions;
- unresolved product questions.

### 2. Propose

The LLM generates a contract proposal with provenance, assumptions, and questions that need human judgment.

Humans should normally review product decisions and contract diffs—not hand-author every YAML field.

### 3. Authorize

A person approves the intended behavior.

The committed contract becomes the deterministic source of truth for future humans, CI runs, and coding agents. A model may propose changes, but it cannot approve its own proposal or weaken an assertion merely to make verification pass.

### 4. Verify

Truing uses mature tools as adapters:

- Playwright for browser execution and interaction;
- DOM and geometry observations for deterministic layout facts;
- axe-core for automated accessibility findings;
- screenshot tools for visual evidence and change detection;
- design-system and token analyzers where available.

The approved contract determines what those observations mean.

### 5. Reconcile

A failure or change must be resolved explicitly:

- fixed;
- accepted change;
- approved exception;
- false positive;
- contract correction;
- deferred debt;
- blocked pending a product decision.

Exceptions do not erase measurements. Missing analyzers and unsupported browser coverage do not become passes.

### 6. Produce a receipt

The result is a compact delivery record backed by addressable evidence:

- what was tested;
- what passed or failed;
- what changed;
- what was not run;
- what a human reviewed;
- which exceptions remain active;
- whether delivery is allowed.

## Grounded in Clay

Truing is conceptually grounded in the engineering lesson demonstrated by [Clay](https://github.com/nicbarker/clay), the high-performance UI layout library in C.

Clay shows that a domain commonly treated as mysterious can become small and understandable once the correct representation and execution passes are identified. Its layout model separates concerns such as hierarchy, sizing, growth and shrinkage, text wrapping, positioning, and alignment instead of attempting to solve everything at once.

Truing applies that lesson one level above layout computation.

It does **not** depend on Clay and it is **not** a layout engine. It borrows the method:

- represent the real relationships instead of testing incidental pixels;
- separate intent discovery from contract approval;
- separate scenario execution from observation;
- separate deterministic facts from heuristics and model critique;
- finalize evidence before asking for judgment;
- use explicit passes to eliminate whole classes of ambiguity;
- keep the core small and compose specialized tools around it.

Where Clay makes it possible to explain why an element received its size and position, Truing aims to make it possible to explain why an implemented interface satisfies—or violates—its intended behavior.

## What Truing is not

Truing is not intended to become:

- a CSS layout engine;
- a Figma replacement;
- a component library;
- a universal design score;
- a generic AI design critic;
- another screenshot-diff service;
- a substitute for human design judgment.

Playwright, Storybook, axe-core, visual regression systems, design tokens, and design metadata providers already solve valuable parts of the problem. Truing should connect their evidence through a shared contract, authority model, reconciliation process, and receipt.

## Current status

Truing is in **pre-alpha foundation and validation work**.

The repository currently contains:

- the `truing.dev/v0alpha1` interface-contract format;
- YAML parsing and schema validation;
- normalized contract output;
- deterministic SHA-256 contract fingerprints;
- duplicate scenario and assertion checks;
- the initial `truing contract check` CLI workflow;
- a dense diagnostic event-detail example;
- a Switchyard homepage contract derived from a real responsive audit;
- product, architecture, MVP, and validation documentation.

It does **not** yet execute browser scenarios or generate design receipts. The repository is intentionally establishing the stable contract boundary before adding those systems.

## Development path

Development is organized around proofs, not a broad platform build.

### Milestone 1 — Contract spine

**Purpose:** establish the durable representation before browser automation.

Current work:

- validate and normalize interface contracts;
- fingerprint approved intent;
- keep the format readable by humans and reliable for machines;
- prove that multiple real examples fit the same core model.

**Exit proof:** contracts are understandable, deterministic, versionable, and consumable by CI.

### Milestone 2 — Switchyard browser pilot

**Purpose:** convert a completed manual Playwright audit into an executable Truing run.

The pilot must reproduce six known failures:

1. header overflow at 320 pixels;
2. brittle forced-nowrap hero content;
3. an undersized mobile-menu target;
4. unnamed theme controls;
5. long receipt identifiers overflowing;
6. long destination names cramping a receipt row.

Required implementation:

- Playwright scenario runner;
- representative viewports and breakpoint-neighborhood probes;
- DOM and geometry observations;
- horizontal-overflow, clipping, overlap, target-size, accessible-name, and interaction assertions;
- hostile-content scenarios;
- screenshot and trace evidence.

**Exit proof:** Truing detects the seeded failures, verifies the corrections, and reports the limits of the browser and analyzer coverage honestly.

### Milestone 3 — Findings, reconciliation, and receipts

**Purpose:** turn raw browser output into defensible delivery evidence.

Required implementation:

- structured findings with severity and confidence;
- content-addressed evidence manifests;
- explicit `not_run`, `blocked`, and initialization-failure states;
- accepted-change and exception records;
- scoped human review;
- Markdown and JSON design receipts;
- CI release policy.

**Exit proof:** a pull request can move from implementation change to evidence, review, reconciliation, and a machine-readable delivery decision.

### Milestone 4 — Agent-assisted contract authoring

**Purpose:** make the contract format infrastructure rather than paperwork.

Required implementation:

- repository and audit discovery;
- generated contract proposals;
- source provenance;
- confidence and unresolved-question reporting;
- contract-diff review;
- explicit human authorization;
- safeguards against self-approval and failure-driven weakening.

**Exit proof:** an LLM can derive a useful proposal from the Switchyard repository and audit, while deterministic verification remains fully usable without a model.

### Milestone 5 — Second product-intent proof

**Purpose:** prove that Truing captures more than responsive mechanics.

The event-detail pilot will verify that critical diagnostic truth remains visible, correctly ordered, labeled, and actionable across failure states and responsive transformations.

**Exit proof:** Truing catches a product-intent failure that a technically valid DOM, passing interaction test, and plausible screenshot would not explain by themselves.

Only after these proofs should the project expand toward Storybook, Figma, design-system, hosted review, managed browser, or organization-policy integrations.

See [`docs/MVP.md`](docs/MVP.md) for the detailed vertical slice and [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for package and authority boundaries.

## Quick start

Requirements: Node.js 20 or newer.

```bash
npm install
npm run build
npm run contract:check -- examples
npm test
```

Check one contract directly:

```bash
node packages/cli/dist/cli.js contract check \
  examples/switchyard-home/switchyard-home.truing.yml
```

## Repository map

```text
packages/
  contract/   Contract schema, parsing, normalization, and fingerprints
  cli/        Initial `truing` command-line interface

examples/
  event-detail/      Dense diagnostic interface contract
  switchyard-home/   Contract derived from a real responsive audit

docs/
  PRODUCT_DEFINITION.md
  VALIDATION_SWITCHYARD.md
  ARCHITECTURE.md
  MVP.md

schemas/
  interface-contract.v0alpha1.schema.json
```

## Working principles

1. Intent before pixels.
2. Deterministic evidence before model judgment.
3. Human review is a first-class system boundary.
4. Repository-native and local-first by default.
5. Every finding should be explainable and reproducible.
6. Exceptions are governed, not silently suppressed.
7. Existing tools are adapters, not competitors to rebuild.
8. Generated contract proposals never approve themselves.
9. Missing coverage is never reported as a pass.
10. Complexity follows demonstrated need.

## Contributing

Truing is early enough that the highest-value contributions are still corrections to the model:

- real interface failures that existing tools detected but did not explain;
- audits that contain durable product intent trapped in prose;
- contract vocabulary that is too brittle, vague, or implementation-specific;
- scenarios where automation and human judgment need a clearer boundary;
- evidence or exception workflows that would become burdensome in real teams.

The project is not yet accepting broad feature implementation without prior alignment. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

No open-source license has been selected yet. Until one is added, the repository remains source-available for review but does not grant reuse rights.
