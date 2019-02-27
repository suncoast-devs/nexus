import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo-hooks'
import { Button, Section, Control, Container, Title, Field } from 'reactbulma'

import history from '../history'
import formToObject from '../utils/formToObject'
import { InputField } from './Fields'

const FIND_COHORT = gql`
  query cohort($id: ID!) {
    cohort(id: $id) {
      id
      name
      description
    }
  }
`

const UPDATE_COHORT = gql`
  mutation updateCohort($id: ID!, $cohort: CohortInput!) {
    updateCohort(id: $id, cohort: $cohort) {
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

const submit = (event, id, updateCohortMutation) => {
  event.preventDefault()

  const variables = { id, cohort: formToObject(event.target) }

  updateCohortMutation({
    variables,
    update: () => {
      history.push('/cohorts')
    }
  })
}

const Cohort = props => {
  const updateCohortMutation = useMutation(UPDATE_COHORT)

  const {
    loading,
    data: { cohort }
  } = useQuery(FIND_COHORT, { variables: { id: props.match.params.id } })

  if (loading) {
    return <></>
  }

  return (
    <form
      onSubmit={event =>
        submit(event, props.match.params.id, updateCohortMutation)
      }
    >
      <Section>
        <Container>
          <Title>Edit Cohort</Title>
        </Container>
        <Section>
          <Container>
            <InputField defaultObject={cohort} name="name" />
            <InputField defaultObject={cohort} name="description" />

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

export default Cohort
