import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'

import history from '@/history'
import useModelData from '@/hooks/useModelData'
import { ProgressReport, StudentProgressReport, Assignment } from '@/components/models'
import GenerateStudentProgressReport from './GenerateStudentProgressReport'
import PersonComponent from '@/components/Person'
import LoadingIndicator from '@/components/utils/LoadingIndicator'

const SidebarLink = ({ progressReport, progressReportBaseURL, index, person, sidebarIndex }) => {
  const studentProgressReport =
    progressReport.studentProgressReports.find(report => parseInt(report.person.id) === parseInt(person.id)) ||
    new StudentProgressReport({ content: {} })

  return (
    <Link key={sidebarIndex} to={`${progressReportBaseURL}/${sidebarIndex}`}>
      <div
        className={cx('panel-block is-block', {
          'has-background-grey-light': sidebarIndex === index,
          'has-text-white': sidebarIndex === index,
        })}
      >
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

const Sidebar = ({ progressReportBaseURL, progressReport, index, isOnCompletePage }) => {
  const peopleOrderedByIndex = progressReport
    .sortedIdsOfPeople()
    .map(personId => progressReport.people.find(person => parseInt(person.id) === parseInt(personId)))

  return (
    <nav className="panel">
      <p className="panel-heading has-background-info has-text-white">People</p>
      {peopleOrderedByIndex.map((person, sidebarIndex) => (
        <SidebarLink key={person.id} {...{ progressReport, progressReportBaseURL, index, person, sidebarIndex }} />
      ))}

      {!progressReport.completed && (
        <Link to={`${progressReportBaseURL}/complete`}>
          <div
            className={cx('panel-block is-block', {
              'has-background-grey-light': isOnCompletePage,
              'has-text-white': isOnCompletePage,
            })}
          >
            Done
          </div>
        </Link>
      )}
    </nav>
  )
}

const Editor = ({ progressReport, onSaveStudentReport, index, onSkip }) => {
  const person = progressReport.people.find(
    person => parseInt(person.id) === parseInt(progressReport.sortedIdsOfPeople()[index])
  )

  const assignmentsForReport = progressReport.homeworks.map(homework => {
    const assignment = person.assignments.find(assignment => assignment.homework.id === homework.id) || new Assignment()
    assignment.homework = homework

    return assignment
  })

  const studentProgressReport =
    progressReport.studentProgressReports.find(report => parseInt(report.person.id) === parseInt(person.id)) ||
    new StudentProgressReport({ content: {} })

  const onCreate = ({ doingWell, improve, attendanceIssues, image }) => {
    studentProgressReport.progressReportId = progressReport.id
    studentProgressReport.personId = person.id
    studentProgressReport.content = { doingWell, improve, attendanceIssues }
    studentProgressReport.reportImageData = image.dataURL
    studentProgressReport.save().then(onSaveStudentReport)
  }

  return (
    <GenerateStudentProgressReport
      completed={progressReport.completed}
      reportImageUrl={studentProgressReport.reportImageUrl}
      content={studentProgressReport.content}
      fromDate={progressReport.startDate}
      toDate={progressReport.endDate}
      person={person}
      assignments={assignmentsForReport}
      onCreate={onCreate}
      onSkip={onSkip}
    />
  )
}

const Main = ({ progressReport, index, isOnCompletePage, markProgressReportComplete, onSaveStudentReport, onSkip }) => {
  if (progressReport.completed) {
    if (isOnCompletePage) {
      return <></>
    }

    const idOfStudent = progressReport.sortedIdsOfPeople()[index]

    const studentProgressReport = progressReport.studentProgressReports.find(
      studentProgressReport => parseInt(studentProgressReport.personId) === parseInt(idOfStudent)
    )

    return (
      <>
        <article className="message is-info">
          <div className="message-header">
            <p>Completed</p>
          </div>
          <div className="message-body">This progress report is complete and submitted to students.</div>
        </article>
        <nav className="level">
          <div className="level-right">
            <div className="level-item">
              {studentProgressReport.reportImageUrl ? (
                <a download href={studentProgressReport.reportImageUrl} className="button is-link">
                  Download
                </a>
              ) : (
                ''
              )}
            </div>
          </div>
        </nav>
        {studentProgressReport && <img src={studentProgressReport.reportImageUrl} alt="Progress report" />}
      </>
    )
  }

  if (isOnCompletePage) {
    return (
      <button className="button is-link" onClick={markProgressReportComplete}>
        Complete
      </button>
    )
  }

  return (
    <Editor progressReport={progressReport} index={index} onSaveStudentReport={onSaveStudentReport} onSkip={onSkip} />
  )
}

const ProgressReportIndex = ({ id, progressReportBaseURL, index }) => {
  const { loading: loadingProgressReport, data: progressReport, reload: reloadProgressReport } = useModelData(
    () =>
      ProgressReport.includes([
        'homeworks',
        { student_progress_reports: 'person' },
        { people: { assignments: 'homework' } },
      ]).find(id),
    null
  )

  // Reload the progress report when the page changes
  useEffect(reloadProgressReport, [index])

  if (loadingProgressReport) {
    return <LoadingIndicator />
  }

  if (index === 'none') {
    history.push(`${progressReportBaseURL}/0`)
    return <></>
  }

  const isOnCompletePage = 'complete' === index

  // Otherwise make the index an integer (for easier comparison)
  index = parseInt(index)

  const onSkip = () => {
    // Move to the next report if it is there, or to the 'complete' page otherwise
    if (index + 1 < progressReport.sortedIdsOfPeople().length) {
      history.push(`${progressReportBaseURL}/${index + 1}`)
    } else {
      history.push(`${progressReportBaseURL}/complete`)
    }
  }

  const markProgressReportComplete = () => {
    progressReport.completed = true
    progressReport.save().then(success => {
      if (success) {
        reloadProgressReport()
      }
    })
  }

  const onSaveStudentReport = response => {
    if (response) {
      onSkip()
    }
  }

  return (
    <section className="section">
      <div className="columns">
        <div className="column is-one-fifth" style={{ position: 'fixed', height: '85vh', overflowY: 'scroll' }}>
          <Sidebar progressReportBaseURL={progressReportBaseURL} progressReport={progressReport} index={index} />
        </div>
        <div
          className="column is-offset-one-fifth is-four-fifths"
          style={{ position: 'fixed', height: '85vh', overflowY: 'scroll' }}
        >
          <Main
            progressReport={progressReport}
            index={index}
            isOnCompletePage={isOnCompletePage}
            markProgressReportComplete={markProgressReportComplete}
            onSaveStudentReport={onSaveStudentReport}
            onSkip={onSkip}
          />
        </div>
      </div>
    </section>
  )
}

export default ProgressReportIndex
