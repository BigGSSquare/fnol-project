import path from "path";

import { loadPDF } from "./document/loadDocument.js";
import { extractFields } from "./extract/extractFields.js";
import { FIELD_MAPPING } from "./extract/fieldMapping.js";

import { classifyClaimType } from "./classify/classifyClaimType.js";
import { validateFNOL } from "./validate/validateFields.js";
import { FNOL_SCHEMA } from "./schema/fnolSchema.js";
import { routeClaim } from "./routing/routeClaim.js";
import { loadTXT } from "./load/loadTXT.js";
import { parseTXT } from "./parse/parseTXT.js";
import { normalizeTXT } from "./normalize/normalizeTXT.js";
async function main() {
  const inputPath = "./samples/sample.txt";

  const extension = path.extname(inputPath).toLowerCase();

  let extractedData;
  // loading the document
  if (extension === ".pdf") {
    const pdfDoc = await loadPDF(inputPath);

    //form access(to the maximum extent possible.)
    const form = pdfDoc.getForm();

    extractedData = extractFields(form, FIELD_MAPPING);
  } else if (extension === ".txt") {
    const content = loadTXT(inputPath);
    const parsed = parseTXT(content);
    extractedData = normalizeTXT(parsed);
  } else {
    throw new Error(`Unsupported file type: ${extension}`);
  }

  // classification using the description from the form.
  extractedData.claimType = classifyClaimType(extractedData.description);

  // validation
  const validationResult = validateFNOL(extractedData, FNOL_SCHEMA);

  //routing
  const routingResult = routeClaim(extractedData, validationResult);

  // output object
  const agentOutput = {
    extractedFields: extractedData,
    missingFields: validationResult.missingFields,
    recommendedRoute: routingResult.route,
    reasoning: routingResult.reason,
  };

  console.log(JSON.stringify(agentOutput, null, 2));
}

main().catch(console.error);
