import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import { Button, Section, Control, Container, Title, Field } from 'reactbulma'

import { client } from '../Apollo'
import history from '../../history'
import formToObject from '../../utils/formToObject'
import { InputField } from '../Fields'

const CREATE_COHORT = gql`
  mutation createCohort($cohort: CohortInput!) {
    createCohort(cohort: $cohort) {
      cohort {
        id
        name
        description
        people {
          id
          fullName
          givenName
          familyName
        }
      }
    }
  }
`

const cancel = event => {
  event.preventDefault()
  history.push('/cohorts')
}

const submit = (event, createCohortMutation) => {
  event.preventDefault()

  const variables = { cohort: formToObject(event.target) }

  createCohortMutation({
    variables,
    update: proxy => {
      // Hack to clear out the cache
      client.resetStore()

      history.push('/cohorts')
    }
  })
}

const NewCohort = props => {
  const createCohortMutation = useMutation(CREATE_COHORT)

  return (
    <form onSubmit={event => submit(event, createCohortMutation)}>
      <Section>
        <Container>
          <Title>New Cohort</Title>
        </Container>
        <Section>
          <Container>
            <InputField name="name" />
            <InputField name="description" />

            <Field grouped>
              <Control>
                <Button link>Submit</Button>
              </Control>
              <Control>
                <Button onClick={cancel}>Cancel</Button>
              </Control>
            </Field>
          </Container>
        </Section>
      </Section>
    </form>
  )
}

export default NewCohort
