// Проверяет правило из ARCHITECTURE.md (раздел 2): каждый экспорт не-UI
// модуля лежит в ближайшем общем предке всех мест, где он используется.
import { basename, dirname, join, relative, resolve, sep } from "node:path";

import { collectUsages } from "./collect-usages.mjs";

const ROOT = resolve(import.meta.dirname, "..");

const display = (path) => relative(ROOT, path).split(sep).join("/");

function commonAncestor(dirs) {
  const [first, ...rest] = [...dirs].map((dir) => dir.split(sep));
  let length = first.length;

  for (const parts of rest) {
    let index = 0;
    while (index < length && parts[index] === first[index]) index += 1;
    length = index;
  }

  let ancestor = first.slice(0, length).join(sep);

  // `components/` — не фича: общий код её детей принадлежит фиче-владельцу.
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
  const target = commonAncestor(
    isUsedInside ? [...importerDirs, moduleDir] : importerDirs,
  );

  return target === moduleDir
    ? null
    : `${where} — ближайший общий предок мест использования ${display(target)}/, перенеси туда`;
}

const problems = [];
let checked = 0;

for (const [file, { source, exports }] of collectUsages(join(ROOT, "src"))) {
  for (const [name, importerDirs] of exports) {
    const problem = findProblem(file, source, name, importerDirs);

    checked += 1;
    if (problem) problems.push(problem);
  }
}

if (problems.length > 0) {
  console.error(problems.join("\n"));
  console.error(
    `\nНарушений размещения: ${problems.length}. Правило — ARCHITECTURE.md, раздел 2.`,
  );
  process.exit(1);
}

console.log(`Размещение экспортов: проверено ${checked}, нарушений нет.`);
