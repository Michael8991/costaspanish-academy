import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const messagesRoot = path.resolve("messages");
const locales = ["en", "es"];

const valueType = (value) => {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
};

function compare(left, right, currentPath, issues) {
  const leftType = valueType(left);
  const rightType = valueType(right);

  if (leftType !== rightType) {
    issues.push(`${currentPath}: type mismatch (${leftType} / ${rightType})`);
    return;
  }

  if (leftType === "object") {
    const leftKeys = Object.keys(left);
    const rightKeys = Object.keys(right);

    for (const key of leftKeys) {
      const childPath = currentPath ? `${currentPath}.${key}` : key;
      if (!(key in right)) issues.push(`${childPath}: missing in es`);
      else compare(left[key], right[key], childPath, issues);
    }

    for (const key of rightKeys) {
      if (!(key in left)) {
        const childPath = currentPath ? `${currentPath}.${key}` : key;
        issues.push(`${childPath}: missing in en`);
      }
    }
  }

  if (leftType === "array") {
    if (left.length !== right.length) {
      issues.push(`${currentPath}: array length mismatch (${left.length} / ${right.length})`);
    }
    const sharedLength = Math.min(left.length, right.length);
    for (let index = 0; index < sharedLength; index += 1) {
      compare(left[index], right[index], `${currentPath}[${index}]`, issues);
    }
  }

  if (leftType === "string") {
    const variables = (value) => [...value.matchAll(/\{([\w.-]+)(?:,\s*\w+)?\}/g)]
      .map((match) => match[1])
      .sort();
    const leftVariables = variables(left);
    const rightVariables = variables(right);
    if (leftVariables.join("|") !== rightVariables.join("|")) {
      issues.push(`${currentPath}: ICU variable mismatch (${leftVariables.join(", ")} / ${rightVariables.join(", ")})`);
    }
  }
}

const filesByLocale = await Promise.all(
  locales.map(async (locale) => (await readdir(path.join(messagesRoot, locale)))
    .filter((file) => file.endsWith(".json")))
);
const files = [...new Set(filesByLocale.flat())].sort();
const issues = [];

for (const file of files) {
  const paths = locales.map((locale) => path.join(messagesRoot, locale, file));
  const presence = filesByLocale.map((localeFiles) => localeFiles.includes(file));
  if (!presence[0]) {
    issues.push(`${file}: file missing in en`);
    continue;
  }
  if (!presence[1]) {
    issues.push(`${file}: file missing in es`);
    continue;
  }

  const [english, spanish] = await Promise.all(paths.map(async (filePath) => {
    try {
      return JSON.parse(await readFile(filePath, "utf8"));
    } catch (error) {
      issues.push(`${path.relative(process.cwd(), filePath)}: invalid JSON (${error.message})`);
      return null;
    }
  }));

  if (english && spanish) compare(english, spanish, file, issues);
}

if (issues.length > 0) {
  console.error(`Translation parity failed with ${issues.length} issue(s):`);
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exitCode = 1;
} else {
  console.log(`Translation parity passed for ${files.length} EN/ES file pairs.`);
}
