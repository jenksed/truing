# MVP vertical slice

## Goal

Prove that an interface contract and evidence-backed receipt reveal important failures that ordinary browser tests and screenshot diffs do not explain by themselves.

## Target

One complex web route representing diagnostic or operational information.

## Scenarios

1. delivered with typical content;
2. failed with long and hostile content;
3. partial or empty diagnostic evidence.

## Viewports

- 375 × 812;
- 768 × 1024;
- 1280 × 900.

## Required truths

- critical status remains visible;
- required evidence fields are present;
- reading order is preserved;
- the page has no horizontal overflow;
- long identifiers wrap safely;
- tabular evidence transforms without losing labels;
- destructive actions remain secondary;
- keyboard dialog behavior passes;
- automated accessibility checks run;
- information hierarchy receives explicit human review.

## First seeded defect

On the phone viewport, place the failure reason inside a collapsed disclosure.

The page may remain valid, clickable, and visually plausible, but it violates the product requirement that critical diagnostic truth be visible without optional interaction. This is the first proof that the contract adds meaning beyond screenshots.

## MVP exit criteria

- a contributor can understand the contract without reading the engine;
- at least three seeded failures are detected;
- every failure points to reproducible evidence;
- visual changes can be reconciled without suppressing unrelated assertions;
- human review is recorded with exact scope;
- a JSON receipt can be consumed by CI or Voilà;
- the full workflow runs locally with one documented command.
