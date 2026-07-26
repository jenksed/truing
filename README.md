# Truing

**Repository-native interface contracts and evidence for verifying that implemented UI preserves product and design intent.**

Truing is an early-stage open-source project exploring a missing layer in frontend delivery: an explicit, versioned contract between interface intent and implementation evidence.

A Truing contract describes the states, information priorities, responsive transformations, accessibility expectations, and human review obligations that matter. Truing runs those contracts against a real interface, explains what passed or failed, preserves evidence, and produces a design receipt.

## Why Truing exists

Visual regression tools can prove that pixels changed. Browser tests can prove that interactions execute. Accessibility engines can detect many rule violations. Design files can provide implementation context.

None of those alone can answer the larger question:

> Did the implemented interface preserve the product and design intent that actually matters across states, content, viewports, accessibility conditions, and review boundaries?

Truing is intended to connect:

```text
sources and repository
  → generated contract proposal
  → approved interface contract
  → scenarios and observations
  → assertions and evidence
  → findings and reconciliation
  → design receipt
```

The contract is a readable, committed intermediate representation. Humans should normally review product decisions and contract diffs rather than hand-author every YAML field. LLMs may propose contracts, but deterministic verification runs against the approved contract without requiring a model.

## Current status

Truing is in **pre-alpha discovery and foundation work**. The first executable slice is intentionally small:

- a versioned interface contract;
- schema validation and normalization;
- deterministic contract fingerprints;
- a CLI command for checking contract files;
- a diagnostic event-detail example;
- a Switchyard homepage contract derived from a completed mobile audit.

The larger product definition is in [`docs/PRODUCT_DEFINITION.md`](docs/PRODUCT_DEFINITION.md).

The first real validation case is documented in [`docs/VALIDATION_SWITCHYARD.md`](docs/VALIDATION_SWITCHYARD.md). It directly informs the revised [`docs/MVP.md`](docs/MVP.md) and architecture.

## Quick start

Requirements: Node.js 20 or newer.

```bash
npm install
npm run build
npm run contract:check -- examples
npm test
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
```

## Product boundaries

Truing is not intended to become:

- a CSS layout engine;
- a Figma replacement;
- a universal design score;
- a generic AI design critic;
- another screenshot-diff service;
- a substitute for human design judgment.

It should compose existing browser, accessibility, component, design-system, and visual-testing tools around a shared contract, evidence, and reconciliation model.

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

## Contributing

The project is not yet accepting broad implementation contributions. Thoughtful feedback on the contract model, target users, failure cases, and MVP is welcome. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

No open-source license has been selected yet. Until one is added, the repository remains source-available for review but does not grant reuse rights.
