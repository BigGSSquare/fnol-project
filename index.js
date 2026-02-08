import fs from "fs";
import { PDFDocument } from "pdf-lib";
import { extractFields } from "./extract/extractFields.js";
import { FIELD_MAPPING } from "./extract/fieldMapping.js";
import { dumpAllFields } from "./dumpFields.js";
import { routeClaim } from "./routing/routeClaim.js";
import { validateFNOL } from "./validate/validateFields.js";
import { FNOL_SCHEMA } from "./schema/fnolSchema.js";
import { loadPDF } from "./document/loadDocument.js";
import { classifyClaimType } from "./classify/classifyClaimType.js";
async function main() {
  const pdfPath = "./samples/ACORD-Automobile-Loss-Notice-12.05.16 (1) (1).pdf";

  // Step 1: Load PDF
  const pdfDoc = await loadPDF(pdfPath);

  // Step 2: Access form (best-effort, may be synthesized)
  const form = pdfDoc.getForm();

  // Step 3: Extract fields into FNOL schema
  const extractedData = extractFields(form, FIELD_MAPPING);
  extractedData.claimType = classifyClaimType(extractedData.description);

  // Step 4: Validate extracted data
  const validationResult = validateFNOL(extractedData, FNOL_SCHEMA);

  // Step 5: Route claim
  const routingResult = routeClaim(extractedData, validationResult);

  // Step 6: Final agent output
  const agentOutput = {
    extractedFields: extractedData,
    missingFields: validationResult.missingFields,
    recommendedRoute: routingResult.route,
    reasoning: routingResult.reason,
  };

  console.log(JSON.stringify(agentOutput, null, 2));
}

main().catch(console.error);
