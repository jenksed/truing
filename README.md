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

## Browser execution strategy

Truing does not need one heavyweight browser path for every assertion, and it should not keep an LLM inside routine browser replay.

The browser strategy is:

### 1. Plain HTTP or an existing API

Use this when JavaScript execution and browser state are unnecessary.

Examples:

- verify a resource or API response;
- inspect structured metadata;
- test a server-side postcondition.

No browser claim should be made from this evidence.

### 2. Lightpanda with PandaScript

Use Lightpanda for fast, DOM-oriented JavaScript execution where visual rendering is not the thing being proved.

Good candidates include:

- semantic target presence;
- accessible names;
- simple disclosure or form behavior;
- structured extraction from JavaScript-rendered pages;
- capability reachability;
- recurring nonvisual smoke workflows;
- normalized JSON results consumed by Truing assertions.

The operating model is:

```text
Reason once
  → preserve the PandaScript
  → review it as repository code
  → replay without an LLM
  → validate structured postconditions
  → receipt
```

A deterministic script does not make a remote website deterministic. Truing must still classify timing, authentication, page-change, and environment failures honestly.

### 3. Playwright or another full browser

Use a real rendering engine whenever the required truth depends on what a user can see or operate.

That includes:

- screenshots and visual evidence;
- element geometry;
- overflow, clipping, wrapping, and overlap;
- responsive breakpoints;
- font and typography behavior;
- animation and reduced motion;
- browser zoom;
- cross-browser compatibility;
- complex Web APIs;
- visual review.

Lightpanda is not the visual-testing authority. The Switchyard overflow, breakpoint, touch-target, wrapping, and screenshot checks remain Playwright work.

### 4. Live agent browsing

Use live model-guided browsing only when the task is too unfamiliar or unstable to preserve immediately as deterministic automation.

Successful exploration should become a reviewed PandaScript or Playwright scenario whenever the procedure will be repeated.

### One contract, multiple evidence lanes

A Truing scenario may combine evidence from both browser lanes:

- Lightpanda can replay semantic and interaction checks quickly;
- Playwright can run the smaller set of states that require rendering, geometry, screenshots, or compatibility evidence;
- the receipt records which backend produced every observation and what that backend is qualified to prove.

The execution planner should route each assertion to the lowest-cost backend that can establish it without overstating the evidence.

The detailed policy, security boundary, workflow manifest, receipts, and initial acceptance proof are documented in [`docs/BROWSER_EXECUTION_STRATEGY.md`](docs/BROWSER_EXECUTION_STRATEGY.md).

## Token and agent economics

Truing is not automatically more efficient than asking an LLM-backed coding agent to inspect a project and run a one-time audit.

The initial discovery and authoring pass may cost more because the model must:

- inspect the repository and existing evidence;
- distinguish durable product intent from implementation detail;
- propose contracts, scenarios, and browser procedures;
- surface uncertainty and request human authorization;
- produce reusable artifacts rather than only a terminal answer.

The efficiency gain begins when that knowledge or procedure will be used again.

A typical agent-only loop repeatedly spends tokens on:

```text
inspect the repository
  → rediscover the relevant UI structure and breakpoints
  → reinterpret the requirements
  → decide what to test
  → generate browser commands
  → inspect raw output
  → recover prior exceptions and decisions
  → explain whether the result is acceptable
```

Truing preserves the stable parts as repository infrastructure:

```text
approved contract
accepted browser workflow
fixtures and content profiles
assertion definitions
exception records
release policy
evidence and receipt schemas
```

After that setup, a passing verification run should require **zero LLM tokens**. HTTP checks, PandaScripts, Playwright scenarios, assertions, and receipt generation run deterministically.

When a run fails, the model should receive bounded evidence instead of the entire repository and a long browser transcript:

```text
failed assertion
+ expected contract truth
+ exact observations
+ related evidence
+ relevant source paths
+ prior reconciliation state
```

That keeps the LLM focused on novelty: explaining the failure, proposing a fix, or proposing an explicit contract change. The model is not paid to rediscover the entire project before every decision.

### Where Lightpanda improves the economics

Lightpanda/PandaScript reduces both model use and execution cost for qualifying nonvisual checks:

- the browser procedure is preserved once;
- routine replay contains no LLM call;
- structured JSON replaces verbose exploratory transcripts;
- only claims requiring graphical rendering are escalated to Playwright;
- only genuinely unfamiliar or changing work returns to live agent browsing.

The intended progression is:

```text
LLM explores
  → repeated value becomes clear
  → Truing preserves the intent and procedure
  → deterministic replay handles future runs
  → the LLM returns only for novelty, ambiguity, or failure
```

### When not to formalize a workflow

A direct coding agent remains the better tool when the work is:

- genuinely one-time;
- exploratory and unlikely to repeat;
- changing too quickly for a durable contract;
- too uncertain to authorize yet;
- cheaper to inspect again than to maintain as project infrastructure.

The operating rule is:

> Use Truing when the knowledge should survive the current session. Use direct agent exploration when it should not.

Truing loses its economic advantage if contracts encode incidental DOM details, workflows are regenerated instead of reused, an LLM is invoked on every run, or receipts dump all raw evidence back into model context. Token efficiency is therefore a product requirement and an architectural constraint—not merely a hoped-for side effect.

## Grounded in Clay

Truing is conceptually grounded in the engineering lesson demonstrated by [Clay](https://github.com/nicbarker/clay), the high-performance UI layout library in C.

Clay shows that a domain commonly treated as mysterious can become small and understandable once the correct representation and execution passes are identified. Its layout model separates concerns such as hierarchy, sizing, growth and shrinkage, text wrapping, positioning, and alignment instead of attempting to solve everything at once.

Truing applies that lesson one level above layout computation.

It does **not** depend on Clay and it is **not** a layout engine. It borrows the method:

- represent the real relationships instead of testing incidental pixels;
- separate intent discovery from contract approval;
- separate execution routing from observation;
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
- a substitute for human design judgment;
- a persistent browser agent;
- a new browser engine;
- a generic browser abstraction before its execution lanes are proven.

Playwright, Lightpanda, Storybook, axe-core, visual regression systems, design tokens, and design metadata providers already solve valuable parts of the problem. Truing should route and connect their evidence through a shared contract, authority model, reconciliation process, and receipt.

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
- product, architecture, browser-strategy, MVP, and validation documentation.

It does **not** yet execute browser scenarios or generate design receipts. The repository is intentionally establishing the stable contract and execution boundaries before adding those systems.

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

### Milestone 2 — Browser routing and deterministic replay

**Purpose:** establish the browser execution boundary before building visual verification on top of it.

Required implementation:

- explicit routing between HTTP, Lightpanda/PandaScript, Playwright/full browser, and live exploration;
- a pinned external Lightpanda adapter;
- repository-owned PandaScripts and policy manifests;
- origin allowlists, side-effect classification, secret-name declarations, timeout, and output bounds;
- structured JSON-compatible completion values;
- postcondition validation;
- model-free routine replay;
- immutable browser execution receipts;
- a local JavaScript fixture with positive and negative paths;
- ten consistent Lightpanda replays with zero LLM calls.

**Exit proof:** Truing can preserve one successful browser procedure, replay it safely without a model, validate its postconditions, and report a receipt without making any visual claim.

### Milestone 3 — Switchyard rendered-browser pilot

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
- screenshot and trace evidence;
- optional Lightpanda execution for qualifying semantic or smoke assertions;
- explicit backend attribution in evidence.

**Exit proof:** Truing routes each assertion to an honest browser lane, detects the seeded failures, verifies the corrections, and reports the limits of browser and analyzer coverage.

### Milestone 4 — Findings, reconciliation, and receipts

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

### Milestone 5 — Agent-assisted contract and workflow authoring

**Purpose:** make contracts and repeatable browser procedures infrastructure rather than paperwork.

Required implementation:

- repository and audit discovery;
- generated contract proposals;
- generated PandaScript or Playwright scenario proposals;
- source provenance;
- confidence and unresolved-question reporting;
- contract and workflow diff review;
- explicit human authorization;
- safeguards against self-approval and failure-driven weakening;
- bounded repair followed by deterministic replay.

**Exit proof:** an LLM can derive a useful contract and browser-workflow proposal from the Switchyard repository and audit, while deterministic verification remains fully usable without a model.

### Milestone 6 — Second product-intent proof

**Purpose:** prove that Truing captures more than responsive mechanics.

The event-detail pilot will verify that critical diagnostic truth remains visible, correctly ordered, labeled, and actionable across failure states and responsive transformations.

**Exit proof:** Truing catches a product-intent failure that a technically valid DOM, passing interaction test, and plausible screenshot would not explain by themselves.

Only after these proofs should the project expand toward Storybook, Figma, design-system, hosted review, managed browser, or organization-policy integrations.

See [`docs/MVP.md`](docs/MVP.md) for the detailed vertical slice, [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for package and authority boundaries, and [`docs/BROWSER_EXECUTION_STRATEGY.md`](docs/BROWSER_EXECUTION_STRATEGY.md) for execution routing.

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
  BROWSER_EXECUTION_STRATEGY.md
  ARCHITECTURE.md
  MVP.md

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

Truing is early enough that the highest-value contributions are still corrections to the model:

- real interface failures that existing tools detected but did not explain;
- audits that contain durable product intent trapped in prose;
- repeatable browser procedures currently lost in model sessions;
- browser tasks routed to the wrong execution tier;
- contract vocabulary that is too brittle, vague, or implementation-specific;
- scenarios where automation and human judgment need a clearer boundary;
- evidence or exception workflows that would become burdensome in real teams.

The project is not yet accepting broad feature implementation without prior alignment. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

No open-source license has been selected yet. Until one is added, the repository remains source-available for review but does not grant reuse rights.
