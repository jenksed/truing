# Browser execution strategy

## Purpose

Truing should not treat every interface check as a Playwright job and should not introduce a persistent browser agent.

The browser strategy is tiered:

```text
1. Plain HTTP or an existing API
   Use when browser state and JavaScript execution are unnecessary.

2. Lightpanda PandaScript
   Use for DOM-oriented JavaScript pages, structured extraction,
   simple interactions, semantic checks, and nonvisual smoke workflows.

3. Playwright with Chromium or another full browser
   Use for rendering fidelity, screenshots, responsive layout,
   geometry, visual behavior, browser compatibility, and complex Web APIs.

4. Live agent browsing
   Use only when the page or task is unfamiliar or changing enough
   that runtime judgment is genuinely required.
```

The strategy is designed to preserve successful exploration as deterministic repository automation rather than repeatedly paying for a model to rediscover the same browser procedure.

The operating model is:

```text
Reason once
  → preserve the browser procedure
  → review and authorize it as repository code
  → replay without an LLM
  → validate structured postconditions
  → attach evidence and coverage
  → produce a receipt
```

## Why Truing needs both Lightpanda and Playwright

Lightpanda and Playwright solve different parts of the verification problem.

### Lightpanda/PandaScript lane

Use Lightpanda when the required truth can be established from document state and interaction results without visual rendering authority.

Strong candidates include:

- a required control or status exists in the DOM;
- an accessible name is present;
- a disclosure opens and updates state;
- a workflow reaches a declared confirmation state;
- a JavaScript-rendered page exposes expected structured content;
- a capability remains reachable through a nonvisual interaction path;
- a recurring local smoke workflow needs fast, model-free replay;
- a browser procedure should produce normalized JSON for later assertion evaluation.

A PandaScript is a deterministic procedure operating against an environment that may still vary. Remote pages, sessions, timing, A/B tests, and server behavior are not inherently deterministic.

### Playwright/full-browser lane

Use Playwright or another full browser whenever the claim depends on actual rendering behavior.

This includes:

- screenshots and visual evidence;
- viewport and breakpoint behavior;
- element geometry and overlap;
- horizontal or vertical overflow;
- clipping and wrapping;
- typography and font loading;
- responsive transformations;
- animation and reduced-motion behavior;
- browser zoom and rendering fidelity;
- browser compatibility;
- Web APIs or downloads unsupported by Lightpanda;
- any claim that a user can visually perceive or operate the interface correctly.

Lightpanda has no graphical rendering authority and must never be used to claim that an interface looks correct, reflows correctly, or is visually compatible.

## Division of authority

The contract determines the required truth. The execution planner chooses the lowest-cost backend capable of proving it honestly.

| Required evidence | Preferred path | Authority boundary |
| --- | --- | --- |
| Static resource or API response | HTTP/API | No browser claim |
| DOM state, semantic extraction, simple interaction result | Lightpanda/PandaScript | Nonvisual browser evidence |
| Layout, screenshots, geometry, responsive behavior | Playwright/full browser | Rendered browser evidence |
| Unfamiliar or changing task requiring interpretation | Live agent browsing | Exploratory, not durable until preserved |

A single Truing scenario may use more than one lane. For example:

1. Lightpanda can quickly replay a workflow and return structured semantic observations.
2. Playwright can run the smaller set of states that require geometry, screenshots, or visual review.
3. The receipt records which backend produced each observation and what that backend is qualified to prove.

## PandaScript lifecycle

### Discovery and compilation

An LLM, human, or bounded worker may explore a browser task and propose:

- a PandaScript;
- a companion workflow manifest;
- allowed origins;
- side-effect classification;
- required secret names;
- timeout and output bounds;
- structured result schema;
- explicit postconditions;
- assumptions and known limitations.

Generated scripts are untrusted until reviewed and accepted as repository code.

### Routine replay

Routine replay contains no LLM call.

The runner:

1. validates the repository-relative manifest and script paths;
2. rejects traversal, absolute paths, and symlink escape;
3. verifies the exact supported Lightpanda version;
4. enforces allowed origins and declared `LP_*` secret names;
5. invokes Lightpanda directly without a shell;
6. applies timeout and output limits;
7. parses one JSON-compatible completion value;
8. evaluates declared postconditions;
9. records evidence, failure classification, and a receipt.

Process exit success is not enough. A run passes only when its structured postconditions pass.

### Failure and repair

Failures should be classified rather than collapsed into a generic browser error.

Initial classes include:

- `binary_missing`;
- `version_mismatch`;
- `policy_rejected`;
- `navigation_failed`;
- `disallowed_origin`;
- `timeout`;
- `script_error`;
- `malformed_output`;
- `postcondition_failed`;
- `site_changed`;
- `authentication_required`;
- `unsupported_browser_api`;
- `process_crashed`.

An LLM or bounded worker may propose a repair, but the repaired workflow must be rerun through the deterministic runner and cannot approve itself.

## Workflow manifest

PandaScripts are repository code, not hidden Truing state.

Recommended project layout:

```text
automation/browser/<workflow-name>.panda.js
automation/browser/<workflow-name>.workflow.json
```

Example manifest:

```json
{
  "schemaVersion": 1,
  "name": "local-signup-smoke",
  "engine": "lightpanda",
  "script": "automation/browser/local-signup-smoke.panda.js",
  "sideEffectClass": "local_reversible",
  "allowedOrigins": ["http://127.0.0.1:4173"],
  "requiredSecretNames": [],
  "timeoutMs": 30000,
  "resultSchema": {
    "type": "object",
    "required": ["status", "assertions", "observed"]
  }
}
```

The manifest is declarative policy. It must not become an unrestricted workflow language.

## Security boundary

The first implementation must:

- accept repository-relative paths only;
- reject traversal, absolute paths, and symlink escape;
- run only scripts referenced by a valid manifest;
- invoke Lightpanda without a shell;
- require exact origin allowlisting;
- permit only declared environment variable names beginning with `LP_`;
- keep secret values out of logs, receipts, scripts, and model context;
- bound execution time and output size;
- surface use of page-context `evaluate(...)` as a high-trust capability;
- avoid automatic retries for workflows that may have produced side effects;
- restrict the first version to read-only extraction and local reversible smoke workflows;
- keep Lightpanda externally installed and pinned rather than bundling or auto-downloading it.

## Receipt requirements

A browser execution receipt should record:

- workflow and manifest identity;
- manifest and script SHA-256;
- engine and exact version;
- repository and contract fingerprints;
- declared purpose;
- side-effect class;
- allowed origins;
- required secret names, never values;
- timing and timeout;
- normalized structured result and hash;
- postcondition results;
- bounded and redacted output;
- failure classification;
- retry count;
- scenario and finding associations;
- whether execution used a local fixture or an external target;
- backend limitations.

A Lightpanda receipt proves what the nonvisual browser procedure observed during that execution. It does not prove rendering fidelity or that a remote site will remain unchanged.

## Initial acceptance proof

The first Lightpanda slice should use a local JavaScript-driven fixture that:

1. loads asynchronously;
2. contains a form;
3. accepts non-secret test input;
4. changes page state after interaction;
5. renders a confirmation value;
6. exposes a deliberate failure mode.

The accepted workflow must:

- navigate, wait, fill, click, and extract;
- return structured output;
- validate postconditions;
- create an immutable receipt;
- fail honestly for invalid policy, timeout, malformed output, and failed assertions;
- replay ten times with the same normalized result and ten valid receipts;
- use zero LLM calls during routine replay.

## Relationship to the Switchyard pilot

The Switchyard validation should use the two execution lanes deliberately.

### Candidate Lightpanda checks

- accessible names on theme controls;
- disclosure state for the mobile menu;
- Escape-key behavior where supported;
- existence and reachability of required capabilities;
- structured content and semantic target presence;
- repeated nonvisual smoke paths.

### Required Playwright checks

- 320-pixel header overflow;
- breakpoint-neighborhood behavior;
- hero wrapping under stress;
- touch-target geometry;
- receipt identifier and destination wrapping;
- screenshot and trace evidence;
- reduced-motion rendering behavior;
- any visual or responsive compatibility claim.

The goal is not to force both tools into every scenario. It is to route each claim to the least expensive execution path that can prove it honestly.

## Development rule

Do not build a generic browser-backend abstraction before the Lightpanda lane proves useful.

Start with backend-specific packages and commands. Extract a common interface only after real shared behavior exists across Lightpanda and Playwright.
