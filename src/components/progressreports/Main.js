import React from 'react'
import { Editor } from './Editor'

export function Main({
  progressReport,
  index,
  isOnCompletePage,
  markProgressReportComplete,
  onSaveStudentReport,
  onSkip,
}) {
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
