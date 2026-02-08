export function inspectPDF(pdfDoc) {
    // returns an object which'll have true if the form is an Acroform (has acroform in the catalog)
    //for this fnol document it'll return false because the original document is not an acroform doc but pdf-lib converts it to acroform doc during calling its getDocument() function.
  return {
    hasOriginalAcroForm: pdfDoc.catalog.lookupMaybe("AcroForm") !== undefined,
  };
}
