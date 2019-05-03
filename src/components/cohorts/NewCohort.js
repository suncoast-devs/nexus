import React from 'react'
import { Section, Container } from 'reactbulma'

import { Cohort } from '../models'
import history from '../../history'
import formToObject from '../../utils/formToObject'
import Form from './Form'

const cancel = event => {
  event.preventDefault()

  history.push('/cohorts')
}

const submit = event => {
  event.preventDefault()

  const updatedCohort = formToObject(event.target, new Cohort({}))

  console.log(updatedCohort)

  updatedCohort.save().then(response => {
    console.log(response)
    history.push('/cohorts')
  })
}

const NewCohort = () => {
  return (
    <Section>
      <Container>
        <Form onSubmit={event => submit(event)} onCancel={event => cancel(event)} title="New Cohort" showDates />
      </Container>
      >
    </Section>
  )
}

export default NewCohort
