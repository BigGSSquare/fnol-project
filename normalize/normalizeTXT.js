export function normalizeTXT(parsed) {
  return {
    policyNumber: parsed.policyNumber || null,
    insuredName: parsed.insuredName || null,
    dateOfLoss: parsed.dateOfLoss || null,
    description: parsed.description || null,
    estimatedDamage: parsed.estimatedDamage
      ? Number(parsed.estimatedDamage)
      : null,
  };
}
