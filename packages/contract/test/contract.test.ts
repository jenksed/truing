import { describe, expect, it } from "vitest";
import { parseContractText } from "../src/index.js";

const validContract = `
version: truing.dev/v0alpha1
kind: InterfaceContract
metadata:
  id: event-detail
target:
  type: route
  route: /events/:eventId
scenarios:
  - id: delivered
assertions:
  - id: required-regions
    use: regions.present
`;

describe("parseContractText", () => {
  it("normalizes and fingerprints a valid contract", () => {
    const result = parseContractText(validContract);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.contract.metadata.id).toBe("event-detail");
    expect(result.fingerprint).toMatch(/^sha256:[a-f0-9]{64}$/);
  });

  it("rejects a route target without a route", () => {
    const result = parseContractText(`
version: truing.dev/v0alpha1
kind: InterfaceContract
metadata:
  id: broken
target:
  type: route
scenarios:
  - id: default
assertions:
  - id: present
    use: regions.present
`);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues).toContainEqual({
      path: "target.route",
      message: "A route target requires a route value.",
    });
  });

  it("rejects duplicate scenario identifiers", () => {
    const result = parseContractText(`
version: truing.dev/v0alpha1
kind: InterfaceContract
metadata:
  id: duplicate-scenarios
target:
  type: component
scenarios:
  - id: default
  - id: default
assertions:
  - id: present
    use: regions.present
`);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues.some((issue) => issue.message.includes("duplicated"))).toBe(true);
  });
});
