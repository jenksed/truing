# Technology and language strategy

**Status:** accepted for IR-1; conditional beyond IR-1  
**Controlling decisions:** `D-007`, `D-012` in [`DECISIONS.md`](DECISIONS.md)  
**Active release:** [`MVP.md`](MVP.md)

## Decision summary

Truing will continue using the existing Node.js and TypeScript workspace for IR-1.

C, Zig, and Rust are not authorized as replacement implementation languages for the first release. They remain evaluated options for a later, bounded native component when a measured requirement justifies one.

The current preference order is:

```text
Current orchestration and IR-1: TypeScript
General-purpose native Truing core: Rust
Deep Clay or Lightpanda systems integration: Zig
Small direct Clay module: C
```

This is not a permanent rejection of native code. It is a sequencing decision: prove the contract-to-receipt product before optimizing or relocating the core.

---

## Why Clay does not currently require a native rewrite

[Clay](https://github.com/nicbarker/clay) is a high-performance 2D UI layout library written in C. It is relevant to Truing in two different ways.

### Conceptual grounding

Clay demonstrates that difficult UI behavior becomes more understandable when the correct representation is chosen and work is separated into explicit passes.

Truing adopts that method:

- represent durable interface relationships rather than incidental pixels;
- separate intent discovery from authorization;
- separate execution routing from observation;
- separate observations from assertions;
- separate deterministic facts from model and human judgment;
- finalize evidence before producing a delivery decision;
- keep the core small until demonstrated use requires expansion.

This influence does not require linking Clay into the executable.

### Possible future executable dependency

Clay would become an actual implementation dependency only if Truing begins computing or rendering layout itself, for example:

- a native evidence-review application;
- an offline contract visualizer;
- a deterministic responsive-intent simulator;
- a renderer for Truing-owned reports or evidence graphs;
- a layout-analysis kernel that is not delegated to a browser.

IR-1 does none of these. Chromium calculates the rendered layout, Playwright observes it, and Lightpanda supplies qualified nonvisual browser evidence.

Clay cannot materially accelerate browser startup, Chromium layout, screenshots, page JavaScript, font loading, or browser compatibility checks. The current Truing-owned work—contract parsing, validation, hashing, assertion evaluation, process coordination, and JSON/Markdown output—has no demonstrated native-performance bottleneck.

---

## IR-1 workload and language fit

IR-1 primarily requires:

- YAML and JSON processing;
- schema and reference validation;
- CLI behavior;
- filesystem and subprocess coordination;
- Playwright integration;
- Lightpanda process integration;
- small deterministic assertion functions;
- evidence hashing;
- JSON and Markdown receipt generation;
- automated tests and CI.

TypeScript is a strong fit for this workload because:

- the contract and CLI already exist in TypeScript;
- Playwright officially supports JavaScript and TypeScript;
- browser results, contracts, findings, and receipts are structured data;
- the first release prioritizes iteration and product validation over compute throughput;
- introducing a second language would add build, distribution, debugging, and agent-maintenance costs before providing measured value.

The first release should therefore treat native code as deferred scope, not optional implementation discretion.

---

## Language assessment

## TypeScript

### Best fit

- contract and receipt schemas;
- CLI and developer workflow;
- Playwright orchestration;
- Lightpanda process invocation;
- assertions over structured observations;
- evidence manifests and report generation;
- rapid contract-model iteration.

### Limitations

- less suitable for a future single native binary;
- less control over memory representation and allocation;
- not the first choice for intensive native computation;
- native addons introduce cross-platform packaging complexity.

### Decision

Use for IR-1 and retain as the orchestration layer unless evidence shows it is inadequate.

## Rust

### Best fit

- a safe general-purpose native kernel;
- contract compilation or assertion evaluation at scale;
- evidence hashing and policy processing;
- high-concurrency local execution;
- a standalone cross-platform CLI;
- safe wrappers around C libraries such as Clay.

### Costs

- an additional toolchain and distribution matrix;
- FFI boundaries for Clay or Node integration;
- duplication or migration of mature TypeScript browser orchestration;
- more work for contributors and coding agents during a still-changing product model.

### Conditional preference

Rust is the preferred candidate if Truing later needs a broad native core that is not dominated by direct Zig or Lightpanda integration.

## Zig

### Best fit

- direct C interoperability;
- embedding Clay with minimal impedance;
- small native binaries;
- allocator and memory-layout control;
- direct systems-level work near Lightpanda, which is implemented in Zig;
- a native component where C integration is the dominant requirement.

### Costs

- a smaller ecosystem for browser orchestration, schema tooling, and application-level data workflows;
- more project-owned infrastructure for parsing, testing, packaging, and cross-platform support;
- risk of choosing the language because adjacent projects use it rather than because Truing requires it.

### Conditional preference

Zig is the preferred candidate if direct Clay integration, direct Lightpanda embedding, or low-level C interoperability becomes the dominant workload.

Using Lightpanda as an external executable or CDP/PandaScript backend does not require Truing itself to be written in Zig.

## C

### Best fit

- one tightly bounded module that directly embeds `clay.h`;
- minimal runtime and maximum control;
- a narrow ABI intended for Rust, Zig, WebAssembly, or another host.

### Costs

- manual memory and lifetime management;
- weaker fit for contract parsing, policy, process coordination, receipts, and safe evolution;
- a larger correctness and maintenance burden for the majority of Truing’s workload.

### Decision

Do not implement the full project in C. Use C only for a bounded Clay-specific module if a future accepted plan requires one.

---

## Preferred native integration sequence

When a native capability is justified, prefer the least coupled boundary that can prove its value.

### 1. WebAssembly module

Use when:

- the function is deterministic and self-contained;
- browser or Node portability matters;
- the data boundary can remain compact;
- Clay or another C-compatible library can be compiled cleanly to WebAssembly.

Benefits:

- avoids a full project rewrite;
- keeps the TypeScript orchestration layer;
- creates an inspectable, replaceable kernel;
- reduces native-addon packaging burden.

### 2. Standalone Rust or Zig process

Use when:

- the function needs native filesystem, process, memory, or concurrency capabilities;
- a JSON or similarly bounded stdin/stdout protocol is adequate;
- independent versioning, testing, sandboxing, and replacement are valuable.

This is the preferred first native experiment because it avoids in-process ABI coupling.

### 3. Node-API addon

Use only when:

- process or WebAssembly boundaries create measured overhead or capability problems;
- in-process calls materially improve an accepted workload;
- cross-platform native packaging has an explicit owner and test matrix.

Node-API provides an ABI-stable native-addon boundary, but it does not remove the toolchain and distribution costs of native binaries.

### 4. Whole-project native migration

A full migration is the last option, not the starting point. It requires a separate owner-approved plan covering:

- measured benefit;
- browser integration;
- contract and receipt compatibility;
- migration and rollback;
- contributor impact;
- supported platforms;
- package and binary distribution;
- CI and release evidence.

---

## Triggers for revisiting the language decision

A native spike may be proposed when at least one of these conditions is supported by evidence.

### T-001 — Measured compute bottleneck

Contract compilation, assertion evaluation, evidence processing, or receipt generation consumes enough CPU or memory to affect real verification workflows.

Required evidence:

- reproducible benchmark;
- representative workload;
- identified hot path;
- target improvement;
- comparison against a reasonable TypeScript optimization.

### T-002 — Single-binary distribution becomes important

Users or supported environments reject a Node runtime or require a self-contained binary.

Required evidence:

- concrete distribution requirement;
- supported operating-system matrix;
- install and update expectations;
- comparison with packaging the existing Node application.

### T-003 — Clay becomes an executable product dependency

An accepted feature requires Truing to compute or render its own layout.

Required evidence:

- product acceptance criterion;
- explanation of why browser layout or ordinary report rendering is insufficient;
- bounded Clay integration design;
- proof that the feature belongs in Truing rather than a separate application.

### T-004 — Direct Lightpanda embedding is necessary

The external executable, PandaScript, or CDP boundary cannot support an accepted requirement.

Required evidence:

- failed or inadequate external integration;
- exact missing capability;
- maintenance and compatibility implications of embedding;
- upstream contribution or extension options considered first.

### T-005 — Large-scale evidence processing

Observation or evidence volume makes memory representation and throughput a material constraint.

Required evidence:

- representative dataset size;
- measured memory and runtime behavior;
- retention and streaming requirements;
- proof that storage or algorithm changes alone are insufficient.

### T-006 — Hardened native policy boundary

Untrusted workflows require a security boundary that cannot be provided adequately by the existing process model.

Required evidence:

- threat model;
- specific missing isolation property;
- sandbox and operating-system alternatives considered;
- independent security review plan.

---

## Non-triggers

The following do not justify changing language by themselves:

- Clay is written in C;
- Lightpanda is written in Zig;
- native code is theoretically faster;
- a single binary sounds cleaner;
- a systems language is more interesting;
- a coding agent proposes a rewrite;
- future scale is possible but unmeasured;
- the current TypeScript code is small enough to rewrite cheaply.

A language change must solve an accepted product or operational requirement, not express architectural taste.

---

## Bounded future spike

A future native experiment must be isolated from IR-1 and answer one question only.

Example:

> Can a Clay-backed WebAssembly or standalone Rust/Zig module produce a useful deterministic Truing visualization or layout analysis that the existing browser evidence cannot provide?

A valid spike must define:

- one input schema;
- one output schema;
- one representative fixture;
- one benchmark or behavioral acceptance criterion;
- one integration boundary;
- one rollback path;
- a fixed time and scope limit;
- a conclusion of adopt, defer, or reject.

The spike must not begin as a repository-wide migration.

---

## Agent boundary

Coding agents must not:

- replace TypeScript during IR-1;
- add a Rust, Zig, C, or WebAssembly workspace speculatively;
- introduce FFI, Node-API, or native build tooling without an active accepted task;
- claim performance benefit without measurement;
- treat Clay’s architecture as a requirement to use Clay’s implementation;
- embed or fork Lightpanda merely because both projects could use Zig.

A native proposal must cite one of the triggers above, record evidence in [`DECISIONS.md`](DECISIONS.md), update the active plan, and receive owner approval before implementation.

## Current conclusion

Keep TypeScript for IR-1.

Borrow Clay’s representation and explicit-pass discipline now. Integrate Clay, Rust, Zig, C, or WebAssembly later only when Truing has a proven native workload or an accepted feature that requires native layout computation.
