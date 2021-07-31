import React, { useContext } from 'react'

import { Cohort } from '@/components/models'
import useModelData from '@/hooks/useModelData'

import { ErrorsContext, addErrorsFromObject } from '@/components/Errors'

import history from '@/history'
import { formToObject } from '@/utils/formToObject'
import { Tabs, TabHeader, Tab } from '@/components/utils/Tabs'
import { LoadingIndicator } from '@/components/utils/LoadingIndicator'
import { EditCohortForm } from '@/components/cohorts/EditCohortForm'
import { EditEnrollment } from '@/components/cohorts/EditEnrollment'
import { EditCohortCalendar } from '@/components/cohorts/EditCohortCalendar'
import { EditAttendancePage } from '../attendance/EditAttendancePage'
import { EditHomeworksPage } from '../homeworks/EditHomeworksPage'
import { CohortProgressReportsPage } from '../progressreports/CohortProgressReportsPage'
import { LectureVideosPage } from '../lecturevideos/LectureVideosPage'
import useProfile from '@/hooks/useProfile'
import { GradebookPage } from '../gradebook/GradebookPage'

export function EditCohortPage({ id }) {
  const { profile } = useProfile()
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

          <TabHeader>Homeworks</TabHeader>
          <Tab>
            <EditHomeworksPage cohort_id={cohort.id} />
          </Tab>

          <TabHeader>GradeBook</TabHeader>
          <Tab>
            <GradebookPage cohort_id={cohort.id} />
          </Tab>

          <TabHeader>Attendance</TabHeader>
          <Tab>
            <EditAttendancePage cohort_id={cohort.id} />
          </Tab>

          <TabHeader>Progress Reports</TabHeader>
          <Tab>
            <CohortProgressReportsPage cohort_id={cohort.id} allowNew />
          </Tab>

          <TabHeader>Lecture Videos</TabHeader>
          <Tab>
            <LectureVideosPage cohortId={cohort.id} profile={profile} />
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
