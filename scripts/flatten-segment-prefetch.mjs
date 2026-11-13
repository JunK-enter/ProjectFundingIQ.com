// Static export writes segment prefetch payloads as `__next.a/b/__PAGE__.txt`,
// but the client router requests `__next.a.b.__PAGE__.txt`. Copy each nested
// payload to the dotted filename so plain static hosts can serve it.
import { copyFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve(process.argv[2] ?? "out");

async function filesUnder(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? filesUnder(full) : [full];
    }),
  );
  return nested.flat();
}

async function walk(dir) {
  let copied = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      for (const file of await filesUnder(full)) {
        const parts = path.relative(full, file).split(path.sep);
        const target = path.join(dir, [entry.name, ...parts].join("."));
        const exists = await stat(target).then(() => true, () => false);
        if (!exists) {
          await copyFile(file, target);
          copied += 1;
        }
      }
    } else {
      copied += await walk(full);
    }
  }
  return copied;
}

const copied = await walk(outDir);
console.log(`flatten-segment-prefetch: ${copied} file(s) copied in ${outDir}`);
