// SPDX-License-Identifier: MIT
// One-Line Office Joke: 24-Hour Sprint
// Writes exactly one joke about office life to the output file and nothing else.
// Fully deterministic: the same joke on every run, no randomness, no dates,
// no environment reads beyond the output path.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const JOKE =
  "My out-of-office reply has done more of my job than I have this year, and HR just nominated it for Employee of the Month.";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

const outputPath =
  process.argv[2] ?? process.env.OUTPUT_PATH ?? "/output/entry.txt";

// Validate the joke before writing anything.
const codePoints = [...JOKE];
if (codePoints.length < 1 || codePoints.length > 200) {
  fail(`joke must be 1-200 characters, got ${codePoints.length}`);
}
if (JOKE.trim().length === 0) {
  fail("joke must not be only whitespace");
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  fail("joke must be exactly one line");
}

// Create the output directory only; never delete or remove it
// (the grading sandbox mounts it).
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, JOKE, "utf8");

// Read the file back and verify it matches the validated joke byte for byte.
const written = readFileSync(outputPath, "utf8");
if (written !== JOKE) {
  fail("verification failed: file contents do not match the joke");
}
