#!/usr/bin/env node

import { readdir, stat } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { Command } from "commander";
import { loadContract } from "@truing/contract";

const supportedExtensions = new Set([".yaml", ".yml", ".json"]);

async function collectContractFiles(inputPath: string): Promise<string[]> {
  const absolutePath = resolve(inputPath);
  const pathStat = await stat(absolutePath);

  if (pathStat.isFile()) {
    return supportedExtensions.has(extname(absolutePath).toLowerCase())
      ? [absolutePath]
      : [];
  }

  if (!pathStat.isDirectory()) return [];

  const entries = await readdir(absolutePath, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries
      .filter((entry) => !entry.name.startsWith("."))
      .map((entry) => collectContractFiles(resolve(absolutePath, entry.name))),
  );

  return nestedFiles.flat().sort();
}

async function checkContracts(paths: string[]): Promise<void> {
  const files = (await Promise.all(paths.map(collectContractFiles))).flat();
  if (files.length === 0) throw new Error("No contract files were found.");

  let failureCount = 0;

  for (const file of files) {
    const result = await loadContract(file);

    if (!result.ok) {
      failureCount += 1;
      console.error(`FAIL ${file}`);
      for (const issue of result.issues) {
        console.error(`  ${issue.path}: ${issue.message}`);
      }
      continue;
    }

    console.log(`PASS ${file}`);
    console.log(`  ${result.contract.metadata.id}`);
    console.log(`  ${result.fingerprint}`);
  }

  if (failureCount > 0) process.exitCode = 1;
}

const program = new Command()
  .name("truing")
  .description("Repository-native interface contracts and evidence.")
  .version("0.0.0");

const contract = program.command("contract").description("Work with interface contracts.");

contract
  .command("check")
  .description("Validate, normalize, and fingerprint contract files.")
  .argument("<paths...>", "Contract files or directories")
  .action(checkContracts);

program
  .command("about")
  .description("Explain the current Truing project boundary.")
  .action(() => {
    console.log(
      "Truing verifies declared interface intent through explainable evidence and explicit review boundaries.",
    );
  });

program.parseAsync().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
