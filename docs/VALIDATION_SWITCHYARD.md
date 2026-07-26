# Validation case study: Switchyard mobile audit

## Purpose

This document records the first concrete validation of Truing's product thesis using a completed Playwright-driven mobile audit of the Switchyard public site.

The audit was not performed with Truing. It is valuable precisely because it shows what a rigorous engineer already has to assemble manually: viewport selection, breakpoint probes, runtime observations, product interpretation, accessibility checks, exceptions, screenshots, limitations, fixes, and a final completion narrative.

The case study supports a strong conclusion:

> The missing value is not browser automation. It is the durable contract, evidence, authority, and reconciliation layer around browser automation.

Playwright remains the execution engine. Truing should turn the reasoning around it into reusable project infrastructure.

---

## Source audit summary

The Switchyard audit:

- rendered a production Astro build in Chromium;
- checked 20 widths plus a landscape phone state;
- explicitly probed the 360, 640, and 1024 pixel breakpoint neighborhoods;
- compared document `clientWidth` and `scrollWidth`;
- captured 13 screenshots;
- inspected touch target dimensions;
- manually reviewed headings, landmarks, accessible names, state labels, focus styling, menu semantics, and reduced-motion behavior;
- documented unavailable checks, including axe-core, Lighthouse, real devices, Safari, and Android Chrome;
- identified six defects or latent defects;
- changed three source files;
- reran the width matrix and build checks;
- recorded remaining exceptions and limitations.

### Defects found

1. Header actions produced 61 pixels of horizontal overflow at 320 pixels.
2. A `white-space: nowrap` rule was brittle under doubled text/layout stress.
3. The menu toggle was 40 by 40 pixels rather than the required 44 by 44.
4. Theme buttons relied on `title` rather than explicit accessible names.
5. Receipt definition values were not defensive against long identifiers and hashes.
6. Receipt attempt rows did not wrap safely with long destination names.

### Corrections

- desktop header actions were hidden below 1024 pixels because equivalent capabilities already existed in mobile navigation;
- the hero phrase was made content-safe rather than forced onto one line;
- the menu toggle was increased to 44 by 44;
- theme buttons received explicit `aria-label` values;
- receipt values received shrink and wrapping safeguards;
- receipt attempt rows were allowed to wrap.

---

## What the audit validates

## 1. Truing should orchestrate Playwright, not replace it

Playwright already performed the important runtime work:

- loading the production build;
- selecting exact viewport dimensions;
- measuring geometry;
- opening the mobile menu;
- exercising keyboard behavior;
- reading DOM state;
- taking screenshots.

Truing's responsibility is to provide the stable model around those operations:

```text
intent
  -> generated contract proposal
  -> approved contract
  -> Playwright scenarios
  -> observations
  -> findings
  -> evidence
  -> reconciliation
  -> receipt
```

This reinforces the thin-assurance-spine architecture.

## 2. The contract format is an intermediate representation, not the primary UX

The audit report contains enough structured intent for an LLM to propose a useful contract:

- required viewports;
- breakpoint boundaries;
- no-overflow rules;
- capability-preservation rules;
- content stress requirements;
- accessible-name requirements;
- target-size policy;
- menu behavior;
- reduced-motion expectations;
- coverage limitations;
- accepted exceptions.

A user should not normally translate that report into YAML by hand.

The intended workflow is:

1. Truing and an LLM inspect existing code, tests, reports, screenshots, and documentation.
2. The LLM creates a **contract proposal** with provenance and unresolved questions.
3. A human reviews the product decisions rather than every serialization detail.
4. Approval produces the committed contract.
5. CI and later agents consume the approved deterministic contract without requiring an LLM.
6. Future contract changes are proposed as diffs and require explicit authorization.

The approved contract remains readable, portable, reviewable, and model-independent.

## 3. Viewport selection must distinguish examples from probes

The audit did not merely test popular device widths. It used three different classes of viewport:

### Representative widths

Examples included 320, 390, 430, 768, 820, and 1024 pixels.

### Breakpoint-neighborhood probes

- 359, 360, 361;
- 639, 640, 641;
- 1023, 1024, 1025.

### Orientation states

- 812 by 375 landscape.

This distinction should be first-class in Truing. Breakpoint-neighborhood probes are not separate product states; they are targeted tests of transformation boundaries.

A future runner should support:

```yaml
probes:
  breakpoint_neighborhoods:
    - breakpoint: 360
      offsets: [-1, 0, 1]
    - breakpoint: 640
      offsets: [-1, 0, 1]
    - breakpoint: 1024
      offsets: [-1, 0, 1]
```

The receipt should summarize the probe group while preserving the individual measurements as evidence.

## 4. Responsive verification must preserve capabilities, not DOM elements

The strongest responsive decision in the audit was not simply hiding overflowing header controls.

Below 1024 pixels, the desktop demo action and theme controls disappeared because equivalent capabilities were available in the mobile interface. A basic element-presence assertion could incorrectly call this a failure. A screenshot diff could only report change.

The durable product intent is:

> The demo, GitHub, navigation, and theme-selection capabilities remain available across the responsive transformation, even when their concrete controls move or change representation.

Truing therefore needs a high-value assertion family for responsive capability preservation.

Examples:

```text
responsive.capability_preserved
responsive.action_priority_preserved
responsive.content_relationship_preserved
```

This is stronger than requiring the same element at every width and safer than allowing controls to disappear without explanation.

## 5. Content resilience requires executable hostile-content profiles

Two audit findings were predictive rather than directly exposed by the canonical fixture:

- long endpoint IDs or hashes could overflow;
- long destination names could cramp the attempt row.

The fixes were sensible, but a later system should prove them with deterministic scenarios.

Truing should support named, reproducible content profiles such as:

```yaml
content_profiles:
  hostile-identifiers:
    endpoint_id:
      generator: unbroken_alphanumeric
      length: 128
    body_hash:
      generator: hexadecimal
      length: 128
    destination:
      generator: repeated_words
      length: 180
```

A content-risk finding should not be considered reconciled merely because defensive CSS was added. The relevant stress scenario should be executed and attached to the receipt.

## 6. Deterministic failures and governed exceptions must remain separate

The audit measured several controls below 44 by 44 pixels:

- a 43-pixel-tall skip link;
- the linked brand mark;
- compact mobile navigation links.

The menu toggle and primary calls to action were corrected to meet the configured threshold. The remaining smaller targets were consciously accepted for contextual reasons.

A useful system cannot choose between failing every smaller target and suppressing the rule globally.

Truing should:

1. record the deterministic measurement;
2. evaluate the configured assertion;
3. produce a finding;
4. allow a scoped exception with rationale, owner, evidence, and review condition;
5. keep the exception visible in the receipt.

The exception does not erase the observation.

## 7. Coverage must distinguish passed, not run, blocked, and manually reviewed

The audit honestly recorded that:

- axe-core did not run because the dependency was unavailable offline;
- Lighthouse did not run;
- real-device testing did not occur;
- only Chromium was used;
- Safari and Android behavior remained unverified.

These are not failed UI assertions, and they are not passes.

Truing needs explicit execution and coverage states:

- `pass`;
- `fail`;
- `changed`;
- `warning`;
- `not_run`;
- `blocked`;
- `requires_review`;
- `accepted_exception`.

A receipt should separately report:

- deterministic DOM and geometry checks;
- automated accessibility engine coverage;
- manual accessibility observations;
- browser and device coverage;
- human review;
- accepted exceptions.

This prevents a detailed manual review from being mistaken for an automated accessibility pass.

## 8. Stress probes must not masquerade as standards tests

The audit used `document.documentElement.style.zoom = 2` as a stress mechanism. It correctly noted that CSS zoom is not equivalent to ordinary browser zoom.

Truing should require the method and authority of a probe to be explicit.

For example:

```yaml
- id: doubled-layout-stress
  use: content.scale_stress
  method: css-zoom
  scale: 2
  normative: false
  purpose: detect-nowrap-and-clipping
```

A genuine browser-zoom or WCAG reflow requirement should be represented separately with its own expected behavior.

This prevents an engineering stress test from being presented as standards conformance evidence.

## 9. Evidence needs durable identity and provenance

The audit stored screenshots under `/tmp/switchyard-mobile/`. That is useful during a session but not durable project memory.

Truing should attach every artifact to:

- run ID;
- contract fingerprint;
- source revision;
- scenario;
- viewport or probe;
- browser and version;
- evidence type;
- content hash;
- redaction state;
- related findings.

The human receipt should summarize results. Full measurements and screenshots should remain inspectable underneath it.

## 10. Reconciliation must be addressable

The report said all prior sessions were reconciled, but a durable system should identify the exact findings and resolutions.

For this audit, the resolution ledger would include at least:

- header overflow: fixed and verified;
- brittle hero wrapping: fixed and stress-probed;
- menu target size: fixed and measured;
- theme controls unnamed: fixed and verified;
- receipt identifier overflow risk: fixed, but requires hostile-content execution for full proof;
- destination wrapping risk: fixed, but requires hostile-content execution for full proof;
- smaller contextual targets: accepted exceptions;
- axe, Lighthouse, and real-device checks: not run, with reasons.

A claim of reconciliation should be computed from these records rather than stated informally.

---

## Product direction injected from this validation

The following are now strong product commitments for the first practical vertical slice.

## Commitment 1: generated contract proposals

Truing will treat YAML as the committed intermediate representation.

The first authoring workflow should accept an existing audit report and produce:

- a proposed contract;
- source provenance;
- inferred rules;
- one-time fixes that should not become contracts;
- unresolved questions;
- explicit assumptions;
- a reviewable contract diff.

The LLM may propose. It may not silently approve or weaken product intent.

## Commitment 2: breakpoint-neighborhood probes

The runner and contract model should support generated widths around declared breakpoints.

The initial implementation only needs offsets of `-1`, `0`, and `+1` pixels.

## Commitment 3: capability preservation

The first responsive assertion set should include capability preservation rather than only visibility and region order.

## Commitment 4: hostile-content profiles

The first runner should support deterministic fixture variants for:

- long unbroken identifiers;
- long labels or destination names;
- empty optional data;
- expanded prose.

General-purpose fuzzing is not required for the first slice.

## Commitment 5: explicit coverage ledger

Receipts must report what did not run and why. A missing analyzer can never be represented as a pass.

## Commitment 6: governed exceptions

The first receipt model should preserve scoped exceptions rather than requiring all nuance to remain in prose.

## Commitment 7: concise receipt over detailed evidence

The top-level receipt should summarize the result without repeating every width measurement. The full measurement matrix remains available as evidence.

---

## Revised first pilot

The Switchyard homepage mobile audit should become the first practical Truing pilot because it already provides:

- a production build;
- Playwright-compatible execution;
- known responsive breakpoints;
- real defects;
- representative and boundary widths;
- interaction behavior;
- content-resilience concerns;
- accessibility observations;
- screenshots;
- explicit limitations;
- nuanced exceptions.

The existing event-detail contract remains useful as the product-intent demonstration for dense diagnostic UI. The homepage pilot should precede it because it gives Truing a real audit to ingest and reproduce.

### Pilot phases

1. **Derive:** transform the audit report into a contract proposal.
2. **Approve:** review inferred product rules and unresolved interpretations.
3. **Execute:** run the approved contract against Switchyard.
4. **Compare:** verify that the six known defects are detected on a deliberately regressed fixture or revision.
5. **Reconcile:** record fixes, exceptions, and unavailable checks.
6. **Receipt:** produce a concise report backed by the complete evidence matrix.

---

## Success criteria from the Switchyard pilot

The pilot succeeds when Truing can:

1. generate a credible contract proposal from the existing audit with limited human correction;
2. distinguish durable product intent from implementation-specific fixes;
3. reproduce the no-overflow width matrix and breakpoint probes;
4. verify that responsive capabilities remain available below 1024 pixels;
5. execute hostile-content scenarios for receipt identifiers and destinations;
6. distinguish automated accessibility coverage from manual observations;
7. preserve the skip-link and compact-navigation exceptions without suppressing the target-size rule;
8. classify CSS zoom as a non-normative stress probe;
9. produce addressable evidence for each finding;
10. generate a receipt materially shorter and more reliable than the original terminal narrative.

---

## What this case study does not prove

The audit does not yet prove:

- that teams will maintain contracts over time;
- that generated proposals are accurate enough without excessive review;
- that capability preservation can be generalized cleanly;
- that heuristic design critique is valuable;
- that a hosted service is needed;
- that Truing should support native mobile applications;
- that the current schema is mature.

Those remain validation questions.

---

## Conclusion

The Switchyard audit is strong evidence for Truing because it demonstrates substantial value already being created manually.

The audit's weakness is not lack of rigor. Its weakness is that the rigor is trapped in a one-time report and a temporary evidence directory.

Truing should preserve the same engineering quality while making the resulting intent, evidence, exceptions, and decisions reusable by the project and every future agent working on it.
