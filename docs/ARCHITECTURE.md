# Architecture

## Architectural thesis

Truing should be a thin assurance spine around mature interface tooling, not a replacement for it.

```text
sources and repository
  ↓ derive
contract proposal
  ↓ human authorization
approved contract
  ↓ compile
scenario runner
  ↓ observe
DOM · geometry · accessibility · interaction · visual evidence
  ↓ evaluate
findings and coverage
  ↓ reconcile
human review · accepted change · exception · fix
  ↓
design receipt
```

The authoring path may use an LLM. The verification path must remain deterministic and runnable without one.

## Contract authority boundary

Truing distinguishes three contract states:

1. **Discovered intent** — observations and candidate rules inferred from code, tests, reports, screenshots, and design sources.
2. **Contract proposal** — a model- or human-authored candidate with provenance, assumptions, unresolved questions, and an explicit diff.
3. **Approved contract** — the committed, fingerprinted source of truth used by CI and verification.

A proposal may never silently become approved.

During verification, an agent may:

- explain a failing assertion;
- suggest an implementation fix;
- propose a contract change;
- identify a likely false positive;
- propose a scoped exception.

It may not:

- weaken or delete an assertion to make the run pass;
- approve its own contract change;
- convert a failure into an exception;
- satisfy required human review;
- report a missing analyzer as passed.

## Initial packages

### `@truing/contract`

Owns the stable language boundary:

- YAML parsing;
- schema validation;
- normalized contract representation;
- deterministic fingerprints;
- readable validation failures.

### `@truing/cli`

Owns the first user-facing workflow:

- `truing contract check <path...>`;
- recursive discovery when a directory is supplied;
- machine-reliable exit status;
- concise, inspectable output.

## Next architectural slice

The next implementation should add a Playwright runner without moving browser-specific concepts into the contract package.

Proposed package boundary:

```text
@truing/authoring
@truing/runner-playwright
@truing/observations-dom
@truing/observations-geometry
@truing/assertions-core
@truing/evidence
@truing/receipt
```

### `@truing/authoring`

This package should remain optional and outside deterministic verification.

Responsibilities:

- ingest an audit report, product brief, existing tests, and repository context;
- produce a contract proposal rather than an approved contract;
- attach source provenance;
- separate durable product intent from one-time implementation details;
- list assumptions and unresolved interpretations;
- emit a reviewable contract diff.

An initial implementation may use an external LLM adapter. The proposal artifact must remain useful even when the original model is unavailable.

### `@truing/runner-playwright`

Responsibilities:

- prepare and execute named scenarios;
- select representative viewports;
- generate breakpoint-neighborhood probes;
- apply deterministic fixture and content profiles;
- collect traces and screenshots;
- report setup failures separately from assertion failures.

### Observation packages

The first observation layer should capture:

- document client and scroll dimensions;
- target bounding boxes;
- clipping and intersections;
- DOM and reading order;
- visible text;
- accessible names;
- disclosure and focus state;
- relevant computed styles;
- analyzer execution status.

### `@truing/assertions-core`

The Switchyard validation supports a narrow first catalog:

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

Each assertion declares its authority class and required observations.

### `@truing/evidence`

Evidence must be addressable by:

- run ID;
- contract fingerprint;
- source revision;
- scenario;
- viewport or probe;
- browser and version;
- evidence type;
- content hash;
- redaction state;
- related finding IDs.

Temporary screenshots may be used during execution, but a receipt cannot reference only an untracked temporary path.

### `@truing/receipt`

The receipt must separate:

- passed assertions;
- failed assertions;
- changed references;
- warnings;
- checks that did not run;
- blocked scenarios;
- required human review;
- accepted exceptions;
- browser and device coverage;
- release decision.

The top level should stay concise. Detailed width matrices and raw observations remain linked evidence.

## Breakpoint-neighborhood execution

Responsive breakpoints should be tested as boundaries, not only as showcase screenshots.

A contract may declare:

```yaml
probes:
  breakpoint_neighborhoods:
    - breakpoint: 640
      offsets: [-1, 0, 1]
```

The runner expands this into 639, 640, and 641 pixel executions. Findings retain the exact width, while the receipt summarizes the breakpoint probe as one coverage group.

A later implementation may locate failure boundaries with binary search, but that is not required for the first slice.

## Capability-preservation model

Responsive interfaces often replace controls rather than preserve elements.

Truing should allow a contract to name a user capability such as:

- run a demo;
- navigate the product;
- open GitHub;
- select a theme;
- retry a delivery;
- inspect a failure.

The implementation may satisfy the capability through different targets at different widths. The assertion proves continued availability and, where required, priority and operability.

This prevents an overflow fix from removing functionality and prevents a brittle contract from requiring identical DOM elements everywhere.

## Content-profile execution

Content profiles should be deterministic fixture transformations, not uncontrolled fuzzing.

The first profiles should cover:

- long unbroken identifiers;
- long labels and destination names;
- expanded prose;
- empty optional values.

The evidence manifest records the exact generated values or seed so the result can be reproduced.

## Coverage ledger

Analyzer execution is distinct from assertion evaluation.

For each expected analyzer or environment, the run records:

- `completed`;
- `not_run`;
- `blocked`;
- `failed_to_initialize`.

Axe-core being unavailable, for example, cannot be represented as an accessibility pass. Manual DOM observations and human accessibility review remain separately reportable.

## Core objects

- **Target:** the route, component, dialog, or workflow state being verified.
- **Scenario:** a reproducible interface state.
- **Contract proposal:** a non-authoritative candidate for intent.
- **Approved contract:** declared and authorized interface intent.
- **Observation:** a fact captured from the running interface.
- **Assertion:** a claim evaluated against observations.
- **Finding:** an evaluated result with severity and confidence.
- **Evidence:** an addressable artifact supporting a finding or decision.
- **Coverage record:** whether an analyzer, browser, device, or scenario executed.
- **Reconciliation:** the explicit resolution of a failure or change.
- **Design receipt:** the final evidence-backed delivery record.

## Finding authority boundary

The system must preserve the difference between:

1. deterministic facts;
2. derived deterministic facts;
3. heuristics;
4. reference-relative differences;
5. model-assisted signals;
6. human judgment.

A lower-authority result must never silently satisfy a higher-authority requirement.

## Pilot sequence

1. Use the Switchyard audit to produce the first contract proposal.
2. Approve and fingerprint the contract.
3. Execute the representative and boundary viewport matrix.
4. Reproduce the six known failures.
5. Record unavailable analyzers as coverage gaps.
6. Reconcile fixes and contextual exceptions.
7. Produce a concise receipt with durable evidence.
8. Apply the same architecture to the event-detail critical-information proof.
