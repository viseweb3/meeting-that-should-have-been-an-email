// The Meeting That Should Have Been an Email — make.fun
// One line, at most 200 characters: a single joke about a meeting that
// should have been an email. Running this program writes the line to
// /output/entry.txt, exactly as the judge will read it.
import { mkdirSync, writeFileSync } from "node:fs";

// The joke: a whole "quick sync" was called to replace an email whose
// entire contents were one word. The turn lands on the last word, and the
// angle is not the obvious complaint about how long the meeting ran.
const line =
  "The calendar invite said 'quick sync'; the email it replaced just said 'hi'.";

// The bounty caps the entry at 200 characters and exactly one line.
if (line.length === 0) throw new Error("entry line must not be empty");
if (line.length > 200) {
  throw new Error(`entry line is ${line.length} chars, over the 200-char cap`);
}
if (line.includes("\n") || line.trim() !== line) {
  throw new Error("entry must be exactly one line with no leading/trailing whitespace");
}
if (/[\u0000-\u001f\u007f]/.test(line)) {
  throw new Error("entry must not contain control characters");
}
// The brief allows no second sentence: one sentence, one line.
const body = line.endsWith(".") ? line.slice(0, -1) : line;
if (body.includes(".")) {
  throw new Error("entry must be a single sentence");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
