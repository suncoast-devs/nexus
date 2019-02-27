import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'

import { client } from '../Apollo'
import history from '../../history'
import formToObject from '../../utils/formToObject'
import Form from './Form'

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
    <Form
      onSubmit={event => submit(event, createCohortMutation)}
      onCancel={event => cancel(event)}
      title="New Cohort"
    />
  )
}

export default NewCohort
