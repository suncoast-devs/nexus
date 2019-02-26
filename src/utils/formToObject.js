const formToObject = form => {
  const fields = [...form.elements].map(element => element.name).filter(Boolean)

  return fields.reduce((object, field) => {
    object[field] = form[field].value
    return object
  }, {})
}

export default formToObject
