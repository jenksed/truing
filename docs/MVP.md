# Initial release plan: IR-1

**Name:** local dual-lane contract-to-receipt proof  
**Status:** proposed; implementation blocked pending owner approval of `D-006`  
**Active phase:** Phase 0 — planning and approval  
**Last reviewed:** July 26, 2026  
**Decision log:** [`DECISIONS.md`](DECISIONS.md)  
**Repository assessment:** [`PROJECT_STATE.md`](PROJECT_STATE.md)

## Authority and change control

This is the only active implementation plan for the initial release.

Long-term capabilities described in the README, product definition, architecture, browser strategy, validation case study, or example contracts do not enter IR-1 unless listed under **Required for IR-1** below.

To add scope:

1. add a proposed decision or scope item to [`DECISIONS.md`](DECISIONS.md);
2. state why the current acceptance criteria cannot be met without it;
3. identify the phase, verification, cost, and new risk;
4. obtain owner approval;
5. update this plan before implementation.

Agents may not silently expand the release because a capability appears useful, natural, adjacent, or already mentioned elsewhere.

---

## Product definition for IR-1

### Problem

High-quality interface verification performed by coding agents often disappears into terminal transcripts, temporary screenshots, and session-specific reasoning. Future agents repeat the inspection, spend more tokens rediscovering project intent, and may reach different completion judgments.

Existing browser tools can execute checks, but they do not preserve one approved statement of what must remain true, which backend is qualified to prove it, what evidence was produced, and whether the result permits delivery.

### Intended users

The initial release is for:

- maintainers experimenting with Truing itself;
- frontend engineers using coding agents and browser automation;
- technical project or delivery leads who need a reproducible completion record;
- contributors evaluating whether the contract-to-receipt model is viable.

IR-1 is not yet a stable end-user product or supported public API.

### Primary use case

A maintainer runs one command against a bundled local interface fixture and an approved contract.

Truing:

1. validates the executable contract subset;
2. routes nonvisual checks to Lightpanda/PandaScript;
3. routes rendered layout checks to Playwright/Chromium;
4. evaluates three deterministic assertions;
5. records backend coverage and evidence;
6. emits JSON and Markdown receipts;
7. exits successfully only when required assertions pass.

No LLM is used during verification.

### Desired outcome

A passing run provides a compact, reproducible answer to:

> What was verified, by which qualified execution backend, against which contract and fixture revision, with what result?

A failing run identifies the assertion, observation, backend, evidence, and failure class without requiring an agent to reinterpret a long browser transcript.

### Core value proposition

Truing converts valuable browser reasoning into project-owned, model-free verification infrastructure.

IR-1 proves four claims together:

- **intent is explicit:** the required truths exist in a versioned contract;
- **evidence authority is explicit:** Lightpanda and Playwright prove different kinds of facts;
- **routine replay is token-efficient:** passing verification uses zero LLM tokens;
- **completion is inspectable:** findings and coverage produce a durable receipt.

### Explicit non-goals

IR-1 will not:

- inspect or modify the real Switchyard repository;
- reproduce the full Switchyard width matrix;
- generate contracts or workflows with an LLM;
- support arbitrary user-written assertions;
- implement breakpoint-neighborhood generation;
- implement hostile-content generators;
- run axe-core, Lighthouse, WebKit, real devices, or multiple graphical browsers;
- implement human-review workflows or governed exception approval;
- implement visual regression baselines;
- implement a hosted service, dashboard, database, or organization policy;
- expose a general plugin SDK;
- define a generic browser-provider abstraction;
- promise API or schema stability beyond `v0alpha1`;
- select an open-source license;
- implement Voilà integration.

### Smallest coherent version worth delivering

IR-1 is complete when a clean checkout can run a documented command that executes one passing and one failing local fixture case through both qualified browser lanes and produces deterministic, validated receipts.

The release must prove actual contract-to-receipt behavior. A contract validator alone is not sufficient, and a browser script without contract identity and receipts is not sufficient.

---

## Release scenario

### Bundled fixture

Create one local JavaScript-driven fixture modeled on the Switchyard header and mobile-menu audit.

It must expose two deterministic modes:

- `passing` — no page overflow, named theme control, disclosure state updates correctly;
- `failing` — 320-pixel page overflow, unnamed theme control, or broken disclosure state.

The fixture exists only to prove Truing. It must not become a reusable demo framework or a copy of the Switchyard site.

### Required viewports

IR-1 supports exactly:

- `phone-narrow`: 320 by 568;
- `desktop`: 1024 by 768 only if required to establish or reset fixture state.

Only `phone-narrow` is required for the layout assertion. Additional viewports require owner-approved scope change.

### Required assertions

IR-1 implements exactly three assertion types:

1. `layout.no_horizontal_overflow`
   - backend: Playwright/Chromium only;
   - observation: document client width and scroll width;
   - pass condition: `scrollWidth <= clientWidth`.

2. `accessibility.accessible_name`
   - backend: Lightpanda/PandaScript preferred;
   - Playwright may be used only if Lightpanda cannot honestly provide the required DOM evidence and `D-006` is amended;
   - observation: configured target has a non-empty accessible name or explicitly accepted DOM naming source defined by the executable subset.

3. `interaction.disclosure`
   - backend: Lightpanda/PandaScript preferred;
   - observation: trigger controls the configured region and opening the disclosure changes the declared state;
   - required behavior is limited to the supported local fixture interaction.

No additional assertion family may be added to IR-1 without owner approval.

### Required outputs

Each run produces:

- `receipt.json` validated against the IR-1 receipt type;
- `receipt.md` generated from the same structured result;
- structured observations for each assertion;
- a screenshot for the Playwright overflow scenario;
- bounded and redacted backend logs;
- deterministic process exit status.

The exact output directory is decided in Phase 1 and recorded in `DECISIONS.md` before implementation relies on it.

### Minimum receipt content

The receipt must include:

- receipt schema version;
- run ID;
- start and end timestamps;
- repository or fixture revision when available;
- contract path and SHA-256 fingerprint;
- fixture mode;
- scenario and viewport;
- execution backend and exact version per observation;
- assertion ID, type, severity, status, and measured values;
- evidence paths and hashes;
- backend coverage state;
- final release decision;
- failure classification when applicable.

Do not add reviewer, exception, hosted URL, billing, organization, model, or historical trend fields during IR-1.

---

## Scope boundary

## Required for IR-1

- strict validation of the contract fields used by IR-1;
- a clear distinction between minimally valid legacy examples and executable IR-1 contracts;
- one bundled local fixture with passing and failing modes;
- one accepted PandaScript and manifest for the fixture;
- one Playwright scenario for the fixture;
- exact Lightpanda and Chromium version reporting;
- the three required assertion implementations;
- backend-to-assertion compatibility enforcement;
- structured observation and finding types;
- minimal evidence hashing and storage;
- JSON and Markdown receipts;
- deterministic CLI exit behavior;
- unit tests and end-to-end tests for both fixture modes;
- one documented verification command;
- CI coverage or an explicitly documented CI limitation if Lightpanda cannot run there;
- a committed npm lockfile before release completion.

## Permitted only if required by IR-1

These may be introduced only when an active phase demonstrates they are necessary for its acceptance criteria:

- a small local fixture server;
- a process-execution helper with timeout and output bounds;
- a minimal shared type package or module used by both runners;
- temporary-directory and hashing utilities;
- a JSON schema validator for receipt output;
- one configuration field needed to identify the fixture mode;
- one narrow fallback from Lightpanda to Playwright, but only after recording the Lightpanda limitation and obtaining owner approval;
- a platform-specific install helper for the pinned Lightpanda binary;
- CI caching required to keep verified runs practical.

Permission is not automatic. The implementing agent must state which acceptance criterion requires the addition.

## Deferred or explicitly out of scope

- real Switchyard integration;
- contract discovery from arbitrary repositories;
- generated contract proposals;
- generated PandaScript or Playwright code;
- browser-workflow repair by an LLM;
- breakpoint probes or width matrices;
- content profiles or fuzzing;
- capability-preservation assertions;
- visual-diff baselines;
- axe-core and Lighthouse;
- WebKit, Firefox, Safari, Android, iOS, or real devices;
- authentication and secrets beyond proving policy rejection;
- external side-effecting browser workflows;
- human review, approval UI, or exception governance;
- reconciliation beyond pass/fail rerun evidence;
- persistent databases;
- hosted reports;
- multi-project orchestration;
- organization policy;
- plugin systems;
- public package publication;
- license selection;
- token metering beyond proving zero model calls in routine verification.

Anything in this section requires a later release plan.

---

## Delivery phases

## Phase 0 — Planning and owner approval

### Objective

Establish one accepted release boundary before product code changes.

### Included work

- repository audit;
- active plan;
- decision, assumption, question, and risk log;
- agent instructions;
- bounded backlog;
- owner decision on `D-006`.

### Excluded work

- schema changes;
- new packages;
- browser dependencies;
- fixture implementation;
- product functionality.

### Dependencies

None.

### Expected repository changes

- `docs/PROJECT_STATE.md`;
- `docs/DECISIONS.md`;
- rewritten `docs/MVP.md`;
- updated `AGENTS.md` and `CONTRIBUTING.md`.

### Acceptance criteria

- one active release is identifiable;
- required, conditional, and deferred scope are explicit;
- every delivery phase has a stopping point;
- the backlog contains only IR-1 work;
- decisions requiring owner direction are visible;
- agents are prohibited from implementation until approval.

### Verification

```bash
npm install
npm run check
npm run build
npm run contract:check -- examples
```

Evidence:

- documentation diff;
- green CI;
- owner approval or revision of `D-006`.

### Completion condition

Phase 0 is complete only when the owner accepts the IR-1 boundary and marks backlog item B1 active.

### Stop point

Stop after planning changes and CI verification. Do not begin B1 in the same session unless the owner explicitly requests implementation after reviewing the plan.

---

## Phase 1 — Freeze the executable contract subset

### Objective

Make the exact IR-1 contract semantics machine-valid before browser execution.

### Included work

- document the executable subset;
- add strict schema/types for the fields required by IR-1;
- validate assertion/backend compatibility;
- validate fixture mode and viewport references;
- distinguish unsupported executable semantics from harmless illustrative fields;
- add positive and negative contract tests;
- add one IR-1 example contract.

### Excluded work

- browser execution;
- receipt generation;
- broad schema coverage for existing rich examples;
- new assertion families;
- LLM authoring.

### Dependencies

- accepted `D-006`;
- resolution of whether the IR-1 contract uses a new explicit execution profile or a narrow extension of `InterfaceContract`.

### Expected repository changes

Expected, not mandatory filenames:

- `packages/contract/src/`;
- `packages/contract/test/`;
- `schemas/`;
- `examples/local-ui-proof/`;
- CLI error reporting only if necessary to expose strict validation.

Do not create a new package unless the existing contract package cannot own the semantics cleanly.

### Acceptance criteria

- the IR-1 example validates;
- duplicate IDs and invalid references fail clearly;
- an unsupported assertion/backend pairing fails before execution;
- unknown rich fields cannot accidentally claim executable support;
- normalization and fingerprints remain deterministic;
- existing examples still pass envelope validation or are explicitly labeled illustrative without being broken silently.

### Verification

Planned commands:

```bash
npm run check
npm run build
npm run contract:check -- examples
npm test --workspace @truing/contract
```

Required evidence:

- tests for the accepted subset;
- tests for unsupported assertions and invalid backend routing;
- before/after contract fingerprints where semantics intentionally change.

### Completion condition

The executable contract can be understood and validated without browser code.

### Stop point

Stop before adding Playwright, Lightpanda, fixture servers, or receipt packages.

---

## Phase 2 — Playwright overflow vertical slice

### Objective

Prove one complete contract-to-observation-to-finding path using rendered evidence.

### Included work

- the smallest local fixture needed for passing and failing overflow states;
- local deterministic serving mechanism;
- Playwright/Chromium execution at 320 by 568;
- `layout.no_horizontal_overflow` observation and evaluation;
- one screenshot per run or failure, as decided in Phase 1;
- structured finding output;
- temporary receipt skeleton sufficient to inspect the run;
- CLI command for this one contract.

### Excluded work

- Lightpanda;
- accessible-name and disclosure assertions;
- breakpoint matrices;
- actual Switchyard code;
- generic runner abstraction;
- polished Markdown report.

### Dependencies

- Phase 1 complete;
- exact Playwright dependency and browser-install approach recorded;
- local fixture mechanism documented.

### Expected repository changes

Potential areas:

- fixture under `fixtures/` or `examples/local-ui-proof/fixture/`;
- one Playwright runner package or module;
- assertion and observation modules;
- CLI `verify` command;
- end-to-end tests.

### Acceptance criteria

- passing fixture reports measured width values and passes;
- failing fixture reports measured overflow and fails;
- the screenshot is associated with the finding;
- the backend and Chromium version are recorded;
- the command exits `0` for pass and non-zero for fail;
- rerunning the same fixture does not change normalized finding content except allowed run metadata;
- no LLM is invoked.

### Verification

The phase must add and document one command equivalent to:

```bash
npm run verify:fixture -- --backend playwright --mode passing
npm run verify:fixture -- --backend playwright --mode failing
```

The exact command may differ, but both modes must be automated in tests or CI.

### Completion condition

One rendered assertion travels from approved contract to reproducible finding and evidence.

### Stop point

Stop before adding Lightpanda or generalizing the runner interface.

---

## Phase 3 — Lightpanda nonvisual vertical slice

### Objective

Prove model-free nonvisual replay for the remaining two assertions.

### Included work

- pin and verify one supported external Lightpanda version;
- one repository-owned PandaScript;
- one declarative workflow manifest;
- path, origin, side-effect, timeout, output, and secret-name policy required by the local fixture;
- `accessibility.accessible_name` observation and finding;
- `interaction.disclosure` observation and finding;
- structured completion result and postcondition validation;
- explicit failure classifications;
- ten-repeat consistency test.

### Excluded work

- remote sites;
- authentication;
- external side effects;
- script generation or repair;
- generic workflow language;
- visual claims;
- automatic Playwright fallback.

### Dependencies

- Phase 1 complete;
- Phase 2 may be complete but no common abstraction is required;
- `Q-001`, `A-002`, and `A-005` resolved with evidence.

### Expected repository changes

Potential areas:

- `automation/browser/` for accepted script and manifest;
- Lightpanda runner module or package;
- policy and result validation;
- local fixture extensions only if required for the two assertions;
- negative tests.

### Acceptance criteria

- passing fixture returns normalized structured results for both assertions;
- failing fixture produces the expected failure classifications;
- invalid path, disallowed origin, timeout, malformed output, and failed postcondition are tested;
- secrets are not required for the fixture and no undeclared environment variables are exposed;
- ten routine replays produce the same normalized result;
- routine replay uses zero LLM calls;
- no result is described as visual evidence.

### Verification

The phase must add commands equivalent to:

```bash
npm run verify:fixture -- --backend lightpanda --mode passing
npm run verify:fixture -- --backend lightpanda --mode failing
npm run test:lightpanda-replay
```

### Completion condition

The two nonvisual assertions execute through a reviewed PandaScript with validated postconditions and honest authority labeling.

### Stop point

Stop before creating cross-backend orchestration abstractions or external workflows.

---

## Phase 4 — Combined findings, evidence, and receipts

### Objective

Combine the three assertion results into one deterministic release decision and durable receipt.

### Included work

- minimal shared run, observation, finding, coverage, and receipt types;
- orchestration of the two accepted backend-specific runners;
- evidence hashing and bounded storage;
- JSON receipt validation;
- Markdown receipt rendering from JSON data;
- final release decision;
- failure and `not_run` coverage representation;
- single user-facing verification command.

### Excluded work

- reconciliation workflows beyond rerun-after-fix;
- approved exceptions;
- human review;
- history, dashboards, databases, or hosted evidence;
- model-generated explanations.

### Dependencies

- Phases 2 and 3 complete;
- `Q-002` resolved for the minimal receipt;
- output path decision recorded.

### Expected repository changes

Potential areas:

- evidence and receipt modules or packages only if existing packages cannot own them cleanly;
- CLI orchestration;
- receipt schemas and fixtures;
- end-to-end tests.

### Acceptance criteria

- one command runs all three assertions through qualified backends;
- the receipt records both backend versions and coverage;
- passing mode produces an allowed delivery decision and exit `0`;
- failing mode produces a blocked delivery decision and non-zero exit;
- JSON validates and Markdown matches its material content;
- evidence paths and hashes resolve;
- a missing backend is `not_run` or initialization failure, never pass;
- raw logs remain bounded and do not dominate the receipt;
- verification uses zero LLM calls.

### Verification

The phase must add a canonical command equivalent to:

```bash
npm run verify:fixture -- --mode passing
npm run verify:fixture -- --mode failing
```

Required evidence:

- validated `receipt.json` for both modes;
- rendered `receipt.md` for both modes;
- end-to-end test assertions over exit codes, findings, coverage, and evidence hashes.

### Completion condition

The complete IR-1 product chain works locally from contract to delivery decision.

### Stop point

Stop before integrating real Switchyard, LLM authoring, new assertions, or human-review features.

---

## Phase 5 — Reproducibility and release gate

### Objective

Make IR-1 repeatable from a clean checkout and close the release without adding features.

### Included work

- committed npm lockfile;
- `npm ci` in CI if approved under `D-011`;
- exact environment and browser prerequisites;
- CI execution of feasible end-to-end checks;
- documented limitation if Lightpanda cannot run in CI;
- clean-checkout instructions;
- final acceptance run;
- update project state and decision records.

### Excluded work

- product expansion;
- refactoring for future releases;
- real Switchyard integration;
- release marketing or package publication.

### Dependencies

- Phase 4 complete;
- owner decisions on release audience and supported environments.

### Expected repository changes

- lockfile;
- CI workflow;
- README or release documentation;
- final updates to `PROJECT_STATE.md`, `DECISIONS.md`, and `AGENTS.md` if needed.

### Acceptance criteria

From a clean checkout on the required environment:

```bash
npm ci
npm run check
npm run build
npm run contract:check -- examples
npm run verify:fixture -- --mode passing
```

must succeed.

The failing fixture command must fail for the expected assertion reasons and still produce a valid blocked receipt.

All IR-1 backlog items are complete, no deferred item was implemented, and known limitations are explicit.

### Completion condition

IR-1 has objective proof, reproducible instructions, and no unresolved release-blocking item.

### Stop point

Declare IR-1 complete. Do not begin the real Switchyard integration without a new approved release plan.

---

## Initial backlog

Only these items belong to IR-1. Work on one item at a time in order unless the plan explicitly marks work parallel-safe.

### B0 — Approve the IR-1 boundary

**Purpose:** authorize one implementation target.  
**Scope:** review `D-006`, this plan, assertion set, fixture boundary, and browser lanes.  
**Dependencies:** none.  
**Acceptance:** owner changes `D-006` to accepted or records an approved replacement.  
**Verification:** repository diff and owner decision.  
**Non-goals:** code or schema changes.  
**Size:** small.  
**Owner input:** required before any implementation.

### B1 — Define and enforce the executable contract subset

**Purpose:** prevent examples from implying unsupported semantics.  
**Scope:** strict IR-1 fields, references, backend compatibility, tests, one local proof contract.  
**Dependencies:** B0.  
**Acceptance:** Phase 1 criteria.  
**Verification:** contract unit tests and repository-wide contract check.  
**Non-goals:** browser execution or receipts.  
**Size:** medium.  
**Owner input:** required only if schema choices change the approved release behavior.

### B2 — Add the minimal local fixture

**Purpose:** provide deterministic pass and fail states independent of Switchyard.  
**Scope:** one fixture, two modes, only elements required by the three assertions.  
**Dependencies:** B1 contract identifiers settled.  
**Acceptance:** fixture states can be started and selected deterministically; no Truing assertions yet.  
**Verification:** fixture-level smoke test.  
**Non-goals:** visual polish, framework extraction, Switchyard duplication.  
**Size:** small.  
**Owner input:** not required unless fixture behavior changes the product proof.

### B3 — Implement the Playwright overflow slice

**Purpose:** prove rendered contract evaluation.  
**Scope:** 320-by-568 execution, width observations, overflow finding, screenshot, exit status.  
**Dependencies:** B1, B2.  
**Acceptance:** Phase 2 criteria.  
**Verification:** automated passing and failing runs.  
**Non-goals:** additional viewports, breakpoint probes, other assertions.  
**Size:** medium.  
**Owner input:** required before adding another browser or assertion.

### B4 — Implement the Lightpanda replay slice

**Purpose:** prove nonvisual, model-free browser replay.  
**Scope:** pinned Lightpanda, script, manifest, policy, accessible-name and disclosure assertions, ten-repeat test.  
**Dependencies:** B1, B2, resolution of `Q-001`.  
**Acceptance:** Phase 3 criteria.  
**Verification:** positive, negative, and repeatability tests.  
**Non-goals:** remote sites, auth, script generation, visual claims.  
**Size:** large relative to IR-1.  
**Owner input:** required if Lightpanda cannot meet the selected checks or requires a distribution decision.

### B5 — Produce combined receipts

**Purpose:** complete the contract-to-delivery-decision chain.  
**Scope:** minimal shared types, evidence hashes, JSON and Markdown receipts, orchestration, final exit decision.  
**Dependencies:** B3, B4, resolution of `Q-002`.  
**Acceptance:** Phase 4 criteria.  
**Verification:** end-to-end passing and failing receipt tests.  
**Non-goals:** history, hosted reports, exception governance, human review.  
**Size:** medium.  
**Owner input:** required only for receipt fields that imply new product policy.

### B6 — Close reproducibility and CI

**Purpose:** make the proof repeatable and declare IR-1 complete.  
**Scope:** lockfile, clean-install path, CI, environment documentation, final evidence.  
**Dependencies:** B5.  
**Acceptance:** Phase 5 criteria.  
**Verification:** clean-checkout command sequence and green CI.  
**Non-goals:** feature work or refactoring for the next release.  
**Size:** small to medium.  
**Owner input:** required for supported-environment and release-audience decisions.

---

## Traceability

| Product outcome | Required behavior | Phase | Backlog | Primary evidence |
| --- | --- | --- | --- | --- |
| Explicit intent | executable contract subset | 1 | B1 | schema and contract tests |
| Rendered proof | horizontal overflow at 320 | 2 | B3 | measurements and screenshot |
| Token-efficient replay | no-model Lightpanda checks | 3 | B4 | ten normalized replays |
| Honest authority | backend compatibility and coverage | 1–4 | B1, B3, B4, B5 | findings and receipt backend fields |
| Durable completion record | JSON and Markdown receipts | 4 | B5 | validated receipt artifacts |
| Reproducible release | clean checkout and CI | 5 | B6 | green release command sequence |

## Recommended first implementation task

After B0 owner approval, begin **B1: define and enforce the executable contract subset**.

The task should end with:

- one approved local proof contract;
- strict validation for only the IR-1 semantics;
- backend compatibility validation for the three assertions;
- positive and negative tests;
- no browser packages or product execution code.

This is the safest first implementation step because every later phase depends on knowing exactly what the contract means, and it can be completed without committing to fixture, runner, receipt, or browser orchestration details prematurely.
