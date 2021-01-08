import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import moment from 'moment'

import history from '@/history'
import useModelData from '@/hooks/useModelData'
import { Cohort, ProgressReport } from '@/components/models'
import Person from '@/components/Person'
import { LeftRight } from '@/components/utils/LeftRight'

const NewProgressReport = ({ cohort_id }) => {
  const { data: cohort } = useModelData(
    () => Cohort.includes(['people', 'student_enrollments', 'homeworks', 'progress_reports']).find(cohort_id),
    new Cohort(),
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

  const panelClass = selected =>
    cx('panel-block', 'has-cursor-pointer', 'is-block', {
      'has-background-success': selected,
      'has-text-white': selected,
    })

  const DateRange = () => (
    <div className="columns">
      <div className="column is-half">
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">From</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="date"
                  value={startDate}
                  onChange={event => setStartDate(event.target.value)}
                />
              </p>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">To</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="date"
                  value={endDate}
                  onChange={event => setEndDate(event.target.value)}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const Homeworks = () => (
    <nav className="panel">
      <p className="panel-heading has-background-info has-text-white">Homework</p>
      {sortedHomeworks.map(homework => {
        const selected = selectedHomeworkIDs.includes(homework.id)

        return (
          <div key={homework.id} className={panelClass(selected)} onClick={() => toggleHomework(selected, homework)}>
            <LeftRight left={homework.title} right={<span>{selected && <i className="fas fa-check" />}</span>} />
          </div>
        )
      })}
    </nav>
  )

  const SelectPeople = () => (
    <nav className="panel">
      <p className="panel-heading has-background-info has-text-white">People</p>
      {sortedPeople.map(person => {
        const selected = selectedPeopleIDs.includes(person.id)

        return (
          <div key={person.id} className={panelClass(selected)} onClick={() => togglePerson(selected, person)}>
            <LeftRight
              left={<Person person={person} />}
              right={<span>{selected && <i className="fas fa-check" />}</span>}
            />
          </div>
        )
      })}
    </nav>
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

        <DateRange />

        <div className="columns">
          <div className="column is-one-quarter">
            <SelectPeople />
          </div>
          <div className="column is-one-quarter">
            <Homeworks />
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewProgressReport
