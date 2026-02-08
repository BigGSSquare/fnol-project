export const FNOL_SCHEMA = {
  claimType: {
    required: true,
    type: "string",
  },
  policyNumber: {
    required: true,
    type: "string",
  },
  insuredName: {
    required: true,
    type: "string",
  },
  dateOfLoss: {
    required: true,
    type: "string",
  },
  description: {
    required: true,
    type: "string",
  },
  estimatedDamage: {
    required: true,
    type: "number",
  },
};
