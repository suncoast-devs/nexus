import React from 'react'
import { Section, Container } from 'reactbulma'

import { Cohort } from '../models'
import useModelData from '../../hooks/useModelData'

import history from '../../history'
import formToObject from '../../utils/formToObject'
import Form from './Form'
import EditUnits from './EditUnits'
import EditCohortCalendar from './EditCohortCalendar'
import { Tabs, TabHeader, Tab } from '../Tabs'

const EditCohort = props => {
  const {
    match: {
      params: { id }
    }
  } = props

  const [loadingCohort, cohort] = useModelData(() => Cohort.find(id))

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

  if (loadingCohort) {
    return <></>
  }

  return (
    <Section>
      <Container>
        <h1 className="title">Edit Cohort: {cohort.name}</h1>

        <Tabs>
          <TabHeader>Cohort</TabHeader>
          <Tab>
            <Form
              onSubmit={event => submit(event, cohort)}
              cohort={cohort}
              onCancel={event => cancel(event)}
              title=""
            />
          </Tab>

          <TabHeader>Units</TabHeader>
          <Tab>
            <EditUnits cohort={cohort} />
          </Tab>

          <TabHeader>Calendar</TabHeader>
          <Tab>
            <EditCohortCalendar cohort_id={cohort.id} />
          </Tab>
        </Tabs>
      </Container>
    </Section>
  )
}

export default EditCohort
