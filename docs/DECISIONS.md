# Decisions, assumptions, questions, and risks

**Status:** active planning record  
**Owner:** repository owner  
**Change rule:** accepted decisions may be changed only by an explicit repository update that records the reason.

## How to use this file

Use short entries. Do not create an ADR for every implementation detail.

Each entry has one of these states:

- `accepted` — agents may rely on it;
- `proposed` — implementation must not rely on it until owner approval;
- `rejected` — do not reintroduce without new evidence and owner approval;
- `open` — unresolved; preserve the uncertainty;
- `superseded` — retained for history but no longer controlling.

When a coding task exposes a product or scope decision not covered here, stop the task at the boundary and add an `open` entry or request owner direction.

---

## Accepted decisions

### D-001 — Product responsibility

**State:** accepted  
**Decision:** Truing owns interface contracts, execution evidence, findings, reconciliation records, and receipts. It composes browser and analysis tools rather than replacing them.

**Reason:** This is the stable product thesis across the repository.

### D-002 — Repository-native and local-first core

**State:** accepted  
**Decision:** The initial core must run locally and store its durable definitions and outputs in repository-readable formats. A hosted service is not required for the initial release.

### D-003 — Authority boundaries

**State:** accepted  
**Decision:** Deterministic, derived deterministic, heuristic, reference-relative, model-assisted, and human results remain distinguishable. A lower-authority result cannot silently satisfy a higher-authority requirement.

### D-004 — Model role

**State:** accepted  
**Decision:** An LLM may propose contracts, browser workflows, explanations, or repairs. It may not approve its own proposal, weaken requirements to create a pass, satisfy human review, or be required for routine verification.

### D-005 — Browser evidence lanes

**State:** accepted  
**Decision:**

- use plain HTTP or an existing API when no browser is required;
- use Lightpanda/PandaScript for qualified nonvisual JavaScript and DOM evidence;
- use Playwright or another full browser for rendering, screenshots, geometry, responsive behavior, and compatibility;
- use live agent browsing for exploration, not routine replay.

Every observation must identify the backend that produced it and the limits of that backend's authority.

### D-007 — Existing implementation language

**State:** accepted for the initial release  
**Decision:** Continue using the existing Node.js and TypeScript workspace for IR-1 unless a phase uncovers a concrete blocker.

**Reason:** The contract core and CLI already exist in this stack. Changing it before the first vertical proof would add migration cost without validated benefit.

**Detail:** See [`TECHNOLOGY_STRATEGY.md`](TECHNOLOGY_STRATEGY.md).

### D-008 — No premature generalized browser abstraction

**State:** accepted  
**Decision:** Lightpanda and Playwright implementations remain backend-specific until real duplicated behavior justifies extraction. Shared policy or evidence utilities may be introduced only when required by an active phase.

### D-009 — Examples are not executable specifications by default

**State:** accepted  
**Decision:** Fields in `examples/` do not become implemented requirements merely because the permissive schema accepts them. A field becomes executable only when the active release plan names it, validates it, and provides acceptance tests.

### D-012 — Native language and Clay strategy

**State:** accepted for IR-1  
**Decision:**

- keep TypeScript as the IR-1 implementation and orchestration language;
- treat Clay as architectural grounding, not an IR-1 executable dependency;
- do not add C, Zig, Rust, WebAssembly, FFI, Node-API, or native build tooling during IR-1 without a separate accepted task;
- prefer Rust for a future general-purpose native Truing core;
- prefer Zig when direct Clay or Lightpanda systems integration is the dominant requirement;
- use C only for a tightly bounded Clay-specific module rather than the full project;
- prefer a WebAssembly module or standalone native process before an in-process native addon;
- require measured or accepted product evidence before a native spike or migration.

**Reason:** IR-1 is dominated by structured data, browser orchestration, process coordination, and receipt generation. No native performance bottleneck or direct Clay layout requirement has been demonstrated.

**Revisit only when:** one of the triggers in [`TECHNOLOGY_STRATEGY.md`](TECHNOLOGY_STRATEGY.md) is supported by evidence and the owner approves a bounded plan.

---

## Proposed decisions requiring owner approval

### D-006 — Initial release boundary

**State:** proposed — owner approval required before implementation  
**Proposal:** Define IR-1 as a local dual-lane contract-to-receipt proof with:

- one bundled local UI fixture derived from the Switchyard header and mobile-menu failures;
- one approved contract;
- one passing fixture state and one deliberately failing state;
- Lightpanda for `accessibility.accessible_name` and `interaction.disclosure` evidence;
- Playwright/Chromium for `layout.no_horizontal_overflow` evidence at 320 by 568;
- structured findings;
- one JSON receipt and one Markdown receipt;
- deterministic exit status;
- zero LLM calls during verification.

**Why proposed:** This is the smallest release that proves the product's contract, authority, routing, token-efficiency, and receipt ideas together without attempting the full Switchyard audit.

**Alternatives:**

1. **Playwright-only first release** — simpler dependency surface and stronger direct connection to visual intent, but it does not prove the Lightpanda routing strategy.
2. **Lightpanda-only first release** — proves model-free replay cheaply, but risks looking like generic browser automation rather than interface-intent verification.
3. **Full Switchyard pilot** — strongest external proof, but too broad for the first implementation cycle.

**Owner action:** change `State` to `accepted`, select an alternative, or narrow the proposal before backlog item B1 begins.

### D-010 — Initial release audience

**State:** proposed  
**Proposal:** Treat IR-1 as a maintainer/developer proof rather than a stable public API release.

**Implication:** CLI names and schemas may remain `v0alpha1`, but documented behavior and receipts must still be deterministic and testable.

### D-011 — Reproducible npm installation

**State:** proposed  
**Proposal:** Commit an npm lockfile during the first implementation phase and change CI to `npm ci` once dependencies for IR-1 are finalized.

**Reason:** Current CI passes, but dependency resolution is not reproducible.

---

## Rejected alternatives

### R-ALT-001 — Build the full platform before a vertical proof

**State:** rejected  
**Rejected scope:** hosted review, plugin SDK, organization policy, multi-user history, managed browser matrices, broad design-system integrations, and generic provider frameworks before IR-1.

**Reason:** These do not prove the core contract-to-receipt value and would obscure completion.

### R-ALT-002 — Use an LLM on every verification run

**State:** rejected  
**Reason:** It defeats deterministic replay, token efficiency, reproducibility, and the authority boundary.

### R-ALT-003 — Treat screenshot similarity as interface correctness

**State:** rejected  
**Reason:** Visual difference is evidence, not proof of preserved product intent.

### R-ALT-004 — Make the initial contract schema model every documented future concept

**State:** rejected  
**Reason:** The schema should validate only semantics implemented and exercised by the active release.

### R-ALT-005 — Rewrite IR-1 in C, Zig, or Rust because Clay is written in C

**State:** rejected for IR-1  
**Reason:** Clay currently supplies a design method, not a required runtime capability. Rewriting would add toolchain, packaging, FFI, and browser-integration cost without solving a measured bottleneck or accepted product requirement.

**May be reconsidered when:** a trigger in `TECHNOLOGY_STRATEGY.md` is demonstrated and a bounded owner-approved spike is defined.

---

## Assumptions

### A-001 — A local fixture is sufficient for the first execution proof

**State:** open assumption  
**Assumption:** A fixture modeled on known Switchyard failures can prove the execution and receipt architecture before integrating the actual Switchyard repository.

**Invalidation signal:** The fixture cannot demonstrate meaningful capability or authority boundaries without extensive simulation.

### A-002 — Lightpanda can support the selected nonvisual checks

**State:** open assumption  
**Assumption:** The supported Lightpanda/PandaScript version can expose accessible names or sufficient DOM attributes, disclosure state, keyboard interaction required by the selected checks, and structured completion output.

**Invalidation signal:** Required APIs are unavailable or behavior differs enough that Playwright is the only honest backend.

### A-003 — Two browser backends remain manageable in a bounded release

**State:** open assumption  
**Assumption:** The dual-lane proof can be implemented without creating a generalized orchestration framework.

**Invalidation signal:** Backend coordination dominates the work or forces abstractions not justified by the three assertions.

### A-004 — The current contract package can evolve compatibly

**State:** open assumption  
**Assumption:** The current permissive `v0alpha1` format can gain strict validation for the IR-1 subset without invalidating the two existing examples.

### A-005 — CI can install and execute required browser tooling

**State:** open assumption  
**Assumption:** GitHub Actions can install or access the chosen Lightpanda binary and Playwright Chromium within acceptable time and reliability bounds.

---

## Open questions

### Q-001 — Which exact Lightpanda release is supported?

**State:** open — owner or implementation evidence required  
**Needed before:** Lightpanda implementation phase.

Record:

- exact version;
- installation instructions for supported environments;
- checksum or provenance expectations;
- CI availability;
- supported PandaScript APIs;
- fallback behavior when unavailable.

### Q-002 — What is the minimum receipt schema?

**State:** open  
**Needed before:** findings and receipt implementation.

The active plan proposes a minimal set, but field names and storage paths must be tested before being treated as stable.

### Q-003 — How is contract approval represented?

**State:** open  
**Needed before:** external contract-authoring workflow, not required to execute the bundled IR-1 contract.

Possible answers include a committed fingerprint, review metadata, signed record, or repository policy. Do not implement one during IR-1 unless the release requires it.

### Q-004 — Which operating systems must IR-1 support?

**State:** open  
**Needed before:** release claim.

CI proves Linux. Local macOS support is desirable but not yet an accepted requirement. Windows support is undefined.

### Q-005 — Is the project intended to select an open-source license before IR-1?

**State:** open — owner decision required  
**Current condition:** source is public but no reuse rights are granted.

### Q-006 — Should the real Switchyard repository be the first post-IR-1 integration?

**State:** open but strongly supported by current evidence  
**Default:** yes, unless IR-1 invalidates the current model.

### Q-007 — Does Truing need a native core after IR-1?

**State:** open; no native work authorized  
**Default:** no, until evidence demonstrates otherwise.

Revisit only with:

- a measured compute or memory bottleneck;
- an accepted single-binary distribution requirement;
- an accepted feature requiring Truing-owned layout computation;
- a demonstrated need for direct Lightpanda embedding;
- a large-scale evidence-processing requirement;
- or a documented hardened native security boundary.

A proposal must compare a native approach against optimizing or packaging the existing TypeScript implementation.

---

## Risks

### R-001 — Contract maintenance exceeds verification value

**Risk:** Contracts become detailed mirrors of implementation and create more work than they save.

**Control:** IR-1 supports only three durable assertions and rejects implementation-specific expansion.

### R-002 — Truing becomes a browser orchestration framework

**Risk:** Backend management displaces the product's intent and evidence value.

**Control:** backend-specific implementations, tiny assertion set, no generic provider API in IR-1.

### R-003 — Lightpanda limitations force dishonest claims

**Risk:** Nonvisual evidence is treated as rendered-browser proof.

**Control:** assertion/backend compatibility is explicit and enforced; Playwright is required for layout.

### R-004 — Permissive schema creates false confidence

**Risk:** Contracts appear valid even when most semantics are ignored.

**Control:** IR-1 must distinguish envelope validation from executable-subset validation and fail on unsupported active semantics.

### R-005 — Planning documents become stale or burdensome

**Risk:** Future agents update code but not the active plan, or planning becomes excessive ceremony.

**Control:** keep one active plan and one compact log; update only when scope, acceptance, assumptions, or decisions change.

### R-006 — Initial release becomes the full Switchyard audit

**Risk:** breakpoint matrices, hostile content, exceptions, accessibility engines, and real-site integration enter IR-1 silently.

**Control:** those items are deferred in `MVP.md` and require a scope proposal plus owner approval.

### R-007 — Premature native rewrite obscures product validation

**Risk:** C, Zig, Rust, WebAssembly, or FFI work consumes the first release before Truing proves contract-to-receipt value.

**Control:** TypeScript is fixed for IR-1; native work requires a documented trigger, benchmark or accepted requirement, bounded spike, plan update, and owner approval.
