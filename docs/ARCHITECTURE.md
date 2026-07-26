# Architecture

## Architectural thesis

Truing should be a thin assurance spine around mature interface tooling, not a replacement for it.

```text
contract
  ↓ compile
scenario runner
  ↓ observe
DOM · geometry · accessibility · interaction · visual evidence
  ↓ evaluate
findings
  ↓ reconcile
human review · accepted change · exception · fix
  ↓
design receipt
```

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
@truing/runner-playwright
@truing/observations-dom
@truing/assertions-core
@truing/evidence
@truing/receipt
```

## Core objects

- **Target:** the route, component, dialog, or workflow state being verified.
- **Scenario:** a reproducible interface state.
- **Contract:** declared interface intent.
- **Observation:** a fact captured from the running interface.
- **Assertion:** a claim evaluated against observations.
- **Finding:** an evaluated result with severity and confidence.
- **Evidence:** an addressable artifact supporting a finding or decision.
- **Reconciliation:** the explicit resolution of a failure or change.
- **Design receipt:** the final evidence-backed delivery record.

## Authority boundary

The system must preserve the difference between:

1. deterministic facts;
2. derived deterministic facts;
3. heuristics;
4. reference-relative differences;
5. model-assisted signals;
6. human judgment.

A lower-authority result must never silently satisfy a higher-authority requirement.
