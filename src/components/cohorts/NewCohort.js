import React, { useState } from 'react'

import { Cohort } from '../models'
import ErrorNotification from '../utils/ErrorNotification'
import history from '../../history'
import formToObject from '../../utils/formToObject'
import Form from './Form'

const NewCohort = () => {
  const [errors, setErrors] = useState({})
  const cohort = new Cohort({})

  const cancel = event => {
    event.preventDefault()

    history.push('/cohorts')
  }

  const submit = event => {
    event.preventDefault()

    const updatedCohort = formToObject(event.target, cohort)

    updatedCohort.save().then(response => {
      if (response) {
        history.push('/cohorts')
      } else {
        setErrors(cohort.errors)
      }
    })
  }

  return (
    <section className="section">
      <div className="container">
        <ErrorNotification errors={errors} onClear={() => setErrors({})} />
        <Form cohort={cohort} onSubmit={event => submit(event)} onCancel={event => cancel(event)} title="New Cohort" />
      </div>
    </section>
  )
}

export default NewCohort
