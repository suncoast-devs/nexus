import { ApplicationRecord } from '@/components/models/ApplicationRecord'

// export function formToObject(form, oldObject = {}) {
//   const fields = [...form.elements].map(element => element.name).filter(Boolean)
//   const newObject = fields.reduce((object, field) => {
//     if (form[field].type === 'checkbox') {
//       object[field] = form[field].checked
//     } else {
//       object[field] = form[field].value
//     }
//     return object
//   }, {})

//   return Object.assign(oldObject, newObject)
// }

export function formToObject<ObjectType extends ApplicationRecord>(form: any, oldObject: ObjectType) {
  const fields = [...form.elements].map(element => element.name).filter(Boolean)

  const newObject = fields.reduce((object, field) => {
    if (form[field].type === 'checkbox' || (form[field].dataset && form[field].dataset.formBooleanField === 'true')) {
      object[field] = form[field].checked
    } else {
      object[field] = form[field].value
    }

    object[field] = object[field] === '' ? null : object[field]

    return object
  }, {})

  return Object.assign(oldObject, newObject) as ObjectType
}
