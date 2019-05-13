import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'

import history from '../../history'
import useModelData from '../../hooks/useModelData'
import { ProgressReport, StudentProgressReport, Assignment } from '../models'
import GenerateStudentProgressReport from './GenerateStudentProgressReport'
import PersonComponent from '../Person'

const ProgressReportIndex = ({ id, index }) => {
  const { loading: loadingProgressReport, data: progressReport, reload: reloadProgressReport } = useModelData(
    () =>
      ProgressReport.includes([
        'homeworks',
        { student_progress_reports: 'person' },
        { people: { assignments: 'homework' } }
      ]).find(id),
    null
  )

  if (loadingProgressReport) {
    return <></>
  }

  const peopleOrderedByIndex = progressReport.idsOfPeople.map(id =>
    progressReport.people.find(person => parseInt(person.id) === id)
  )

  const next = () => {
    // Move to the next report if it is there, or to the 'complete' page otherwise
    if (index + 1 < progressReport.idsOfPeople.length) {
      history.push(`/progress-reports/${id}/${index + 1}`)
    } else {
      history.push(`/progress-reports/${id}/complete`)
    }
  }

  const SidebarEntry = ({ person, active, sidebarIndex }) => {
    const studentProgressReport =
      progressReport.studentProgressReports.find(r => r.person.id === person.id) ||
      new StudentProgressReport({ content: {} })

    return (
      <Link to={`/progress-reports/${id}/${sidebarIndex}`}>
        <div className={cx('panel-block is-block', { 'has-background-grey-light': active, 'has-text-white': active })}>
          <PersonComponent person={person} />
          {studentProgressReport.reportImageUrl ? (
            <img
              alt={`progress report for ${person.fullName}`}
              style={{ opacity: '0.5' }}
              src={studentProgressReport.reportImageUrl}
            />
          ) : (
            <span>None</span>
          )}
        </div>
      </Link>
    )
  }

  const Sidebar = ({ index }) => {
    return (
      <nav className="panel">
        <p className="panel-heading has-background-info has-text-white">People</p>
        {peopleOrderedByIndex.map((person, sidebarIndex) => (
          <SidebarEntry
            key={sidebarIndex}
            person={person}
            active={sidebarIndex === index}
            sidebarIndex={sidebarIndex}
          />
        ))}
        <Link to={`/progress-reports/${id}/complete`}>
          <div
            className={cx('panel-block is-block', {
              'has-background-grey-light': index === 'complete',
              'has-text-white': index === 'complete'
            })}
          >
            Done
          </div>
        </Link>
      </nav>
    )
  }

  const Editor = ({ completed, index }) => {
    const person = progressReport.people.find(person => parseInt(person.id) === progressReport.idsOfPeople[index])

    const assignmentsForReport = progressReport.homeworks.map(homework => {
      const assignment =
        person.assignments.find(assignment => assignment.homework.id === homework.id) || new Assignment()
      assignment.homework = homework

      return assignment
    })

    const studentProgressReport =
      progressReport.studentProgressReports.find(report => report.person.id === person.id) ||
      new StudentProgressReport({ content: {} })

    const onCreate = ({ doingWell, improve, attendanceIssues, image }) => {
      studentProgressReport.progress_report_id = id
      studentProgressReport.person_id = person.id
      studentProgressReport.content = { doingWell, improve, attendanceIssues }
      studentProgressReport.reportImageData = image.dataURL
      studentProgressReport.save().then(response => {
        if (response) {
          next()
        }
      })
    }

    return (
      <GenerateStudentProgressReport
        initialStep={completed || studentProgressReport.reportImageUrl ? 'complete' : 'editing'}
        completed={completed}
        reportImageUrl={studentProgressReport.reportImageUrl}
        content={studentProgressReport.content}
        fromDate={progressReport.startDate}
        toDate={progressReport.endDate}
        person={person}
        assignments={assignmentsForReport}
        onCreate={onCreate}
        onSkip={next}
      />
    )
  }

  const Complete = ({ completed }) => {
    if (completed) {
      return <></>
    }

    const markCompleted = () => {
      progressReport.completed = true
      progressReport.save().then(success => {
        if (success) {
          reloadProgressReport()
        }
      })
    }

    return (
      <button className="button is-primary" onClick={markCompleted}>
        Complete
      </button>
    )
  }

  const Completed = ({ completed }) => {
    if (!completed) {
      return <></>
    }

    return (
      <article className="message is-info">
        <div className="message-header">
          <p>Completed</p>
        </div>
        <div className="message-body">This progress report is complete and submitted to students.</div>
      </article>
    )
  }

  return (
    <section className="section">
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar index={index} />
        </div>
        <div className="column is-four-fifths">
          <Completed completed={progressReport.completed} />
          {index === 'complete' ? (
            <Complete completed={progressReport.completed} />
          ) : (
            <Editor completed={progressReport.completed} index={parseInt(index)} />
          )}
        </div>
      </div>
    </section>
  )
}

export default ProgressReportIndex
