import { createContext } from 'react'

export const ErrorsContext = createContext()

export function addErrors(errors, setErrors, newErrors) {
  newErrors.forEach(error => {
    if (!errors.includes(error)) {
      setErrors(errors.concat(newErrors))
    }
  })
}

export function addErrorsFromObject(errors, setErrors, object) {
  addErrors(
    errors,
    setErrors,
    Object.values(object.errors).map(error => error.fullMessage)
  )
}

export function removeError(errors, setErrors, errorToRemove) {
  setErrors(errors.filter(error => error !== errorToRemove))
}
