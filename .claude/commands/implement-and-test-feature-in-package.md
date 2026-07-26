---
name: implement-and-test-feature-in-package
description: Workflow command scaffold for implement-and-test-feature-in-package in truing.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /implement-and-test-feature-in-package

Use this workflow when working on **implement-and-test-feature-in-package** in `truing`.

## Goal

Implements a new feature in a package and adds a corresponding test file.

## Common Files

- `packages/*/src/*.ts`
- `packages/*/test/*.test.ts`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Implement feature in src/ of the package
- Add or update test in test/ of the package

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.