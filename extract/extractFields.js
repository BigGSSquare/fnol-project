import { simulateEstimatedDamage } from "../simulate/simulateEstimatedDamage.js";
export function extractFields(form, fieldMapping) {
  const extracted = {};

  // Step 1: flatten PDF fields into a lookup table
  const pdfFields = form.getFields();
  const fieldLookup = {};

  for (const field of pdfFields) {
    fieldLookup[field.getName()] = field;
  }

  // Step 2: map PDF fields → schema fields
  for (const schemaKey in fieldMapping) {
    const candidateNames = fieldMapping[schemaKey];
    let value = null;

    for (const pdfFieldName of candidateNames) {
      const field = fieldLookup[pdfFieldName];
      if (!field) continue;

      // Text fields
      if (field.getText) {
        const text = field.getText()?.trim();
        if (text) {
          value = text;
          break;
        }
      }

      // Checkboxes (optional handling)
      if (field.isChecked) {
        value = field.isChecked();
        break;
      }
    }

    extracted[schemaKey] = value;
  }

  // generating estimated damage as the estimated damage is updating only in the view and not updating in the docs field data map.
  if (extracted.estimatedDamage == null) {
    extracted.estimatedDamage = simulateEstimatedDamage();
  }

  return extracted;
}
