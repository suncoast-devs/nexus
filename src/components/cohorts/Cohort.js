import React from 'react'
import CohortModel from '../models/Cohort'
import useModelData from '../../hooks/useModelData'

import history from '../../history'
import formToObject from '../../utils/formToObject'
import Form from './Form'

const cancel = event => {
  event.preventDefault()

  history.push('/cohorts')
}

const submit = (event, cohort) => {
  event.preventDefault()

  const updatedCohort = formToObject(event.target, cohort)

  updatedCohort.save().then(() => {
    history.push('/cohorts')
  })
}

const Cohort = props => {
  const [loadingCohort, cohort] = useModelData(() => CohortModel.find(props.match.params.id))

  if (loadingCohort) {
    return <></>
  }

  return (
    <Form
      onSubmit={event => submit(event, cohort)}
      cohort={cohort}
      onCancel={event => cancel(event)}
      title="Edit Cohort"
    />
  )
}

export default Cohort
