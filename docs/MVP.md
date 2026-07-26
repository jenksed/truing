# MVP vertical slice

## Goal

Prove that Truing can transform an existing high-rigor interface audit into durable project infrastructure, then reproduce the important checks with less narrative overhead and stronger authority boundaries.

The MVP must demonstrate value beyond ordinary browser tests and screenshot diffs without attempting to build the entire platform.

## First practical pilot: Switchyard homepage

The first pilot should use the completed Switchyard mobile audit documented in [`VALIDATION_SWITCHYARD.md`](VALIDATION_SWITCHYARD.md).

This target is stronger than an invented demonstration because it already contains:

- known responsive defects;
- a production build;
- a Playwright-compatible execution path;
- representative widths;
- breakpoint-neighborhood probes;
- a mobile-menu interaction state;
- content-resilience risks;
- accessibility observations;
- reduced-motion checks;
- screenshots;
- accepted exceptions;
- unavailable checks and environment limitations.

The existing event-detail example remains the second pilot for dense operational interfaces and critical information hierarchy.

## Product proof

The MVP should prove this complete chain:

```text
existing report and repository
  -> model-assisted contract proposal
  -> human-approved contract
  -> Playwright execution
  -> deterministic observations
  -> findings and coverage ledger
  -> scoped reconciliation
  -> concise evidence-backed receipt
```

## Authoring requirement

Users should not normally hand-write YAML.

For the first pilot, Truing may use a bounded LLM-assisted authoring step to derive a contract proposal from:

- the Switchyard audit report;
- relevant source files;
- existing Playwright work;
- responsive breakpoints;
- screenshots and named evidence where available.

The proposal must include:

- provenance;
- inferred durable rules;
- unresolved questions;
- assumptions;
- proposed exceptions;
- implementation-specific observations that should not become contracts.

The generated proposal is not authoritative until approved. Verification must run against the committed contract and must not require an LLM.

## Required scenarios

1. homepage with typical content;
2. mobile navigation open;
3. receipt with long unbroken identifiers and long destination text;
4. non-normative doubled-content or CSS-zoom stress state.

The event-detail follow-up should retain:

1. delivered with typical content;
2. failed with hostile content;
3. partial or empty diagnostic evidence.

## Required viewport model

### Representative viewports

- 320 by 568;
- 390 by 844;
- 430 by 932;
- 768 by 1024;
- 1024 by 900;
- 812 by 375 landscape.

### Breakpoint-neighborhood probes

- 359, 360, 361;
- 639, 640, 641;
- 1023, 1024, 1025.

The runner should generate neighborhood widths from a breakpoint and offsets rather than requiring each width to be duplicated manually.

## Required truths

### Layout and responsive behavior

- the document has no horizontal page overflow at required viewports and probes;
- breakpoint transitions do not lose required content or labels;
- demo, GitHub, theme, and navigation capabilities remain available across the 1024-pixel transformation;
- long receipt identifiers and destinations wrap without clipping or overlap;
- content stress does not depend on `white-space: nowrap` remaining viable.

### Accessibility and interaction

- critical controls meet the configured minimum target size;
- every interactive control has an accessible name;
- the mobile-menu trigger exposes and updates disclosure state;
- Escape closes the mobile menu;
- reduced-motion preferences disable nonessential motion and smooth scrolling.

### Coverage and authority

- missing axe-core, Lighthouse, browser, or device execution is reported as `not_run` or advisory coverage, never as pass;
- CSS zoom is labeled as a non-normative stress probe rather than browser-zoom conformance;
- deterministic measurements remain visible even when an exception is approved;
- human review is required for responsive density and target-spacing exceptions.

## Required implementation capabilities

### Contract and authoring

- YAML interface contract as the committed intermediate representation;
- model-assisted contract proposal artifact with provenance;
- schema validation, normalization, and fingerprinting;
- semantic region and capability definitions;
- generated breakpoint-neighborhood probes;
- deterministic content profiles;
- proposed and approved exception records.

### Execution and observation

- Playwright scenario execution;
- document width and overflow observations;
- element bounding boxes;
- visible and accessible names;
- disclosure state and keyboard interaction;
- screenshot and trace capture;
- analyzer coverage state.

### Assertions

The first assertion set should remain narrow:

- `layout.no_horizontal_overflow`;
- `layout.no_overlap`;
- `content.not_clipped`;
- `content.wraps_without_clipping`;
- `responsive.breakpoint_stability`;
- `responsive.capability_preserved`;
- `accessibility.minimum_target_size`;
- `accessibility.accessible_name`;
- `accessibility.reduced_motion`;
- `interaction.disclosure`.

### Evidence and completion

- addressable evidence manifest;
- explicit `pass`, `fail`, `changed`, `not_run`, `blocked`, `requires_review`, and `accepted_exception` states;
- Markdown and JSON receipts;
- static evidence report;
- manual review record;
- reconciliation record;
- CI exit policy.

## Known-defect reproduction

The MVP should deliberately reintroduce or fixture the known Switchyard failures so the system can prove detection:

1. header actions overflow at 320 pixels;
2. hero copy forced onto one line under content stress;
3. 40 by 40 mobile-menu trigger;
4. unnamed theme controls;
5. long receipt identifier overflow;
6. long destination overlap or cramping.

A finding is not fully reconciled until the relevant scenario reruns successfully or an explicit exception is approved.

## Receipt expectation

The receipt should summarize:

- number of representative viewports and breakpoint probes;
- passed and failed assertions;
- unavailable analyzers and browser coverage;
- approved exceptions;
- required human reviews;
- release decision.

It should not repeat every width measurement in the top-level narrative. Complete measurements remain available as structured evidence.

## MVP exit criteria

- an LLM-generated contract proposal from the Switchyard audit requires only bounded human correction;
- the approved contract is understandable without reading the engine;
- all six known defects can be reproduced and detected;
- responsive capability preservation is verified rather than inferred from element visibility;
- hostile-content scenarios prove the defensive receipt fixes;
- every failure points to reproducible evidence;
- not-run checks cannot be mistaken for passes;
- smaller-target exceptions are scoped without suppressing the target-size assertion;
- visual and contract changes can be reconciled without weakening unrelated requirements;
- human review is recorded with exact scope;
- a JSON receipt can be consumed by CI or Voilà;
- the full deterministic verification workflow runs locally with one documented command.

## Explicit exclusions

The MVP does not require:

- a hosted service;
- general design generation;
- automatic human approval;
- a universal design score;
- broad computer-vision critique;
- full Storybook or Figma integration;
- general-purpose content fuzzing;
- Safari or real-device automation infrastructure;
- organization-wide policy management.
