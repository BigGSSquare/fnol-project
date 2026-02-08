export function routeClaim(extracted, validation) {
  // Rule 1: Missing required fields
  if (!validation.isComplete) {
    return {
      route: "MANUAL_REVIEW",
      reason: "Missing required FNOL fields",
    };
  }

  const description = extracted.description?.toLowerCase() || "";

  // Rule 2: Fraud indicators
  if (
    description.includes("fraud") ||
    description.includes("staged") ||
    description.includes("inconsistent")
  ) {
    return {
      route: "INVESTIGATION",
      reason: "Potential fraud indicators found in incident description",
    };
  }

  // Rule 3: Injury claims
  if (extracted.claimType === "injury") {
    return {
      route: "SPECIALIST_QUEUE",
      reason: "Injury-related claim requires specialist handling",
    };
  }

  // Rule 4: Fast-track low damage
  if (extracted.estimatedDamage < 25000) {
    return {
      route: "FAST_TRACK",
      reason: "Low estimated damage",
    };
  }

  // Rule 5: Default
  return {
    route: "STANDARD_PROCESSING",
    reason: "Complete FNOL with moderate/high damage",
  };
}
