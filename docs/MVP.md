# MVP vertical slice

## Goal

Prove that Truing can transform an existing high-rigor interface audit into durable project infrastructure, route each browser claim to the correct execution lane, and reproduce the important checks with less narrative overhead and stronger authority boundaries.

The MVP must demonstrate value beyond ordinary browser tests and screenshot diffs without attempting to build the entire platform.

## First practical pilot: Switchyard homepage

The first pilot should use the completed Switchyard mobile audit documented in [`VALIDATION_SWITCHYARD.md`](VALIDATION_SWITCHYARD.md).

This target is stronger than an invented demonstration because it already contains:

- known responsive defects;
- a production build;
- a Playwright-compatible execution path;
- semantic and interaction checks that can exercise a nonvisual browser lane;
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
  → model-assisted contract and workflow proposals
  → human-approved contract and accepted browser procedures
  → execution routing
      → HTTP for non-browser facts
      → Lightpanda/PandaScript for nonvisual structured replay
      → Playwright/full browser for rendering and geometry
  → deterministic observations
  → findings and coverage ledger
  → scoped reconciliation
  → concise evidence-backed receipt
```

## Authoring requirement

Users should not normally hand-write YAML, PandaScripts, or every Playwright scenario.

For the first pilot, Truing may use a bounded LLM-assisted authoring step to derive proposals from:

- the Switchyard audit report;
- relevant source files;
- existing Playwright work;
- responsive breakpoints;
- screenshots and named evidence where available;
- declared browser-routing policy.

The proposal must include:

- provenance;
- inferred durable rules;
- unresolved questions;
- assumptions;
- proposed exceptions;
- proposed execution backend per assertion;
- proposed PandaScript or Playwright procedure where needed;
- implementation-specific observations that should not become contracts.

Generated proposals are not authoritative until approved. Verification must run against committed contracts and accepted repository workflows without requiring an LLM.

## Browser-routing requirement

The MVP must implement and demonstrate this order:

```text
1. Plain HTTP or an existing API
2. Lightpanda PandaScript
3. Playwright or another full browser
4. Live agent browsing
```

The execution planner chooses the lowest-cost path capable of proving a claim honestly.

### Lightpanda/PandaScript is for

- JavaScript-rendered DOM state;
- structured extraction;
- semantic target presence;
- accessible-name checks;
- simple disclosure and form workflows;
- capability reachability where visual placement is not part of the claim;
- repeatable nonvisual smoke workflows;
- JSON-compatible postconditions.

### Playwright/full browser is required for

- screenshots;
- viewport and breakpoint behavior;
- geometry;
- overflow, clipping, overlap, and wrapping;
- touch-target size;
- visual priority;
- rendered reduced-motion behavior;
- browser zoom;
- compatibility claims.

Lightpanda must never satisfy a visual or geometry assertion.

See [`BROWSER_EXECUTION_STRATEGY.md`](BROWSER_EXECUTION_STRATEGY.md) for the full policy.

## Required scenarios

### Lightpanda acceptance fixture

A local JavaScript-driven fixture must:

1. load asynchronously;
2. contain a form or disclosure interaction;
3. accept non-secret test input;
4. update page state after interaction;
5. expose a confirmation value;
6. contain a deliberate failure mode.

The accepted PandaScript must:

- navigate;
- wait;
- fill or interact;
- extract a structured result;
- validate postconditions;
- create a receipt;
- replay ten times with the same normalized result;
- use zero LLM calls during routine replay.

### Switchyard scenarios

1. homepage with typical content;
2. mobile navigation open;
3. receipt with long unbroken identifiers and long destination text;
4. non-normative doubled-content or CSS-zoom stress state.

### Event-detail follow-up

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

The Playwright runner should generate neighborhood widths from a breakpoint and offsets rather than requiring each width to be duplicated manually.

## Required truths

### Layout and responsive behavior

These claims require Playwright or another full browser:

- the document has no horizontal page overflow at required viewports and probes;
- breakpoint transitions do not lose required content or labels;
- demo, GitHub, theme, and navigation capabilities remain visually and operably available across the 1024-pixel transformation;
- long receipt identifiers and destinations wrap without clipping or overlap;
- content stress does not depend on `white-space: nowrap` remaining viable.

### Accessibility and interaction

- every interactive control has an accessible name;
- the mobile-menu trigger exposes and updates disclosure state;
- Escape closes the mobile menu;
- critical controls meet the configured minimum target size;
- reduced-motion preferences disable nonessential motion and smooth scrolling.

Accessible-name and simple disclosure checks may run through Lightpanda or Playwright. Target geometry and rendered reduced-motion behavior require Playwright.

### Coverage and authority

- every assertion declares acceptable execution backends;
- every observation records the backend and exact version that produced it;
- missing Lightpanda, Playwright, axe-core, Lighthouse, browser, or device execution is reported as `not_run`, `blocked`, or `failed_to_initialize`, never as pass;
- CSS zoom is labeled as a non-normative stress probe rather than browser-zoom conformance;
- deterministic measurements remain visible even when an exception is approved;
- human review is required for responsive density and target-spacing exceptions;
- a Lightpanda receipt never supports a visual claim.

## Required implementation capabilities

### Contract and authoring

- YAML interface contract as the committed intermediate representation;
- model-assisted contract proposal artifact with provenance;
- model-assisted browser-workflow proposal artifact;
- schema validation, normalization, and fingerprinting;
- semantic region and capability definitions;
- acceptable execution backends per assertion;
- generated breakpoint-neighborhood probes;
- deterministic content profiles;
- proposed and approved exception records.

### Lightpanda execution

- exact supported Lightpanda version pin and detection;
- external binary invocation without a shell;
- repository-relative PandaScript and manifest paths;
- traversal, absolute-path, and symlink-escape rejection;
- exact origin allowlists;
- side-effect classification;
- manifest-declared `LP_*` secret names only;
- bounded timeout, stdout, stderr, and result size;
- one JSON-compatible completion result;
- explicit result schema and postconditions;
- failure classification;
- immutable browser-run receipt;
- local deterministic fixture;
- ten-replay consistency test.

The first version must not auto-download, bundle, or redistribute Lightpanda.

### Playwright execution and observation

- Playwright scenario execution;
- document width and overflow observations;
- element bounding boxes;
- visible and accessible names;
- disclosure state and keyboard interaction;
- screenshot and trace capture;
- analyzer coverage state;
- browser and version attribution.

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
- `interaction.disclosure`;
- `workflow.postconditions`.

Each assertion declares the observations and execution backends required to evaluate it.

### Evidence and completion

- addressable evidence manifest;
- manifest, script, contract, and result hashes;
- exact execution backend and version;
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

The execution plan should route:

- unnamed theme controls and qualifying disclosure-state checks to Lightpanda or Playwright;
- all geometry, overflow, wrapping, breakpoint, target-size, screenshot, and visual checks to Playwright.

A finding is not fully reconciled until the relevant scenario reruns successfully or an explicit exception is approved.

## Receipt expectation

The receipt should summarize:

- representative viewports and breakpoint probes;
- Lightpanda and Playwright workflow coverage;
- passed and failed assertions;
- unavailable analyzers and browser coverage;
- approved exceptions;
- required human reviews;
- release decision.

Detailed width measurements, structured Lightpanda results, browser traces, and backend logs remain addressable evidence rather than being repeated in the top-level narrative.

## MVP exit criteria

- an LLM-generated contract proposal from the Switchyard audit requires only bounded human correction;
- generated browser procedures remain proposals until reviewed;
- the approved contract is understandable without reading the engine;
- a local PandaScript workflow replays ten times with the same normalized result and zero LLM calls;
- Lightpanda policy rejects invalid paths, origins, versions, output, postconditions, and unsafe secret exposure;
- all six known Switchyard defects can be reproduced and detected;
- each assertion is routed to an execution backend qualified to prove it;
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
- a persistent autonomous browser agent;
- arbitrary natural-language behavior during routine replay;
- automatic human approval;
- a universal design score;
- broad computer-vision critique;
- full Storybook or Figma integration;
- general-purpose content fuzzing;
- Safari or real-device automation infrastructure;
- consequential external browser actions;
- bundled or auto-downloaded Lightpanda binaries;
- a generic multi-browser abstraction;
- organization-wide policy management.
