import assert from "node:assert/strict";
import test from "node:test";

test("portfolio API route source exposes GET and POST handlers", async () => {
  const source = await import("node:fs/promises").then((fs) => fs.readFile("src/app/api/portfolio/route.ts", "utf8"));

  assert.match(source, /export async function GET/);
  assert.match(source, /export async function POST/);
});
