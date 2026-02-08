import fs from "fs";

export function loadTXT(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  return content;
}
