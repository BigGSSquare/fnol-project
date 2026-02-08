export function classifyClaimType(description) {
  if (!description || typeof description !== "string") {
    return "unknown";
  }

  const text = description.toLowerCase();

  if (
    text.includes("injury") ||
    text.includes("hurt") ||
    text.includes("hospital")
  ) {
    return "injury";
  }

  if (
    text.includes("vehicle") ||
    text.includes("car") ||
    text.includes("accident")
  ) {
    return "vehicle";
  }

  if (text.includes("property") || text.includes("damage")) {
    return "property";
  }

  return "general";
}
