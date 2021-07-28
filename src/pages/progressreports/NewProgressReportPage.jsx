import React, { useState, useEffect } from 'react'
import moment from 'moment'

import history from '@/history'
import useModelData from '@/hooks/useModelData'
import { Cohort, ProgressReport } from '@/components/models'
import { LeftRight } from '@/components/utils/LeftRight'
import { DateRange } from '@/components/progressreports/DateRange'
import { Homeworks } from '@/components/progressreports/Homeworks'
import { SelectPeople } from '@/components/progressreports/SelectPeople'

export function NewProgressReportPage({ cohort_id }) {
  const { data: cohort } = useModelData(
    () => Cohort.includes(['people', 'student_enrollments', 'homeworks', 'progress_reports']).find(cohort_id),
    new Cohort()
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
        .map(person => person.id)
    )

    const allAssignedHomeworkIDs = cohort.homeworks
      .filter(homework => homework.assigned && homework.countsTowardsCompletion)
      .map(homework => homework.id)

    const sortedReports = cohort.progressReports.sort((a, b) => a.endDate.localeCompare(b.endDate))

    const endOfMostRecentReport =
      sortedReports.length > 0 ? sortedReports[sortedReports.length - 1].endDate : cohort.startDate

    setSelectedHomeworkIDs(allAssignedHomeworkIDs)
    setStartDate(endOfMostRecentReport)
    setEndDate(moment().format('YYYY-MM-DD'))
  }, [cohort.id])

  const [selectedPeopleIDs, setSelectedPeopleIDs] = useState([])
  const [selectedHomeworkIDs, setSelectedHomeworkIDs] = useState([])
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  const sortedPeople = cohort.people.sort((a, b) => a.fullName.localeCompare(b.fullName))
  const sortedHomeworks = cohort.homeworks.sort((a, b) => a.createdAt.localeCompare(b.createdAt))

  const toggleHomework = (selected, homework) =>
    setSelectedHomeworkIDs(
      selected ? selectedHomeworkIDs.filter(id => id !== homework.id) : selectedHomeworkIDs.concat(homework.id)
    )

  const togglePerson = (selected, person) =>
    setSelectedPeopleIDs(
      selected ? selectedPeopleIDs.filter(id => id !== person.id) : selectedPeopleIDs.concat(person.id)
    )

  const create = () => {
    let progressReport = new ProgressReport()
    progressReport.cohort_id = cohort_id
    progressReport.idsOfHomeworks = selectedHomeworkIDs
    progressReport.idsOfPeople = selectedPeopleIDs
    progressReport.startDate = startDate
    progressReport.endDate = endDate
    progressReport.save().then(response => {
      history.push(`/progress-reports/${progressReport.id}/0`)
    })
  }

  return (
    <section className="section">
      <div className="container">
        <LeftRight
          left={<h1 className="title">New Progress Report for {cohort.name}</h1>}
          right={
            <button className="button is-link" onClick={() => create()}>
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
