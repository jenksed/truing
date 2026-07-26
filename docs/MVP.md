# Initial release plan: IR-1

**Name:** local dual-lane contract-to-receipt proof  
**Status:** proposed; implementation blocked pending owner approval of `D-006`  
**Active phase:** Phase 0 — planning and approval  
**State and conflicts:** [`PROJECT_STATE.md`](PROJECT_STATE.md)  
**Decisions and uncertainties:** [`DECISIONS.md`](DECISIONS.md)

## Authority

This is the only active implementation plan.

The README, product definition, architecture, browser strategy, validation case study, and examples provide direction and evidence. They do not add work to IR-1 unless this file lists it.

To add scope:

1. record a proposed change in `DECISIONS.md`;
2. identify the acceptance criterion that requires it;
3. state the affected phase, verification, cost, and risk;
4. obtain owner approval;
5. update this plan before implementation.

---

## Product definition

### Problem

Rigorous interface verification often disappears into agent transcripts, temporary screenshots, and session-specific reasoning. Future agents repeat the work, spend tokens rediscovering intent, and may reach different completion judgments.

Browser tools execute checks, but they do not preserve one approved statement of what must remain true, which backend is qualified to prove it, what evidence was produced, and whether delivery is allowed.

### Intended users

IR-1 is for maintainers and technical contributors evaluating Truing's core model. It is not yet a stable public API or supported end-user release.

### Primary use case

A maintainer runs one command against a bundled local fixture and approved contract. Truing:

1. validates the executable contract subset;
2. routes nonvisual checks to Lightpanda/PandaScript;
3. routes rendered layout checks to Playwright/Chromium;
4. evaluates three deterministic assertions;
5. records evidence and backend coverage;
6. emits JSON and Markdown receipts;
7. exits successfully only when required assertions pass.

Verification uses no LLM.

### Desired outcome

A passing run answers:

> What was verified, by which qualified backend, against which contract and fixture state, with what evidence and release decision?

A failing run identifies the assertion, observation, backend, evidence, and failure class without requiring an agent to reinterpret a browser transcript.

### Value proposition

IR-1 proves that Truing can preserve interface intent and browser procedures as model-free project infrastructure with explicit evidence authority and a durable receipt.

### Smallest coherent release

IR-1 is complete when a clean checkout can run one documented command against deterministic passing and failing fixture modes, execute qualified Lightpanda and Playwright checks, and produce validated receipts and exit codes.

A contract validator alone is not enough. A browser script without contract identity and receipts is not enough.

### Non-goals

IR-1 does not include:

- the real Switchyard repository or full audit;
- LLM contract or workflow generation;
- arbitrary assertions, viewports, browsers, or targets;
- breakpoint matrices or content generators;
- axe-core, Lighthouse, WebKit, real devices, or visual baselines;
- human-review or exception-approval workflows;
- hosted services, databases, dashboards, plugins, or organization policy;
- Voilà integration, package publication, or license selection.

---

## Required release behavior

### Fixture

One local JavaScript-driven fixture, modeled on the Switchyard header and mobile-menu failures, exposes two deterministic modes:

- `passing` — no horizontal overflow, named theme control, working disclosure state;
- `failing` — known failure states for the required assertions.

The fixture must contain only what the proof requires. It must not become a demo framework or Switchyard copy.

### Viewport

The only required rendered viewport is:

- `phone-narrow`: 320 by 568.

A desktop viewport may be added only if the fixture cannot initialize deterministically without it.

### Assertions

IR-1 implements exactly:

1. `layout.no_horizontal_overflow`
   - Playwright/Chromium only;
   - pass when `scrollWidth <= clientWidth`.

2. `accessibility.accessible_name`
   - Lightpanda/PandaScript preferred;
   - target must expose the naming source defined by the executable contract subset.

3. `interaction.disclosure`
   - Lightpanda/PandaScript preferred;
   - trigger must control the configured region and update the declared state.

A different backend or another assertion requires owner approval and a plan update.

### Outputs

Each run produces:

- validated `receipt.json`;
- `receipt.md` rendered from the same data;
- structured observations and findings;
- Playwright screenshot evidence;
- bounded, redacted backend logs;
- deterministic exit status.

The receipt contains only:

- schema version and run ID;
- timestamps;
- contract path and fingerprint;
- fixture mode, scenario, and viewport;
- backend and exact version per observation;
- assertion ID, type, severity, status, and measured values;
- evidence paths and hashes;
- backend coverage;
- failure classification where applicable;
- final release decision.

Reviewer, organization, model, history, hosted URL, and exception fields are deferred.

---

## Scope boundary

### Required for IR-1

- strict validation of fields used by IR-1;
- explicit distinction between illustrative examples and executable contracts;
- one local fixture with passing and failing modes;
- one accepted PandaScript and manifest;
- one Playwright scenario;
- exact Lightpanda and Chromium version reporting;
- the three assertion implementations;
- assertion/backend compatibility enforcement;
- structured observations, findings, evidence, and receipts;
- deterministic CLI exit behavior;
- positive, negative, and end-to-end tests;
- one canonical verification command;
- CI coverage or an explicit Lightpanda CI limitation;
- committed npm lockfile before release completion.

### Permitted only when required by an active acceptance criterion

- a small local fixture server;
- process execution with timeout and output bounds;
- small shared types used by both runners;
- temporary-directory and hashing helpers;
- receipt schema validation;
- one fixture-mode field;
- one platform-specific Lightpanda install helper;
- CI caching;
- Playwright fallback for a nonvisual check only after recorded evidence and owner approval.

The implementing agent must name the criterion that requires the addition.

### Deferred

- real Switchyard integration;
- repository discovery or generated contracts;
- generated or repaired browser workflows;
- breakpoint probes, content profiles, fuzzing, or capability preservation;
- visual regression, additional analyzers, browsers, or devices;
- authentication, secrets, remote sites, or external side effects;
- human review, governed exceptions, or reconciliation beyond rerun-after-fix;
- databases, hosted reports, orchestration, plugins, and public publication.

---

## Delivery phases

## Phase 0 — Planning and approval

- **Objective:** establish one accepted release boundary before code changes.
- **Included:** repository audit, active plan, decision log, agent rules, bounded backlog, owner decision on `D-006`.
- **Excluded:** schema, packages, dependencies, fixtures, and product functionality.
- **Dependencies:** none.
- **Expected changes:** planning documents and instructions only.
- **Acceptance:** one active release; explicit scope classes; ordered phases and backlog; visible owner gates; implementation blocked.
- **Verification:** `npm install`, `npm run check`, `npm run build`, `npm run contract:check -- examples`, green CI, owner decision.
- **Complete when:** owner accepts or replaces `D-006` and activates B1.
- **Stop:** do not begin implementation in this planning session.

## Phase 1 — Executable contract subset

- **Objective:** make the exact IR-1 semantics machine-valid before browser work.
- **Included:** strict fields and references, backend compatibility, one local proof contract, positive and negative tests.
- **Excluded:** browser execution, receipts, broad validation of rich existing examples, new assertions.
- **Dependencies:** B0 and decision on how executable contracts are identified.
- **Expected changes:** existing contract package, tests, schema, and one example; no new package unless proven necessary.
- **Acceptance:** valid IR-1 contract passes; invalid references and backend pairings fail clearly; unsupported semantics cannot imply executable support; normalization remains deterministic.
- **Verification:** baseline checks plus contract workspace tests and fingerprint evidence.
- **Complete when:** the contract can be understood and validated without browser code.
- **Stop:** before fixture, runner, or receipt implementation.

## Phase 2 — Playwright overflow slice

- **Objective:** prove one rendered contract-to-finding path.
- **Included:** minimal fixture, deterministic serving, 320-by-568 Chromium run, width observations, overflow finding, screenshot, exit status, temporary structured result.
- **Excluded:** Lightpanda, other assertions, breakpoints, Switchyard, generic runner abstraction.
- **Dependencies:** Phase 1 and documented Playwright/install and fixture decisions.
- **Expected changes:** fixture, one backend-specific runner, observation/assertion code, CLI `verify`, end-to-end tests.
- **Acceptance:** passing fixture passes; failing fixture reports measured overflow and fails; backend version and evidence are recorded; reruns are stable except allowed run metadata; zero LLM calls.
- **Verification:** automated passing and failing commands added by the phase.
- **Complete when:** one rendered assertion reaches reproducible finding and evidence.
- **Stop:** before Lightpanda or cross-backend abstraction.

## Phase 3 — Lightpanda nonvisual slice

- **Objective:** prove reviewed, model-free replay for the two nonvisual assertions.
- **Included:** pinned Lightpanda, PandaScript, manifest, path/origin/timeout/output policy, accessible-name and disclosure findings, structured result, failure classes, ten-repeat test.
- **Excluded:** remote sites, auth, secrets, side effects, script generation, visual claims, automatic fallback.
- **Dependencies:** Phase 1, fixture from Phase 2, and evidence resolving `Q-001`, `A-002`, and `A-005`.
- **Expected changes:** `automation/browser/`, backend-specific runner, policy/result validation, negative tests.
- **Acceptance:** passing and failing states classify correctly; invalid path, origin, timeout, malformed output, and failed postcondition are tested; ten replays match; zero LLM calls; no visual claim.
- **Verification:** positive, negative, and repeatability commands added by the phase.
- **Complete when:** both nonvisual assertions run through an accepted PandaScript with validated postconditions.
- **Stop:** before generic browser or external workflow support.

## Phase 4 — Combined receipt

- **Objective:** combine three findings into one durable release decision.
- **Included:** minimal shared run/finding/coverage/receipt types, backend orchestration, evidence hashes, JSON validation, Markdown rendering, one CLI command.
- **Excluded:** human review, exceptions, history, hosted reports, model explanation.
- **Dependencies:** Phases 2 and 3 and resolution of `Q-002`.
- **Expected changes:** small evidence/receipt modules, CLI orchestration, schemas, end-to-end tests; new packages only when existing ownership is insufficient.
- **Acceptance:** passing mode exits `0` and allows delivery; failing mode blocks and exits non-zero; receipts agree; evidence resolves; missing backend is not a pass; zero LLM calls.
- **Verification:** canonical passing and failing verification commands with validated receipt artifacts.
- **Complete when:** contract-to-delivery-decision works locally.
- **Stop:** before Switchyard, authoring, new assertions, or review features.

## Phase 5 — Reproducibility and release gate

- **Objective:** prove IR-1 from a clean checkout without feature expansion.
- **Included:** lockfile, `npm ci` if approved, prerequisites, feasible CI end-to-end coverage, documented limitations, final acceptance evidence, state updates.
- **Excluded:** next-release features and future-oriented refactors.
- **Dependencies:** Phase 4 and owner decisions on audience and supported environments.
- **Expected changes:** lockfile, CI, release documentation, final state/decision updates.
- **Acceptance:** clean install and baseline checks pass; passing fixture succeeds; failing fixture blocks with a valid receipt; no deferred scope entered the release.
- **Verification:** documented clean-checkout command sequence and green CI.
- **Complete when:** all backlog items and release-blocking questions are closed.
- **Stop:** declare IR-1 complete; require a new plan for Switchyard integration.

---

## Initial backlog

Work in order, one item at a time.

### B0 — Approve IR-1

- **Purpose:** authorize one implementation target.
- **Scope:** `D-006`, assertion set, fixture, lanes, receipt boundary.
- **Dependencies:** none.
- **Acceptance/verification:** owner records an accepted decision.
- **Non-goals:** code or schema changes.
- **Size:** small.
- **Owner input:** required.

### B1 — Enforce the executable contract subset

- **Purpose:** prevent unsupported example semantics from appearing executable.
- **Scope:** strict IR-1 fields, references, backend compatibility, tests, one proof contract.
- **Dependencies:** B0.
- **Acceptance/verification:** Phase 1 criteria and contract tests.
- **Non-goals:** browsers or receipts.
- **Size:** medium.
- **Owner input:** only if behavior changes the approved release.

### B2 — Add the minimal fixture

- **Purpose:** deterministic pass/fail target independent of Switchyard.
- **Scope:** one fixture, two modes, only required elements.
- **Dependencies:** B1 identifiers settled.
- **Acceptance/verification:** deterministic fixture smoke test.
- **Non-goals:** visual polish, framework extraction, Switchyard duplication.
- **Size:** small.
- **Owner input:** only if the proof changes.

### B3 — Implement Playwright overflow verification

- **Purpose:** prove rendered evidence.
- **Scope:** 320-by-568 run, width observations, finding, screenshot, exit status.
- **Dependencies:** B1, B2.
- **Acceptance/verification:** Phase 2 passing and failing tests.
- **Non-goals:** more viewports, assertions, or browsers.
- **Size:** medium.
- **Owner input:** required before expansion.

### B4 — Implement Lightpanda replay

- **Purpose:** prove nonvisual, model-free verification.
- **Scope:** version pin, script, manifest, policy, two assertions, ten-repeat test.
- **Dependencies:** B1, B2, `Q-001` resolved.
- **Acceptance/verification:** Phase 3 positive, negative, and repeatability tests.
- **Non-goals:** remote sites, auth, generation, visual claims.
- **Size:** large relative to IR-1.
- **Owner input:** required if Lightpanda cannot meet the checks or requires distribution decisions.

### B5 — Produce combined receipts

- **Purpose:** complete the contract-to-decision chain.
- **Scope:** minimal shared types, evidence hashes, JSON/Markdown receipts, orchestration.
- **Dependencies:** B3, B4, `Q-002` resolved.
- **Acceptance/verification:** Phase 4 end-to-end tests.
- **Non-goals:** history, hosted reports, review, exceptions.
- **Size:** medium.
- **Owner input:** only for new policy fields.

### B6 — Close reproducibility and CI

- **Purpose:** make IR-1 repeatable and close the release.
- **Scope:** lockfile, clean install, CI, prerequisites, final evidence.
- **Dependencies:** B5.
- **Acceptance/verification:** Phase 5 clean-checkout sequence and green CI.
- **Non-goals:** features or next-release refactors.
- **Size:** small to medium.
- **Owner input:** required for audience and supported environments.

---

## Traceability

| Outcome | Required behavior | Phase | Backlog | Evidence |
| --- | --- | --- | --- | --- |
| Explicit intent | executable contract subset | 1 | B1 | schema and tests |
| Rendered proof | overflow at 320 | 2 | B3 | measurements and screenshot |
| Token-efficient replay | model-free nonvisual checks | 3 | B4 | ten normalized replays |
| Honest authority | backend compatibility and coverage | 1–4 | B1–B5 | findings and receipts |
| Durable completion record | JSON and Markdown receipts | 4 | B5 | validated artifacts |
| Reproducible release | clean checkout and CI | 5 | B6 | release command sequence |

## Recommended first implementation task

After B0 approval, begin **B1: enforce the executable contract subset**.

Stop with:

- one approved local proof contract;
- strict validation for only IR-1 semantics;
- backend compatibility validation for three assertions;
- positive and negative tests;
- no browser dependencies or execution code.
