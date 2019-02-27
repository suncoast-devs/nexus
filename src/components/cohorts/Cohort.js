import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from 'react-apollo-hooks'

import history from '../../history'
import formToObject from '../../utils/formToObject'
import Form from './Form'

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
    error,
    data: { cohort }
  } = useQuery(FIND_COHORT, { variables: { id: props.match.params.id } })

  if (loading) {
    return <></>
  }

  if (error) {
    history.push('/cohorts')
    return <></>
  }

  return (
    <Form
      onSubmit={event =>
        submit(event, props.match.params.id, updateCohortMutation)
      }
      cohort={cohort}
      onCancel={event => cancel(event)}
      title="Edit Cohort"
    />
  )
}

export default Cohort
