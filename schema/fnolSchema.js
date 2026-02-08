export const FNOL_SCHEMA = {
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
