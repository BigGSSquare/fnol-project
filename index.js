import fs from "fs";
import { PDFDocument } from "pdf-lib";
import { extractFields } from "./extract/extractFields.js";
import { FIELD_MAPPING } from "./extract/fieldMapping.js";
import { dumpAllFields } from "./dumpFields.js";
import { validateFNOL } from "./validate/validateFields.js";
import { FNOL_SCHEMA } from "./schema/fnolSchema.js";
const bytes = fs.readFileSync(
  "./samples/ACORD-Automobile-Loss-Notice-12.05.16 (1) (1).pdf",
);
const pdfDoc = await PDFDocument.load(bytes);

const form = pdfDoc.getForm();

const extracted = extractFields(form, FIELD_MAPPING);
console.log(extracted);
const validationResult = validateFNOL(extracted, FNOL_SCHEMA);

console.log(validationResult);



