import { readdirSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";

const ROOT_MODULE = /^(types|constants)\.ts$/;
const LOGIC_ONLY_MODULE = /^(use\w+|\w+Store|api|utils)\.ts$/;

const isTasksDir = (dir) =>
  basename(dir) === "tasks" && basename(dirname(dir)) === "logic";

export function featureOf(dir) {
  if (isTasksDir(dir)) return dirname(dirname(dir));
  if (basename(dir) === "logic") return dirname(dir);

  return dir;
}

export const layerOf = (dir) => relative(featureOf(dir), dir);

export const isTask = (file) => isTasksDir(dirname(file));

function findLayoutProblem(file) {
  const name = basename(file);
  const layer = layerOf(dirname(file));

  if (name.endsWith(".d.ts")) return null;

  if (layer === "") {
    if (basename(dirname(file)) === "tasks") {
      return "таски лежат в logic/tasks/";
    }

    return name.endsWith(".ts") && !ROOT_MODULE.test(name)
      ? "логика фичи лежит в logic/"
      : null;
  }

  if (name.endsWith(".tsx")) {
    return "в logic/ нет разметки, перенеси в корень фичи";
  }

  if (ROOT_MODULE.test(name)) {
    return "types.ts и constants.ts лежат в корне фичи";
  }

  return layer !== "logic" && LOGIC_ONLY_MODULE.test(name)
    ? "в logic/tasks/ только таски, перенеси в logic/"
    : null;
}

export function collectLayoutProblems(srcDir) {
  return readdirSync(srcDir, { recursive: true })
    .filter((file) => /\.tsx?$/.test(file))
    .map((file) => join(srcDir, file))
    .map((file) => [file, findLayoutProblem(file)])
    .filter(([, problem]) => problem);
}
