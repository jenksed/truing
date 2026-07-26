---
name: add-new-package
description: Workflow command scaffold for add-new-package in truing.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-new-package

Use this workflow when working on **add-new-package** in `truing`.

## Goal

Adds a new package to the monorepo, including initial package.json and tsconfig.json setup.

## Common Files

- `packages/*/package.json`
- `packages/*/tsconfig.json`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create package directory under packages/
- Add package.json to the new package directory
- Add tsconfig.json to the new package directory

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.