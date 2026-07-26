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
intent → scenarios → observations → assertions → evidence → findings → reconciliation → receipt
```

## Current status

Truing is in **pre-alpha discovery and foundation work**. The first executable slice is intentionally small:

- a versioned interface contract;
- schema validation and normalization;
- deterministic contract fingerprints;
- a CLI command for checking contract files;
- an example contract for a diagnostic event-detail interface.

The larger product definition is in [`docs/PRODUCT_DEFINITION.md`](docs/PRODUCT_DEFINITION.md).

## Quick start

Requirements: Node.js 20 or newer.

```bash
npm install
npm run build
npm run contract:check -- examples/event-detail/event-detail.truing.yml
npm test
```

## Repository map

```text
packages/
  contract/   Contract schema, parsing, normalization, and fingerprints
  cli/        Initial `truing` command-line interface
examples/
  event-detail/  First representative interface contract
docs/
  PRODUCT_DEFINITION.md
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

## Contributing

The project is not yet accepting broad implementation contributions. Thoughtful feedback on the contract model, target users, failure cases, and MVP is welcome. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

No open-source license has been selected yet. Until one is added, the repository remains source-available for review but does not grant reuse rights.
