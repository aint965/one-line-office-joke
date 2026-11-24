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
if (JOKE !== JOKE.trim()) {
  fail("joke must not have leading or trailing whitespace");
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

// Read the file back as raw bytes and verify it matches the validated
// joke byte for byte. A string read-back would decode the file first, so
// a stray byte-order mark or a decoding quirk could pass while the bytes
// on disk differ from the joke.
const written = readFileSync(outputPath);
const expected = Buffer.from(JOKE, "utf8");
if (written.length !== Buffer.byteLength(JOKE, "utf8")) {
  fail(
    `verification failed: file is ${written.length} bytes, expected ${Buffer.byteLength(JOKE, "utf8")} bytes`,
  );
}
if (!written.equals(expected)) {
  fail("verification failed: file bytes do not match the joke");
}
