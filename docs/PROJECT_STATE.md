# Project state

**Status:** planning complete; implementation not authorized  
**Reviewed revision:** `main` after PR #3  
**Active release plan:** [`MVP.md`](MVP.md)  
**Decision and uncertainty log:** [`DECISIONS.md`](DECISIONS.md)

## Purpose

This document records what the repository currently proves, what it only proposes, and which documents control implementation work.

It exists to prevent future agents from treating aspirational examples or long-term architecture as already implemented requirements.

## Document authority

When documents differ, use this order:

1. [`AGENTS.md`](../AGENTS.md) — operating rules for coding agents.
2. [`MVP.md`](MVP.md) — the active initial-release boundary, phases, backlog, acceptance criteria, and stopping points.
3. [`DECISIONS.md`](DECISIONS.md) — accepted decisions, rejected alternatives, assumptions, open questions, risks, and approval gates.
4. [`PRODUCT_DEFINITION.md`](PRODUCT_DEFINITION.md) — long-term product thesis and vocabulary.
5. [`ARCHITECTURE.md`](ARCHITECTURE.md) and [`BROWSER_EXECUTION_STRATEGY.md`](BROWSER_EXECUTION_STRATEGY.md) — directional architecture and execution strategy.
6. [`VALIDATION_SWITCHYARD.md`](VALIDATION_SWITCHYARD.md) — evidence and lessons from the Switchyard audit.
7. Files under `examples/` — illustrative contract proposals unless the active plan explicitly promotes a field or behavior into the executable subset.

The long-term documents do not silently add work to the active release.

## What is already established

### Executable repository behavior

The repository currently provides:

- a Node.js and TypeScript workspace;
- `@truing/contract` for YAML parsing, minimal schema validation, stable normalization, and SHA-256 fingerprints;
- duplicate scenario-ID and assertion-ID validation;
- `@truing/cli` with `truing contract check <paths...>`;
- recursive contract discovery for YAML, YML, and JSON files;
- unit tests for a valid contract, a missing route, and duplicate scenario IDs;
- CI that installs dependencies, typechecks, tests, builds, and validates every file under `examples/`.

The current CLI does **not** execute browser scenarios or evaluate interface assertions.

### Confirmed product decisions

The repository consistently establishes that Truing is:

- repository-native and local-first;
- an interface-contract, evidence, reconciliation, and receipt system;
- a coordination layer around existing tools rather than a replacement browser, layout engine, accessibility engine, or visual-diff system;
- explicit about the authority difference between deterministic facts, heuristics, model-assisted signals, and human judgment;
- designed so an LLM may propose contracts or workflows but cannot approve its own proposal;
- designed so routine verification can run without an LLM;
- intended to use the least expensive execution path qualified to prove a claim;
- intended to use Lightpanda/PandaScript for nonvisual structured browser evidence and Playwright/full browsers for rendered evidence.

### Confirmed product evidence

The Switchyard audit validates several high-value concepts:

- breakpoint-neighborhood probes;
- responsive capability preservation rather than identical-element preservation;
- deterministic hostile-content scenarios;
- explicit `not_run` and coverage states;
- governed exceptions that do not erase measurements;
- concise receipts backed by detailed evidence;
- the value of preserving browser reasoning beyond a single agent session.

## What is currently an idea, proposal, or assumption

The following are documented but not implemented:

- contract generation from repository context or audit reports;
- approval and contract-diff workflows;
- Lightpanda/PandaScript execution;
- Playwright scenario execution;
- automatic execution-backend routing;
- DOM, geometry, accessibility, interaction, and visual observation packages;
- assertion evaluation;
- content-profile generation;
- breakpoint-neighborhood execution;
- evidence manifests;
- finding and reconciliation records;
- JSON and Markdown receipts;
- human-review records;
- release policy enforcement;
- Voilà integration;
- hosted services or organization policy.

The rich fields in the example contracts are proposals. The current permissive schema accepts most of them without validating their semantics.

## Decisions already made

The following decisions are treated as accepted unless the owner changes them:

- preserve the contract as a readable, versioned repository artifact;
- use Node.js and TypeScript for the existing core;
- keep deterministic verification usable without a model;
- keep Lightpanda externally installed and nonvisual in authority;
- keep Playwright or another full browser authoritative for rendering and geometry;
- do not introduce a universal design score;
- do not let model output satisfy required human approval;
- do not build a generic browser abstraction before two real backend implementations justify shared interfaces;
- do not add hosted infrastructure before the local vertical slice is proven.

## Undefined or unresolved

The repository does not yet settle:

- whether the first release should prove one browser lane or both Lightpanda and Playwright;
- the exact executable subset of `truing.dev/v0alpha1`;
- the receipt schema and evidence-directory layout;
- the exact Lightpanda version and supported installation method;
- whether Lightpanda can run reliably in the intended CI environment;
- the local fixture and server mechanism;
- the package-lock policy and reproducible-install requirement;
- whether the initial release is intended for external users or only as an internal proof;
- the open-source license;
- the minimum supported operating systems;
- the exact owner-approval representation for contracts and workflow manifests.

These questions must be recorded rather than silently answered during implementation.

## Conflicts and drift found during review

### 1. Competing MVP definitions

`PRODUCT_DEFINITION.md` describes a broad dense-route MVP with Playwright, multiple assertion families, axe-core, human review, reconciliation, and receipts.

The newer README and browser documents introduce Lightpanda-first replay, a Switchyard homepage pilot, and a larger six-milestone path.

Neither is sufficiently bounded as the active initial release. [`MVP.md`](MVP.md) now supersedes those sections for implementation sequencing while preserving them as long-term direction.

### 2. Examples imply semantics the schema does not enforce

The Switchyard example contains provenance, probes, content profiles, capabilities, coverage, exceptions, and review policy. The current validator accepts these primarily through permissive `passthrough` and `additionalProperties` behavior.

A `PASS` from `truing contract check` currently means the minimal envelope is valid and fingerprintable. It does not mean the full example is executable or semantically validated.

### 3. Agent and contributor checks were stale

The previous instructions validated only the event-detail example even though CI validates all examples. The updated instructions use the repository-wide check and require the active phase's additional verification.

### 4. Reproducible installation is not established

There is no committed npm lockfile. CI uses `npm install`. This is acceptable for the current planning state but must be resolved before an initial release is called reproducible.

### 5. Planning and approval state were implicit

The repository had no authoritative active phase, ordered implementation backlog, lightweight decision log, or owner-approval gate. Future agents could select any documented horizon and begin implementing it. The new planning structure removes that ambiguity.

## Proposed smallest coherent initial release

The proposed initial release is **IR-1: local dual-lane contract-to-receipt proof**.

It would demonstrate one complete, bounded chain:

```text
approved contract
  → one local fixture modeled on known Switchyard failures
  → Lightpanda nonvisual observations
  → Playwright rendered observations
  → three deterministic assertions
  → structured findings
  → JSON and Markdown receipt
  → deterministic CLI exit status
```

The release would intentionally avoid the real Switchyard repository, LLM authoring, broad assertion catalogs, hosted infrastructure, generic plugin systems, and full reconciliation workflows.

This is a **proposed** boundary and requires owner approval in `D-006` before implementation begins.

## Current stopping point

Planning documents and agent controls may be changed on the planning branch.

Product functionality must not be implemented until:

1. the owner approves or changes `D-006` in [`DECISIONS.md`](DECISIONS.md);
2. the active release scope in [`MVP.md`](MVP.md) is accepted;
3. the first backlog item is explicitly activated.
