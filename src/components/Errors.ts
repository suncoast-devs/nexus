import { createContext } from 'react'

export const ErrorsContext = createContext<[string[], (errors: string[]) => void]>([[], (errors: string[]) => {}])

export function addErrors(errors: string[], setErrors: (errors: string[]) => void, newErrors: string[]) {
  newErrors.forEach(error => {
    if (!errors.includes(error)) {
      setErrors(errors.concat(newErrors))
    }
  })
}

export function addErrorsFromObject(
  errors: string[],
  setErrors: (errors: string[]) => void,
  object: { errors: { fullMessage: string }[] }
) {
  addErrors(
    errors,
    setErrors,
    Object.values(object.errors).map(error => error.fullMessage)
  )
}

export function removeError(errors: string[], setErrors: (errors: string[]) => void, errorToRemove: string) {
  setErrors(errors.filter(error => error !== errorToRemove))
}
