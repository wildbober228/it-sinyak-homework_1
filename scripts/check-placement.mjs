import { basename, dirname, join, relative, resolve, sep } from "node:path";

import { collectUsages } from "./collect-usages.mjs";
import {
  collectLayoutProblems,
  featureOf,
  layerOf,
} from "./feature-layout.mjs";

const ROOT = resolve(import.meta.dirname, "..");
const SRC = join(ROOT, "src");

const display = (path) => relative(ROOT, path).split(sep).join("/");

function commonFeature(dirs) {
  const [first, ...rest] = [...dirs].map((dir) => featureOf(dir).split(sep));
  let length = first.length;

  for (const parts of rest) {
    let index = 0;
    while (index < length && parts[index] === first[index]) index += 1;
    length = index;
  }

  let ancestor = first.slice(0, length).join(sep);

  while (basename(ancestor) === "components") ancestor = dirname(ancestor);

  return ancestor;
}

function findProblem(file, source, name, importerDirs) {
  const where = `${display(file)}: «${name}»`;
  const isUsedInside =
    source.match(new RegExp(`\\b${name}\\b`, "g")).length > 1;

  if (importerDirs.size === 0) {
    return isUsedInside
      ? `${where} никто не импортирует — убери export`
      : `${where} нигде не используется — удали`;
  }

  const moduleDir = dirname(file);
  const target = commonFeature(
    isUsedInside ? [...importerDirs, moduleDir] : importerDirs,
  );

  return target === featureOf(moduleDir)
    ? null
    : `${where} — ближайшая общая фича мест использования ${display(target)}/, перенеси в ${display(join(target, layerOf(moduleDir)))}/`;
}

const problems = collectLayoutProblems(SRC).map(
  ([file, problem]) => `${display(file)}: ${problem}`,
);
let checked = 0;

for (const [file, { source, exports }] of collectUsages(SRC)) {
  for (const [name, importerDirs] of exports) {
    const problem = findProblem(file, source, name, importerDirs);

    checked += 1;
    if (problem) problems.push(problem);
  }
}

if (problems.length > 0) {
  console.error(problems.join("\n"));
  console.error(
    `\nНарушений: ${problems.length}. Правила — ARCHITECTURE.md, разделы 1 и 2.`,
  );
  process.exit(1);
}

console.log(
  `Раскладка и размещение экспортов: проверено ${checked}, нарушений нет.`,
);
