import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

const metadataSchema = z
  .object({
    id: z.string().trim().min(1),
    title: z.string().trim().min(1).optional(),
    owner: z.string().trim().min(1).optional(),
    risk: z.enum(["low", "medium", "high", "critical"]).optional(),
    tags: z.array(z.string().trim().min(1)).optional(),
  })
  .passthrough();

const targetSchema = z
  .object({
    type: z.enum(["route", "component", "dialog", "workflow", "custom"]),
    route: z.string().trim().min(1).optional(),
    root: z.string().trim().min(1).optional(),
  })
  .passthrough()
  .superRefine((target, context) => {
    if (target.type === "route" && !target.route) {
      context.addIssue({
        code: "custom",
        path: ["route"],
        message: "A route target requires a route value.",
      });
    }
  });

const viewportSchema = z
  .object({
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    device_scale_factor: z.number().positive().optional(),
  })
  .passthrough();

const scenarioSchema = z
  .object({
    id: z.string().trim().min(1),
    fixture: z.string().trim().min(1).optional(),
    auth: z.string().trim().min(1).optional(),
    content_profile: z.string().trim().min(1).optional(),
    steps: z.array(z.record(z.string(), z.unknown())).optional(),
  })
  .passthrough();

const assertionSchema = z
  .object({
    id: z.string().trim().min(1),
    use: z.string().trim().min(1),
    severity: z.enum(["informational", "low", "medium", "high", "critical"]).optional(),
  })
  .passthrough();

export const interfaceContractSchema = z
  .object({
    version: z.literal("truing.dev/v0alpha1"),
    kind: z.literal("InterfaceContract"),
    metadata: metadataSchema,
    target: targetSchema,
    viewports: z.record(z.string().trim().min(1), viewportSchema).optional(),
    scenarios: z.array(scenarioSchema).min(1),
    regions: z.record(z.string().trim().min(1), z.unknown()).optional(),
    assertions: z.array(assertionSchema).min(1),
    human_review: z.unknown().optional(),
    release: z.unknown().optional(),
  })
  .passthrough()
  .superRefine((contract, context) => {
    const scenarioIds = contract.scenarios.map((scenario) => scenario.id);
    const duplicateScenarioIds = scenarioIds.filter(
      (id, index) => scenarioIds.indexOf(id) !== index,
    );

    for (const duplicateId of new Set(duplicateScenarioIds)) {
      context.addIssue({
        code: "custom",
        path: ["scenarios"],
        message: `Scenario id '${duplicateId}' is duplicated.`,
      });
    }

    const assertionIds = contract.assertions.map((assertion) => assertion.id);
    const duplicateAssertionIds = assertionIds.filter(
      (id, index) => assertionIds.indexOf(id) !== index,
    );

    for (const duplicateId of new Set(duplicateAssertionIds)) {
      context.addIssue({
        code: "custom",
        path: ["assertions"],
        message: `Assertion id '${duplicateId}' is duplicated.`,
      });
    }
  });

export type InterfaceContract = z.infer<typeof interfaceContractSchema>;

export interface ContractValidationIssue {
  path: string;
  message: string;
}

export interface ValidContractResult {
  ok: true;
  contract: InterfaceContract;
  normalized: string;
  fingerprint: string;
}

export interface InvalidContractResult {
  ok: false;
  issues: ContractValidationIssue[];
}

export type ContractValidationResult = ValidContractResult | InvalidContractResult;

function stableValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(stableValue);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, nestedValue]) => [key, stableValue(nestedValue)]),
    );
  }

  return value;
}

export function normalizeContract(contract: InterfaceContract): string {
  return `${JSON.stringify(stableValue(contract), null, 2)}\n`;
}

export function fingerprintContract(normalizedContract: string): string {
  return `sha256:${createHash("sha256").update(normalizedContract).digest("hex")}`;
}

export function parseContractText(text: string): ContractValidationResult {
  let document: unknown;

  try {
    document = parseYaml(text);
  } catch (error) {
    return {
      ok: false,
      issues: [
        {
          path: "$",
          message: error instanceof Error ? error.message : "Invalid YAML.",
        },
      ],
    };
  }

  const result = interfaceContractSchema.safeParse(document);

  if (!result.success) {
    return {
      ok: false,
      issues: result.error.issues.map((issue) => ({
        path: issue.path.length > 0 ? issue.path.join(".") : "$",
        message: issue.message,
      })),
    };
  }

  const normalized = normalizeContract(result.data);

  return {
    ok: true,
    contract: result.data,
    normalized,
    fingerprint: fingerprintContract(normalized),
  };
}

export async function loadContract(path: string): Promise<ContractValidationResult> {
  const text = await readFile(path, "utf8");
  return parseContractText(text);
}
