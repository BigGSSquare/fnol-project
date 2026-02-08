export function validateFNOL(data, schema) {
  const missingFields = [];
  const warnings = [];

  for (const field in schema) {
    const rules = schema[field];
    const value = data[field];

    // Required field missing
    if (
      rules.required &&
      (value === null || value === undefined || value === "")
    ) {
      missingFields.push(field);
      continue;
    }

    // Basic type checks
    if (value != null) {
      if (rules.type === "number" && typeof value !== "number") {
        warnings.push(`${field} is not a number`);
      }

      if (rules.type === "string" && typeof value !== "string") {
        warnings.push(`${field} is not a string`);
      }
    }
  }

  return {
    isComplete: missingFields.length === 0,
    missingFields,
    warnings,
  };
}
