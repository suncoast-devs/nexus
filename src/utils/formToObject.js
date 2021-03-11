export function formToObject(form, oldObject = {}) {
  const fields = [...form.elements].map(element => element.name).filter(Boolean)

  const newObject = fields.reduce((object, field) => {
    if (form[field].type === 'checkbox') {
      object[field] = form[field].checked
    } else {
      object[field] = form[field].value
    }
    return object
  }, {})

  return Object.assign(oldObject, newObject)
}
