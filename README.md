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

An LLM or human examines the repository, routes, components, tests, design documentation, screenshots, prior audits, and existing conventions.

The discovery step identifies likely targets, states, responsive transformations, information priorities, accessibility requirements, content stress cases, exceptions, and unresolved questions.

### 2. Propose

The result is a contract proposal with provenance, assumptions, and questions requiring human judgment.

Humans should normally review product decisions and contract diffs—not hand-author every YAML field.

### 3. Authorize

A person approves the intended behavior.

The committed contract becomes the deterministic source of truth for future humans, CI runs, and coding agents. A model may propose changes, but it cannot approve its own proposal or weaken an assertion merely to make verification pass.

### 4. Route and verify

Truing chooses the least expensive execution path that can prove each claim honestly:

```text
plain HTTP or an existing API
  → Lightpanda PandaScript for structured, nonvisual browser replay
  → Playwright or a full browser for rendering and visual behavior
  → live agent browsing only when runtime judgment is genuinely required
```

The approved contract determines what the resulting observations mean.

### 5. Reconcile

A failure or change must be resolved explicitly: fixed, accepted change, approved exception, false positive, contract correction, deferred debt, or blocked pending a product decision.

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

## Browser execution strategy

Truing does not need one heavyweight browser path for every assertion, and it should not keep an LLM inside routine browser replay.

### Plain HTTP or an existing API

Use this when JavaScript execution and browser state are unnecessary. No browser claim should be made from this evidence.

### Lightpanda with PandaScript

Use Lightpanda for fast, DOM-oriented JavaScript execution where visual rendering is not the thing being proved.

Good candidates include semantic target presence, accessible names, simple disclosure or form behavior, structured extraction, capability reachability, and recurring nonvisual smoke workflows.

```text
Reason once
  → preserve the PandaScript
  → review it as repository code
  → replay without an LLM
  → validate structured postconditions
  → receipt
```

A deterministic script does not make a remote website deterministic. Truing must still classify timing, authentication, page-change, and environment failures honestly.

### Playwright or another full browser

Use a real rendering engine whenever the required truth depends on what a user can see or operate.

That includes screenshots, geometry, overflow, clipping, wrapping, responsive breakpoints, fonts, animation, browser zoom, compatibility, and visual review.

Lightpanda is not the visual-testing authority.

### Live agent browsing

Use live model-guided browsing only when the task is too unfamiliar or unstable to preserve immediately as deterministic automation.

Successful exploration should become a reviewed PandaScript or Playwright scenario whenever the procedure will be repeated.

A single contract may combine evidence from more than one lane. Every observation must record which backend produced it and what that backend is qualified to prove.

See [`docs/BROWSER_EXECUTION_STRATEGY.md`](docs/BROWSER_EXECUTION_STRATEGY.md) for the detailed policy and security boundary.

## Token and agent economics

Truing is not automatically cheaper than asking a coding agent to perform a one-time audit.

The initial discovery and authoring pass may cost more because it produces reusable contracts, workflows, and evidence rules rather than only a terminal answer.

The efficiency gain begins when that knowledge or procedure will be used again.

A typical agent-only loop repeatedly spends tokens on repository inspection, requirement interpretation, browser command generation, raw-output review, prior-exception recovery, and completion judgment.

Truing preserves the stable parts as repository infrastructure:

```text
approved contract
accepted browser workflow
fixtures
assertion definitions
release policy
evidence and receipt schemas
```

After setup, a passing verification run should require **zero LLM tokens**. When a run fails, the model should receive bounded evidence rather than the entire repository and a long browser transcript.

The operating rule is:

> Use Truing when the knowledge should survive the current session. Use direct agent exploration when it should not.

Truing loses its economic advantage if contracts mirror incidental DOM details, workflows are regenerated instead of reused, an LLM is invoked on every run, or receipts dump all raw evidence back into model context.

## Grounded in Clay

Truing is conceptually grounded in the engineering lesson demonstrated by [Clay](https://github.com/nicbarker/clay), the high-performance UI layout library in C.

Clay shows that a domain commonly treated as mysterious can become small and understandable once the correct representation and execution passes are identified. Its layout model separates hierarchy, sizing, growth and shrinkage, text wrapping, positioning, and alignment instead of attempting to solve everything at once.

Truing applies that lesson one level above layout computation.

It does **not** depend on Clay and it is **not** a layout engine. It borrows the method:

- represent the real relationships instead of testing incidental pixels;
- separate intent discovery from contract approval;
- separate execution routing from observation;
- separate deterministic facts from heuristics and model critique;
- finalize evidence before asking for judgment;
- use explicit passes to eliminate ambiguity;
- keep the core small and compose specialized tools around it.

Where Clay makes it possible to explain why an element received its size and position, Truing aims to explain why an implemented interface satisfies—or violates—its intended behavior.

## What Truing is not

Truing is not intended to become:

- a CSS layout engine;
- a Figma replacement;
- a component library;
- a universal design score;
- a generic AI design critic;
- another screenshot-diff service;
- a substitute for human design judgment;
- a persistent browser agent;
- a new browser engine;
- a generic browser abstraction before its execution lanes are proven.

Playwright, Lightpanda, Storybook, axe-core, visual regression systems, design tokens, and design metadata providers already solve valuable parts of the problem. Truing should route and connect their evidence through a shared contract, authority model, reconciliation process, and receipt.

## Current status

Truing is in **pre-alpha planning and validation**.

The repository currently provides:

- the `truing.dev/v0alpha1` contract envelope;
- YAML parsing and minimal schema validation;
- normalized contract output;
- deterministic SHA-256 fingerprints;
- duplicate scenario and assertion checks;
- the initial `truing contract check` CLI workflow;
- two illustrative contract examples;
- product, architecture, browser-strategy, and validation documentation.

It does **not** yet execute browser scenarios, evaluate interface assertions, or generate design receipts.

The examples contain proposed semantics that the current permissive schema does not fully validate. A successful contract check currently proves that the minimal envelope is valid and fingerprintable—not that the full example is executable.

## Active development boundary

The repository is in **Phase 0: planning and owner approval**.

No product implementation is authorized until the owner accepts or replaces the proposed initial-release decision in [`docs/DECISIONS.md`](docs/DECISIONS.md).

The proposed initial release is deliberately small:

```text
one approved contract
  → one bundled local fixture
  → Lightpanda for two nonvisual assertions
  → Playwright for one rendered assertion
  → structured findings and evidence
  → JSON and Markdown receipt
  → deterministic exit status
```

The real Switchyard integration, contract generation, broad assertion catalog, breakpoint matrices, hosted services, and human-review workflows are deferred.

Use these documents before implementation:

1. [`docs/PROJECT_STATE.md`](docs/PROJECT_STATE.md) — what is real, proposed, undefined, or conflicting;
2. [`docs/MVP.md`](docs/MVP.md) — authoritative scope, phases, acceptance criteria, stopping points, and backlog;
3. [`docs/DECISIONS.md`](docs/DECISIONS.md) — decisions, rejected alternatives, assumptions, open questions, and risks;
4. [`AGENTS.md`](AGENTS.md) — mandatory coding-agent rules.

Broader product and architecture documents are directional references. They do not silently add work to the active release.

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
  event-detail/      Dense diagnostic interface proposal
  switchyard-home/   Proposal derived from a real responsive audit

docs/
  PROJECT_STATE.md
  MVP.md
  DECISIONS.md
  PRODUCT_DEFINITION.md
  VALIDATION_SWITCHYARD.md
  BROWSER_EXECUTION_STRATEGY.md
  ARCHITECTURE.md

schemas/
  interface-contract.v0alpha1.schema.json
```

## Working principles

1. Intent before pixels.
2. Use the least expensive execution path that can prove the claim honestly.
3. Deterministic evidence before model judgment.
4. Routine browser replay should not require an LLM.
5. Human review is a first-class system boundary.
6. Repository-native and local-first by default.
7. Every finding should be explainable and reproducible.
8. Exceptions are governed, not silently suppressed.
9. Existing tools are adapters, not competitors to rebuild.
10. Generated contract and workflow proposals never approve themselves.
11. Missing coverage is never reported as a pass.
12. Complexity follows demonstrated need.

## Contributing

The highest-value contributions now are corrections to the product model, active scope, evidence authority, or acceptance criteria.

The project is not accepting broad feature implementation without prior alignment. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

No open-source license has been selected yet. Until one is added, the repository remains source-available for review but does not grant reuse rights.
