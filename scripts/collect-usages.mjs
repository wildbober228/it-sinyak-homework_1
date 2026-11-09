// Строит карту использования экспортов не-UI модулей:
// модуль → экспорт → папки файлов, которые его импортируют.
import { readdirSync, readFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";

const NON_UI_MODULE = /^(\w+Store|\w+StoreContext|types|utils|constants)\.ts$/;
const EXPORT_DECLARATION =
  /^export\s+(?:async\s+)?(?:const|let|function|class|type|interface|enum)\s+([\w$]+)/gm;
const NAMED_IMPORT =
  /import\s+(?:type\s+)?\{([^}]*)\}\s*from\s*["']([^"']+)["']/g;
const NAMESPACE_IMPORT = /import\s+\*\s+as\s+[\w$]+\s+from\s*["']([^"']+)["']/g;
const IMPORTED_NAME = /^(?:type\s+)?([\w$]+)/;

export function collectUsages(srcDir) {
  const files = readdirSync(srcDir, { recursive: true })
    .filter((file) => /\.tsx?$/.test(file))
    .map((file) => join(srcDir, file));

  const resolveImport = (importer, specifier) => {
    if (!specifier.startsWith(".")) return undefined;

    const base = resolve(dirname(importer), specifier);
    const index = join(base, "index.ts");
    const candidates = [base, `${base}.ts`, `${base}.tsx`, index];

    return candidates.find((candidate) => files.includes(candidate));
  };

  const usages = new Map();

  for (const file of files) {
    if (!NON_UI_MODULE.test(basename(file))) continue;

    const source = readFileSync(file, "utf8");
    const exports = new Map();

    for (const [, name] of source.matchAll(EXPORT_DECLARATION)) {
      exports.set(name, new Set());
    }

    usages.set(file, { source, exports });
  }

  for (const importer of files) {
    const source = readFileSync(importer, "utf8");

    for (const [, names, specifier] of source.matchAll(NAMED_IMPORT)) {
      const module = usages.get(resolveImport(importer, specifier));

      for (const part of module ? names.split(",") : []) {
        const name = IMPORTED_NAME.exec(part.trim())?.[1];
        module.exports.get(name)?.add(dirname(importer));
      }
    }

    for (const [, specifier] of source.matchAll(NAMESPACE_IMPORT)) {
      const module = usages.get(resolveImport(importer, specifier));

      for (const dirs of module?.exports.values() ?? []) {
        dirs.add(dirname(importer));
      }
    }
  }

  return usages;
}
