# AGENTS.md

## Purpose

These instructions govern all coding-agent work in this repository.

Truing is pre-alpha and planning-first. The primary risk is not insufficient architecture; it is agents selecting an aspirational part of the documentation and implementing beyond the active release boundary.

## Required orientation

Before changing code or executable configuration, read in this order:

1. [`docs/PROJECT_STATE.md`](docs/PROJECT_STATE.md)
2. [`docs/MVP.md`](docs/MVP.md)
3. [`docs/DECISIONS.md`](docs/DECISIONS.md)
4. [`docs/TECHNOLOGY_STRATEGY.md`](docs/TECHNOLOGY_STRATEGY.md)
5. the relevant existing code, tests, and example contract
6. supporting long-term documents only as needed

Confirm all of the following before implementation:

- the active phase;
- the active backlog item;
- its dependencies;
- included and excluded work;
- acceptance criteria;
- verification commands;
- owner-approval requirements;
- the required stopping point.

If no backlog item is explicitly active, do not implement product functionality.

## Project intent

Truing is a repository-native interface contract and evidence system.

Preserve the distinction between:

- deterministic proof;
- derived deterministic proof;
- heuristic signals;
- reference-relative change;
- model-assisted critique;
- human judgment.

A lower-authority result must not silently satisfy a higher-authority requirement.

## Current phase

The repository is in **Phase 0: planning and owner approval**.

Product implementation is blocked until the owner accepts or replaces decision `D-006` and explicitly activates backlog item B1.

Planning changes may improve scope, decisions, assumptions, risks, acceptance criteria, verification, or agent controls. They must not introduce product functionality.

## Scope classes

### Required implementation

Required implementation is only the behavior explicitly listed in the active backlog item and phase acceptance criteria.

An agent must implement all required behavior needed for those criteria and must not omit required negative tests, failure states, evidence, or documentation merely to reduce effort.

### Reasonable implementation details

An agent may decide ordinary local details when they do not change product behavior or cross a documented boundary. Examples include:

- private function names;
- file-local helper structure;
- test organization;
- narrowly scoped error-handling details;
- small type definitions required by the active task;
- comments explaining non-obvious behavior;
- deterministic fixture values;
- a minimal dependency already anticipated by the active phase.

Reasonable details must remain local to the active task. They do not authorize a framework, package, abstraction, refactor, assertion, backend, feature, native language, FFI boundary, or build tool not required by acceptance criteria.

### Changes requiring explicit owner approval

Stop and request owner direction before:

- changing the active release boundary;
- starting a backlog item out of order;
- adding an assertion type not listed for IR-1;
- adding a viewport, browser, analyzer, external target, or workflow class;
- changing the Lightpanda/Playwright authority boundary;
- adding automatic fallback between browser backends;
- creating a generic browser-provider or plugin abstraction;
- adding hosted infrastructure, databases, dashboards, queues, services, or telemetry;
- implementing LLM contract generation, workflow generation, or repair;
- weakening validation or acceptance criteria to make a run pass;
- treating an example field as executable without adding it to the active plan;
- changing public contract semantics outside the active task;
- introducing authentication, secrets, or external side effects;
- changing package manager, primary language, runtime baseline, or repository layout substantially;
- adding Rust, Zig, C, WebAssembly, FFI, Node-API, or native build tooling;
- adding Clay as an executable dependency;
- embedding, forking, or linking directly against Lightpanda;
- changing the license or publishing packages;
- performing broad refactors or dependency upgrades unrelated to the active task;
- changing a documented open question into an implementation assumption.

Record the proposed decision in `docs/DECISIONS.md` before proceeding. A native proposal must also satisfy a trigger and bounded-spike requirement from `docs/TECHNOLOGY_STRATEGY.md`.

## Engineering constraints

- Continue using Node.js 20+ and TypeScript for IR-1.
- Follow `D-012`: Clay is architectural grounding, not an IR-1 executable dependency.
- Do not claim a native performance benefit without a representative benchmark or accepted product requirement.
- Keep the core local-first and usable without a hosted service.
- Do not add a universal design score.
- Do not let AI-generated findings satisfy required human review.
- Routine verification must not require an LLM.
- Prefer adapters for existing tools over reimplementing browsers or analyzers.
- Lightpanda evidence is nonvisual; it cannot satisfy geometry or rendering assertions.
- Playwright or another full browser is required for layout and visual evidence.
- Keep backend implementations specific until real duplication justifies extraction.
- Preserve provenance for contracts, workflows, observations, findings, evidence, and receipts.
- New assertion work is prohibited unless the assertion is listed in the active release and backlog item.
- Preserve backward compatibility unless the active plan explicitly authorizes a breaking change.
- Do not opportunistically rewrite unrelated code, docs, tests, or examples.
- Do not build future-phase scaffolding while completing a current phase.

## Work protocol

For each implementation session:

1. State the active backlog item and acceptance criteria.
2. Inspect the exact files relevant to that item.
3. Identify any unresolved decision before writing code.
4. Make the smallest coherent change that advances the item.
5. Add or update tests proving required positive and negative behavior.
6. Run the repository checks and the active phase's verification.
7. Compare the result against every acceptance criterion.
8. Update planning or decisions only when the work changes a recorded fact, assumption, risk, or boundary.
9. Report what changed, what was verified, what remains, and any limitation.
10. Stop when the active acceptance criteria are satisfied.

Do not continue into the next backlog item during the same session unless the owner explicitly activates it.

## Required verification

Always run the checks relevant to the changed files. The current baseline is:

```bash
npm install
npm run check
npm run build
npm run contract:check -- examples
```

When a lockfile and reproducible install are added under the active plan, use the updated documented command instead of preserving `npm install` by habit.

Each implementation phase defines additional commands and evidence in [`docs/MVP.md`](docs/MVP.md). Those checks are required when that phase becomes active.

A check that could not run must be reported as `not_run`, `blocked`, or `failed_to_initialize` with the reason. It must not be described as passing.

## Completion report format

Every coding-agent completion report must include:

1. **Active item** — phase and backlog ID.
2. **Changed** — files and observable behavior.
3. **Verified** — exact commands and results.
4. **Acceptance** — each criterion and whether it is satisfied.
5. **Remaining** — unfinished work inside the active item.
6. **Limitations** — checks or environments not run.
7. **Decisions** — new or changed entries in `docs/DECISIONS.md`.
8. **Stop** — why work stopped and whether owner direction is required.

Do not claim the project, phase, or release is complete when only the current task is complete.

## Stop conditions

Stop immediately when:

- the active acceptance criteria are satisfied;
- the next change belongs to another backlog item or phase;
- a required decision is open;
- the change would cross the required/conditional/deferred scope boundary;
- verification exposes a product ambiguity not resolved by the active plan;
- a backend cannot honestly prove the assigned assertion;
- a proposed shortcut would weaken evidence, validation, or authority boundaries;
- a language or native-integration proposal lacks a documented trigger and owner-approved spike;
- unrelated repository problems are discovered.

Report unrelated problems without fixing them unless they block the active acceptance criteria.

## Documentation rule

Do not silently encode product decisions only in code.

Update the appropriate document when changing:

- active scope or phase;
- contract semantics;
- browser authority or routing;
- receipt or evidence meaning;
- technology or language strategy;
- accepted assumptions;
- known risks;
- owner approval requirements.

Keep documentation lightweight. Do not create new process files when `MVP.md`, `PROJECT_STATE.md`, `DECISIONS.md`, or `TECHNOLOGY_STRATEGY.md` can hold the information cleanly.
