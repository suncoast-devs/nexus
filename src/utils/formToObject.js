const formToObject = (form, oldObject = {}) => {
  const fields = [...form.elements].map(element => element.name).filter(Boolean)

  const newObject = fields.reduce((object, field) => {
    object[field] = form[field].value
    return object
  }, {})

  return Object.assign(oldObject, newObject)
}

export default formToObject
