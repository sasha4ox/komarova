import { readdirSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const articlesDir = join(root, "src/content/articles");
const catalog = readFileSync(join(root, "src/content/catalog.ts"), "utf8");
const services = readFileSync(join(root, "src/content/services.ts"), "utf8");

const articleFiles = readdirSync(articlesDir).filter(
  (file) => file.endsWith(".ts") && file !== "helpers.ts" && file !== "index.ts",
);

let makeArticleCount = 0;
for (const file of articleFiles) {
  const source = readFileSync(join(articlesDir, file), "utf8");
  makeArticleCount += [...source.matchAll(/makeArticle\(/g)].length;
}

const serviceCount = [...services.matchAll(/id: "/g)].length;
const catalogSlugs = [...catalog.matchAll(/"[a-z0-9-]+"/g)].length;

if (articleFiles.length !== 10) {
  console.error(`Expected 10 article files, got ${articleFiles.length}`);
  process.exit(1);
}

if (makeArticleCount !== 100) {
  console.error(`Expected 100 makeArticle() calls, got ${makeArticleCount}`);
  process.exit(1);
}

if (serviceCount < 10) {
  console.error(`Expected at least 10 services, got ${serviceCount}`);
  process.exit(1);
}

console.log(
  `Content engine OK: ${serviceCount} service ids, ${makeArticleCount} articles in ${articleFiles.length} files, catalog tokens=${catalogSlugs}.`,
);
console.log("Add a new page by inserting a catalog slug + makeArticle() record. Routes, sitemap, and metadata read the catalog.");
