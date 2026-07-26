# Contributing to Truing

Truing is in pre-alpha planning and validation.

The repository is not accepting broad feature implementation. Contributions must fit the active release plan in [`docs/MVP.md`](docs/MVP.md) or begin as a scope proposal in [`docs/DECISIONS.md`](docs/DECISIONS.md).

## Read before proposing code

1. [`docs/PROJECT_STATE.md`](docs/PROJECT_STATE.md)
2. [`docs/MVP.md`](docs/MVP.md)
3. [`docs/DECISIONS.md`](docs/DECISIONS.md)
4. [`AGENTS.md`](AGENTS.md)

The current phase is planning and owner approval. Product implementation remains blocked until the owner accepts the IR-1 boundary and activates backlog item B1.

## High-value contributions now

Useful contributions include:

- correcting a mistaken repository-state assessment;
- identifying a conflict between the active plan and existing code or documentation;
- narrowing an acceptance criterion that is not objectively verifiable;
- providing evidence that Lightpanda cannot support a proposed nonvisual check;
- identifying an unsafe or ambiguous browser-workflow boundary;
- improving a negative test or stopping condition for an approved backlog item;
- contributing a real interface failure that should inform a later release without silently entering IR-1.

## Before proposing later scope

Open an issue or add a proposed entry to `docs/DECISIONS.md` describing:

1. the interface failure or ambiguity;
2. the intended truth that should be preserved;
3. the evidence needed to evaluate it;
4. the authority class of the result;
5. why the active release cannot meet its accepted outcome without the addition;
6. which phase, backlog item, verification, and risk would change;
7. whether owner approval is required.

A useful idea does not automatically become active scope.

## Development protocol

Work on one approved backlog item at a time.

Do not:

- start a future phase;
- add speculative packages or framework abstractions;
- add assertion families not listed in IR-1;
- refactor unrelated code;
- broaden browser coverage;
- implement hosted or model-assisted features;
- weaken acceptance criteria to make a change pass.

Follow the operating and reporting requirements in [`AGENTS.md`](AGENTS.md).

## Baseline verification

```bash
npm install
npm run check
npm run build
npm run contract:check -- examples
```

Active implementation phases will add required commands in [`docs/MVP.md`](docs/MVP.md).

Report any check that did not run precisely. Do not describe unavailable coverage as passing.

## Scope discipline

The highest-priority outcome is a small, complete contract-to-receipt proof.

Hosted infrastructure, automatic aesthetic scoring, broad plugin systems, real Switchyard integration, LLM authoring, new browsers, and general-purpose workflow frameworks are deferred unless an approved later plan activates them.
