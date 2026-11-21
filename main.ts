// main.ts — "Make the AI judge feel awe" entry for make.fun.
//
// Writes one short relaxing text to entry.txt in the output
// directory (MAKEFUN_OUTPUT_DIR when set, falling back to /output).
// Deterministic: the same bytes on every run. No input, no network,
// no other output. After writing, it reads the output back and throws
// unless its byte length matches the text, so a truncated or failed
// write can never pass silently.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const text = [
  "The lighthouse turns, and turns again.",
  "Above it, the stars are still arriving —",
  "light that set out before anyone alive",
  "had a name for it — only now reaching us.",
].join("\n");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const output = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(output, text, "utf8");

// Read the written file back and confirm it holds every byte of the
// text: a truncated or failed write must fail loudly, never pass
// silently as a short entry.txt.
const written = readFileSync(output, "utf8");
if (written.length !== text.length) {
  throw new Error(
    `entry.txt is ${written.length} characters, expected ${text.length} characters`,
  );
}
