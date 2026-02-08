// the thing with theseACORD forms is that the fields are not always with the same consistent names, the names keep varying, therefore we need to provide a list of possible names for each field. These only contain the necessary fields which are key for taking decisions.
export const FIELD_MAPPING = {
  policyNumber: ["POLICY NUMBER", "POLICY NUMBER_2", "Text7"],

  insuredName: ["NAME OF INSURED First Middle Last"],

  dateOfLoss: ["DATE OF LOSS", "Text1"],
  // description not available to parse with pdf-lib, therefore getting that text from another similar text field in the form.
  description: [
    "DESCRIPTION OF ACCIDENT ACORD 101 Additional Remarks Schedule may be attached if more space is required",
    // use these for alternate values for filling in the fields.
    // "Text45",
    // "Text98",
  ],
  // this value simulated as mentioned in the readme.
  estimatedDamage: ["ESTIMATE AMOUNT", "ESTIMATE AMOUNT_2"],
};
