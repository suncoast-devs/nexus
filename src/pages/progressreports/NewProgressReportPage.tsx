import React, { useState, useEffect } from 'react'
import moment from 'moment'

import history from '@/history'
import { Cohort, Homework, Person, ProgressReport, UnProxyRecord } from '@/components/models'
import { LeftRight } from '@/components/utils/LeftRight'
import { DateRange } from '@/components/progressreports/DateRange'
import { Homeworks } from '@/components/progressreports/Homeworks'
import { SelectPeople } from '@/components/progressreports/SelectPeople'
import { useParams } from 'react-router'
import { useQuery } from 'react-query'

export function NewProgressReportPage() {
  const { id: cohortId } = useParams<{ id: string }>()

  const [selectedPeopleIDs, setSelectedPeopleIDs] = useState<string[]>([])
  const [selectedHomeworkIDs, setSelectedHomeworkIDs] = useState<string[]>([])
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const { data: cohort = new Cohort() } = useQuery(['cohort', cohortId], () =>
    Cohort.includes(['people', 'student_enrollments', 'homeworks', 'progress_reports'])
      .find(cohortId)
      .then(UnProxyRecord)
  )

  useEffect(() => {
    setSelectedPeopleIDs(
      cohort.people
        // Only include people who should get progress reports generated
        .filter(person =>
          cohort.studentEnrollments.some(
            enrollment => Number(enrollment.personId) === Number(person.id) && enrollment.generateProgressReport
          )
        )
        .map(person => person.key())
    )

    const allAssignedHomeworkIDs = cohort.homeworks
      .filter(homework => homework.assigned && homework.countsTowardsCompletion)
      .map(homework => homework.key())

    const sortedReports = cohort.progressReports.sort((a, b) => a.endDate.localeCompare(b.endDate))

    const endOfMostRecentReport =
      sortedReports.length > 0 ? sortedReports[sortedReports.length - 1].endDate : cohort.startDate

    setSelectedHomeworkIDs(allAssignedHomeworkIDs)
    setStartDate(endOfMostRecentReport)
    setEndDate(moment().format('YYYY-MM-DD'))
  }, [cohort.id])

  const sortedPeople = cohort.people.sort((a, b) => a.fullName.localeCompare(b.fullName))
  const sortedHomeworks = cohort.homeworks.sort((a, b) => a.createdAt.localeCompare(b.createdAt))

  function toggleHomework(selected: boolean, homework: Homework) {
    setSelectedHomeworkIDs(
      selected ? selectedHomeworkIDs.filter(id => id !== homework.id) : selectedHomeworkIDs.concat(homework.key())
    )
  }

  function togglePerson(selected: boolean, person: Person) {
    setSelectedPeopleIDs(
      selected ? selectedPeopleIDs.filter(id => id !== person.id) : selectedPeopleIDs.concat(person.key())
    )
  }

  function create() {
    let progressReport = new ProgressReport()
    progressReport.cohort_id = cohortId
    progressReport.idsOfHomeworks = selectedHomeworkIDs.map(Number)
    progressReport.idsOfPeople = selectedPeopleIDs.map(Number)
    progressReport.startDate = startDate
    progressReport.endDate = endDate
    progressReport.save().then(() => {
      history.push(`/progress-reports/${progressReport.id}/0`)
    })
  }

  return (
    <section className="section">
      <div className="container">
        <LeftRight
          left={<h1 className="title">New Progress Report for {cohort.name}</h1>}
          right={
            <button className="button is-primary" onClick={() => create()}>
              Create
            </button>
          }
        />

        <DateRange startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />

        <div className="columns">
          <div className="column is-one-quarter">
            <SelectPeople
              sortedPeople={sortedPeople}
              selectedPeopleIDs={selectedPeopleIDs}
              togglePerson={togglePerson}
            />
          </div>
          <div className="column is-one-quarter">
            <Homeworks
              sortedHomeworks={sortedHomeworks}
              selectedHomeworkIDs={selectedHomeworkIDs}
              toggleHomework={toggleHomework}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
