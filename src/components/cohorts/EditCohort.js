import React, { useContext } from 'react'

import { Cohort } from '@/components/models'
import useModelData from '@/hooks/useModelData'

import { ErrorsContext, addErrorsFromObject } from '@/components/Errors'

import history from '@/history'
import formToObject from '@/utils/formToObject'
import { Tabs, TabHeader, Tab } from '@/components/utils/Tabs'
import Form from './Form'
import EditEnrollment from './EditEnrollment'
import EditCohortCalendar from './EditCohortCalendar'

const EditCohort = ({ id }) => {
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
    return <></>
  }

  return (
    <section className="section">
      <div className="container">
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

export default EditCohort
