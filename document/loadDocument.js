import fs from "fs";
import { PDFDocument } from "pdf-lib";

export async function loadPDF(filePath) {
  const bytes = fs.readFileSync(filePath);
  // since PDFDocument.load returns a promise, made the function async so that the caller can await it.
  return PDFDocument.load(bytes);
}
