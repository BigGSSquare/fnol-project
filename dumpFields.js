export function dumpAllFields(form) {
  const fields = form.getFields();

  for (const field of fields) {
    const name = field.getName();
    const type = field.constructor.name;

    let value = null;

    if (field.getText) {
      value = field.getText();
    } else if (field.isChecked) {
      value = field.isChecked();
    }

    console.log({
      name,
      type,
      value,
    });
  }
}
