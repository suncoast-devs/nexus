import { createContext } from 'react'

export const ErrorsContext = createContext()

export const addErrors = (errors, setErrors, newErrors) => {
  newErrors.forEach(error => {
    if (!errors.includes(error)) {
      setErrors(errors.concat(newErrors))
    }
  })
}

export const addErrorsFromObject = (errors, setErrors, object) => {
  addErrors(errors, setErrors, Object.values(object.errors).map(error => error.fullMessage))
}

export const removeError = (errors, setErrors, errorToRemove) => {
  setErrors(errors.filter(error => error !== errorToRemove))
}
