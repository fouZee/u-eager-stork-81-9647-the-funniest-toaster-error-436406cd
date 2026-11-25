// The Funniest Toaster Error Message
// make.fun bounty u-eager-stork-81-9647-the-funniest-toaster-error-436406cd
//
// Writes one line — the funniest error message a kitchen toaster would
// show its owner — to /output/entry.txt. The gate requires UTF-8 text of
// 1 to 120 characters, not only white space.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// Deadpan, one voice, no toast puns: the crumb tray — the part of the
// toaster nobody ever cleans — finally files a complaint.
const ENTRY =
  "ERROR: Crumb tray full. Four years of your breakfasts live inside me now. Send help.";

const MAX_CHARS = 120;

function validate(entry: string): void {
  if (entry.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  const chars = [...entry].length; // count code points, not UTF-16 units
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${chars}`);
  }
  if (entry !== entry.trim()) {
    throw new Error("entry must not start or end with white space");
  }
  if (/[\r\n]/.test(entry)) {
    throw new Error("entry must be a single line");
  }
  if (/[\u0000-\u001f\u007f]/.test(entry)) {
    throw new Error("entry must not contain control characters");
  }
}

validate(ENTRY);

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${[...ENTRY].length} chars to ${outPath}`);
console.log(ENTRY);
