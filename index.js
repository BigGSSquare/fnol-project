import fs from "fs";
import { PDFDocument } from "pdf-lib";

const bytes = fs.readFileSync(
  "./samples/ACORD-Automobile-Loss-Notice-12.05.16 (1) (1).pdf",
);
const pdfDoc = await PDFDocument.load(bytes);

// STEP 1 — strict detection
const originalAcroForm = pdfDoc.catalog.lookupMaybe("AcroForm") !== undefined;

console.log("Original AcroForm present:", originalAcroForm);

// STEP 2 — NOW touch the form
const form = pdfDoc.getForm();
const fields = form.getFields();

console.log("Fields after getForm():", fields.length);
