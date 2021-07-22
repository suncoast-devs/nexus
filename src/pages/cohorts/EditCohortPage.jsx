import React, { useContext } from 'react'

import { Cohort } from '/src//components/models'
import useModelData from '/src//hooks/useModelData'

import { ErrorsContext, addErrorsFromObject } from '/src//components/Errors'

import history from '/src//history'
import { formToObject } from '/src//utils/formToObject'
import { Tabs, TabHeader, Tab } from '/src//components/utils/Tabs'
import { LoadingIndicator } from '/src//components/utils/LoadingIndicator'
import { EditCohortForm } from '../../components/cohorts/EditCohortForm'
import { EditEnrollment } from '../../components/cohorts/EditEnrollment'
import { EditCohortCalendar } from '../../components/cohorts/EditCohortCalendar'

export function EditCohortPage({ id }) {
  const { loading, data: cohort } = useModelData(() => Cohort.selectExtra(['units']).find(id))
  const [errors, setErrors] = useContext(ErrorsContext)

  const cancel = event => {
    event.preventDefault()

    history.push('/cohorts')
  }

  const submit = (event, cohort) => {
    event.preventDefault()

    const updatedCohort = formToObject(event.target, cohort)

    updatedCohort.save().then(response => {
      if (response) {
        history.push('/cohorts')
      } else {
        addErrorsFromObject(errors, setErrors, updatedCohort)
      }
    })
  }

  if (loading) {
    return <LoadingIndicator />
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Edit Cohort: {cohort.name}</h1>

        <Tabs>
          <TabHeader>Cohort</TabHeader>
          <Tab>
            <EditCohortForm
              onSubmit={event => submit(event, cohort)}
              cohort={cohort}
              onCancel={event => cancel(event)}
              title=""
            />
          </Tab>

          <TabHeader>Enrollment</TabHeader>
          <Tab>
            <EditEnrollment cohort={cohort} />
          </Tab>

          <TabHeader>Calendar</TabHeader>
          <Tab>
            <EditCohortCalendar cohort_id={cohort.id} />
          </Tab>
        </Tabs>
      </div>
    </section>
  )
}
