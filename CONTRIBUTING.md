# Contributing to Truing

Truing is currently in pre-alpha discovery. The most useful contributions are concrete examples of interface intent that ordinary browser tests, accessibility scans, or screenshot diffs fail to represent well.

## Before proposing code

Open an issue describing:

1. the interface failure or ambiguity;
2. the intended truth that should have been preserved;
3. the evidence available to evaluate it;
4. whether the result is deterministic, heuristic, reference-relative, model-assisted, or human-reviewed;
5. why an existing tool cannot express the requirement by itself.

## Development

```bash
npm install
npm run check
npm run build
npm run contract:check -- examples/event-detail/event-detail.truing.yml
```

## Scope discipline

Please avoid introducing hosted infrastructure, automatic aesthetic scoring, broad framework abstractions, or large plugin systems before the first contract-to-receipt vertical slice is proven.
