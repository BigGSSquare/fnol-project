// the thing with theseACORD forms is that the fields are not always with the same consistent names, the names keep varying, therefore we need to provide a list of possible names for each field. These only contain the necessary fields which are key for taking decisions.
export const FIELD_MAPPING = {
  policyNumber: ["POLICY NUMBER", "POLICY NUMBER_2", "Text2"],

  insuredName: ["NAME OF INSURED First Middle Last"],

  dateOfLoss: ["DATE OF LOSS", "Text1"],

  description: [
  "Text45",
  "Text98"
]
,

  estimatedDamage: ["ESTIMATE AMOUNT", "ESTIMATE AMOUNT_2"],
};
