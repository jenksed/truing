# Architecture

## Architectural thesis

Truing should be a thin assurance spine around mature interface tooling, not a replacement for it.

```text
sources and repository
  ↓ derive
contract proposal
  ↓ human authorization
approved contract
  ↓ compile and route
scenario execution
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
- propose a scoped exception;
- propose or repair a browser workflow.

It may not:

- weaken or delete an assertion to make the run pass;
- approve its own contract or workflow change;
- convert a failure into an exception;
- satisfy required human review;
- report a missing analyzer as passed;
- treat generated browser code as trusted merely because it was generated.

## Browser execution routing

The execution planner chooses the lowest-cost backend capable of proving the required claim honestly.

```text
1. Plain HTTP or an existing API
   For non-browser facts.

2. Lightpanda PandaScript
   For DOM-oriented JavaScript execution, structured extraction,
   simple interactions, and nonvisual smoke workflows.

3. Playwright or another full browser
   For screenshots, layout, geometry, responsive behavior,
   rendering fidelity, browser compatibility, and complex Web APIs.

4. Live agent browsing
   For unfamiliar or changing tasks requiring runtime judgment.
```

Lightpanda and Playwright are complementary evidence lanes, not interchangeable browser backends.

A scenario may collect observations from both. Every observation records its backend, version, environment, and authority limits.

### Lightpanda authority

Lightpanda may support claims about:

- DOM and semantic target presence;
- structured text or data extraction;
- accessible names;
- simple interaction state;
- successful navigation through a declared nonvisual workflow;
- JSON-compatible postconditions.

It may not support claims about:

- visual correctness;
- pixel output;
- element geometry;
- clipping, overlap, or wrapping;
- responsive layout;
- browser zoom;
- graphical animation behavior;
- compatibility with a full graphical browser.

### Playwright authority

Playwright or another full browser remains the authority for:

- viewport and breakpoint execution;
- screenshots and traces;
- bounding boxes and intersections;
- overflow and clipping;
- text wrapping and font behavior;
- touch-target geometry;
- responsive transformations;
- animation and reduced-motion rendering;
- browser compatibility;
- visual review evidence.

### No premature generic abstraction

The first implementations should remain backend-specific:

```text
@truing/runner-lightpanda
@truing/runner-playwright
```

Do not introduce a generic browser-runner interface until real shared behavior has been proven. Shared primitives may be extracted for policy, timeouts, redaction, evidence, and receipts without pretending the evidence capabilities are identical.

## PandaScript lifecycle

The operating model is:

```text
Reason once
  → preserve the procedure
  → review and authorize repository code
  → replay without an LLM
  → validate structured postconditions
  → evidence and receipt
```

A human, LLM, or bounded worker may propose a PandaScript and manifest. The accepted script becomes repository code.

Routine replay:

1. validates repository-relative paths;
2. rejects traversal, absolute paths, and symlink escape;
3. validates the workflow manifest;
4. checks the exact supported Lightpanda version;
5. enforces origin allowlists and side-effect policy;
6. exposes only declared `LP_*` secret names;
7. invokes Lightpanda without a shell;
8. applies timeout and output bounds;
9. parses one JSON-compatible completion result;
10. evaluates declared postconditions;
11. creates evidence and a receipt.

Process exit success is not proof. Postconditions determine pass or failure.

A deterministic procedure does not make a remote website deterministic. Site changes, sessions, timing, A/B tests, authentication, and server behavior remain environmental variables and must be classified honestly.

See [`BROWSER_EXECUTION_STRATEGY.md`](BROWSER_EXECUTION_STRATEGY.md) for the full workflow, policy, security, and receipt requirements.

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

## Next architectural slices

### Slice A — Lightpanda compatibility and replay proof

Proposed packages:

```text
@truing/runner-lightpanda
@truing/browser-policy
@truing/browser-result
@truing/evidence
@truing/receipt
```

Responsibilities:

- exact Lightpanda version detection;
- repository-local PandaScript and manifest validation;
- origin, path, secret, side-effect, timeout, and output policy;
- structured result parsing;
- postcondition evaluation;
- failure classification;
- immutable browser execution receipt;
- local deterministic fixture and ten-replay proof.

This slice must not make visual claims.

### Slice B — Switchyard rendered-browser pilot

Proposed packages:

```text
@truing/runner-playwright
@truing/observations-dom
@truing/observations-geometry
@truing/assertions-core
@truing/evidence
@truing/receipt
```

The Playwright runner must not move browser-specific concepts into the contract package.

Responsibilities:

- prepare and execute named scenarios;
- select representative viewports;
- generate breakpoint-neighborhood probes;
- apply deterministic fixture and content profiles;
- collect traces and screenshots;
- report setup failures separately from assertion failures;
- attribute every observation to the browser and version.

### `@truing/authoring`

This package should remain optional and outside deterministic verification.

Responsibilities:

- ingest an audit report, product brief, existing tests, and repository context;
- produce a contract proposal rather than an approved contract;
- propose PandaScripts or Playwright scenarios when appropriate;
- attach source provenance;
- separate durable product intent from one-time implementation details;
- list assumptions and unresolved interpretations;
- emit reviewable contract and workflow diffs.

An initial implementation may use an external LLM adapter. Proposal artifacts must remain useful when the original model is unavailable.

## Observation packages

The first observation layer should capture:

- document client and scroll dimensions;
- target bounding boxes;
- clipping and intersections;
- DOM and reading order;
- visible text;
- accessible names;
- disclosure and focus state;
- relevant computed styles;
- analyzer execution status;
- execution backend and version;
- local fixture or external-target status.

Not every backend can produce every observation. Unsupported observations become coverage records, not false passes.

## Assertion catalog

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

Each assertion declares:

- required observations;
- acceptable execution backends;
- authority class;
- severity;
- whether human review remains required.

For example, `accessibility.accessible_name` may be evaluated from Lightpanda or Playwright DOM evidence. `layout.no_horizontal_overflow` requires a full rendering browser.

## Evidence

Evidence must be addressable by:

- run ID;
- contract fingerprint;
- source revision;
- scenario;
- viewport or probe;
- execution backend and exact version;
- evidence type;
- content hash;
- redaction state;
- related finding IDs;
- local fixture or external target;
- backend limitations.

Temporary screenshots may be used during execution, but a receipt cannot reference only an untracked temporary path.

## Receipts

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
- execution backend coverage;
- release decision.

The top level should stay concise. Detailed width matrices, raw observations, and backend logs remain linked evidence.

A Lightpanda receipt proves nonvisual structured observations from that execution. It does not prove graphical rendering or future stability of an external site.

## Breakpoint-neighborhood execution

Responsive breakpoints should be tested as boundaries, not only as showcase screenshots.

A contract may declare:

```yaml
probes:
  breakpoint_neighborhoods:
    - breakpoint: 640
      offsets: [-1, 0, 1]
```

The Playwright runner expands this into 639, 640, and 641 pixel executions. Findings retain the exact width, while the receipt summarizes the breakpoint probe as one coverage group.

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

Lightpanda may prove nonvisual reachability for some capabilities. Playwright is required when the claim includes visual priority, placement, geometry, or rendered availability.

## Content-profile execution

Content profiles should be deterministic fixture transformations, not uncontrolled fuzzing.

The first profiles should cover:

- long unbroken identifiers;
- long labels and destination names;
- expanded prose;
- empty optional values.

The evidence manifest records the exact generated values or seed so the result can be reproduced.

## Coverage ledger

Analyzer and execution-backend availability are distinct from assertion evaluation.

For each expected analyzer, browser, device, or execution lane, the run records:

- `completed`;
- `not_run`;
- `blocked`;
- `failed_to_initialize`.

Axe-core being unavailable cannot be represented as an accessibility pass. Lightpanda being unavailable cannot silently shift a nonvisual smoke workflow to a live agent. Playwright being unavailable cannot permit a visual or geometry claim.

## Core objects

- **Target:** the route, component, dialog, or workflow state being verified.
- **Scenario:** a reproducible interface state.
- **Contract proposal:** a non-authoritative candidate for intent.
- **Approved contract:** declared and authorized interface intent.
- **Browser workflow proposal:** non-authoritative PandaScript or Playwright procedure.
- **Accepted browser workflow:** reviewed repository automation.
- **Observation:** a fact captured from the running interface.
- **Assertion:** a claim evaluated against observations.
- **Finding:** an evaluated result with severity and confidence.
- **Evidence:** an addressable artifact supporting a finding or decision.
- **Coverage record:** whether an analyzer, backend, browser, device, or scenario executed.
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
3. Prove the Lightpanda/PandaScript policy and replay path against a local fixture.
4. Route qualifying Switchyard semantic and smoke assertions to Lightpanda.
5. Execute the representative and boundary viewport matrix through Playwright.
6. Reproduce the six known failures.
7. Record unavailable analyzers and execution lanes as coverage gaps.
8. Reconcile fixes and contextual exceptions.
9. Produce a concise receipt with durable evidence and backend attribution.
10. Apply the same architecture to the event-detail critical-information proof.
