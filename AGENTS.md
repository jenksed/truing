# AGENTS.md

## Project intent

Truing is a repository-native interface contract and evidence system. Preserve the distinction between deterministic proof, heuristic signals, visual change, model-assisted critique, and human judgment.

## Current phase

The repository is pre-alpha. Prefer a narrow, explainable vertical slice over broad platform scaffolding.

## Engineering constraints

- Node.js 20+ and TypeScript.
- Keep the core local-first and usable without a hosted service.
- Do not add a universal design score.
- Do not let AI-generated findings satisfy required human review.
- Prefer adapters for existing tools over reimplementing Playwright, axe-core, Storybook, or visual-diff infrastructure.
- Preserve provenance for contracts, evidence, findings, and receipts.
- New assertions must declare their epistemic class: deterministic, derived deterministic, heuristic, reference-relative, model-assisted, or human.

## Required checks

```bash
npm install
npm run check
npm run build
npm run contract:check -- examples/event-detail/event-detail.truing.yml
```

## Documentation

Update the relevant document when changing product boundaries, contract semantics, or architecture. Do not silently encode product decisions only in code.
