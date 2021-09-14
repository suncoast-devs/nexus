import React from 'react'

import { Cohort, UnProxyRecord } from '@/components/models'

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
import { GradebookPage } from '../gradebook/GradebookPage'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'

export function EditCohortPage() {
  const { id } = useParams<{ id: string }>()

  const {
    isLoading,
    refetch,
    data: cohort = new Cohort(),
  } = useQuery(['cohort', id], () =>
    Cohort.includes([
      'homeworks',
      'lecture_videos',
      { progress_reports: ['homeworks', 'people'] },
      { student_enrollments: 'person' },
      { cohort_dates: { attendance_records: 'person' } },
    ])
      .find(id)
      .then(UnProxyRecord)
  )
  const cancel = () => {
    history.push('/cohorts')
  }

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    const updatedCohort = formToObject(event.target, cohort)

    updatedCohort.save().then(response => {
      if (response) {
        history.push('/cohorts')
      } else {
        // Do something with errors
      }
    })
  }

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Edit Cohort: {cohort.name}</h1>

        <Tabs>
          <TabHeader>Cohort</TabHeader>
          <Tab>
            <EditCohortForm onSubmit={submit} cohort={cohort} onCancel={cancel} title="" />
          </Tab>

          <TabHeader>Enrollment</TabHeader>
          <Tab>
            <EditEnrollment cohort={cohort} />
          </Tab>

          <TabHeader>Homeworks</TabHeader>
          <Tab>
            <EditHomeworksPage cohort={cohort} refetch={refetch} />
          </Tab>

          <TabHeader>GradeBook</TabHeader>
          <Tab>
            <GradebookPage cohort_id={cohort.key()} />
          </Tab>

          <TabHeader>Attendance</TabHeader>
          <Tab>
            <EditAttendancePage cohort={cohort} refetch={refetch} />
          </Tab>

          <TabHeader>Progress Reports</TabHeader>
          <Tab>
            <CohortProgressReportsPage cohort={cohort} allowNew />
          </Tab>

          <TabHeader>Lecture Videos</TabHeader>
          <Tab>
            <LectureVideosPage cohort={cohort} />
          </Tab>

          <TabHeader>Calendar</TabHeader>
          <Tab>
            <EditCohortCalendar cohort={cohort} refetch={refetch} />
          </Tab>
        </Tabs>
      </div>
    </section>
  )
}
