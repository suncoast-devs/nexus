import React, { useEffect } from 'react'
import history from '/src/history'
import useModelData from '/src/hooks/useModelData'
import { ProgressReport } from '/src/components/models'
import { LoadingIndicator } from '/src/components/utils/LoadingIndicator'
import { Main } from '/src/components/progressreports/Main'
import { Sidebar } from '/src/components/progressreports/Sidebar'

export function EditProgressReportPage({ id, progressReportBaseURL, index }) {
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
