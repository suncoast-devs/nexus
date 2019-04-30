import React from 'react'
import CohortModel from '../models/Cohort'

import history from '../../history'
import formToObject from '../../utils/formToObject'
import Form from './Form'

const cancel = event => {
  event.preventDefault()

  history.push('/cohorts')
}

const submit = event => {
  event.preventDefault()

  const updatedCohort = formToObject(event.target, new CohortModel({}))

  updatedCohort.save().then(() => {
    history.push('/cohorts')
  })
}

const NewCohort = props => {
  return <Form onSubmit={event => submit(event)} onCancel={event => cancel(event)} title="New Cohort" />
}

export default NewCohort
