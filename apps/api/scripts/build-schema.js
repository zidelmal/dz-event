import fs from "fs";
import path from "path";

const base = "prisma";
const mainFile = path.join(base, "schema.prisma");
const modelsDir = path.join(base, "models");

let header = fs.readFileSync(mainFile, "utf8");

header = header.split("// MODELS_START")[0].trim();

let content = `${header}\n\n// MODELS_START\n`;

fs.readdirSync(modelsDir).forEach((file) => {
  if (file.endsWith(".prisma")) {
    const modelContent = fs.readFileSync(path.join(modelsDir, file), "utf8");
    content += `\n\n// >>> ${file}\n${modelContent}`;
  }
});

fs.writeFileSync(mainFile, content);