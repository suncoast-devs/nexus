import React, { useState } from 'react'
import { Section, Container } from 'reactbulma'

import { Cohort } from '../models'
import ErrorNotification from '../ErrorNotification'
import history from '../../history'
import formToObject from '../../utils/formToObject'
import Form from './Form'

const NewCohort = () => {
  const [errors, setErrors] = useState({})
  const cohort = new Cohort({ startDate: '2019-05-01', endDate: '2019-05-20' })

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
    <Section>
      <Container>
        <ErrorNotification errors={errors} onClear={() => setErrors({})} />
        <Form cohort={cohort} onSubmit={event => submit(event)} onCancel={event => cancel(event)} title="New Cohort" />
      </Container>
    </Section>
  )
}

export default NewCohort
