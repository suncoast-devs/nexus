import React, { useEffect } from 'react'
import history from '@/history'
import useModelData from '@/hooks/useModelData'
import { ProgressReport } from '@/components/models'
import { LoadingIndicator } from '@/components/utils/LoadingIndicator'
import { Main } from '@/components/progressreports/Main'
import { Sidebar } from '@/components/progressreports/Sidebar'
import { useParams } from 'react-router'

export function EditProgressReportPage() {
  const { progress_report_id: id, index = 'none' } = useParams()

  let effectiveIndex = index

  const progressReportBaseURL = `/progress-reports/${id}`

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
  useEffect(reloadProgressReport, [effectiveIndex])

  if (loadingProgressReport) {
    return <LoadingIndicator />
  }

  if (effectiveIndex === 'none') {
    history.push(`${progressReportBaseURL}/0`)
    return <></>
  }

  const isOnCompletePage = 'complete' === effectiveIndex

  // Otherwise make the effectiveIndex an integer (for easier comparison)
  effectiveIndex = parseInt(effectiveIndex)

  const onSkip = () => {
    // Move to the next report if it is there, or to the 'complete' page otherwise
    if (effectiveIndex + 1 < progressReport.sortedIdsOfPeople().length) {
      history.push(`${progressReportBaseURL}/${effectiveIndex + 1}`)
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
          <Sidebar
            progressReportBaseURL={progressReportBaseURL}
            progressReport={progressReport}
            index={effectiveIndex}
          />
        </div>
        <div
          className="column is-offset-one-fifth is-four-fifths"
          style={{ position: 'fixed', height: '85vh', overflowY: 'scroll' }}
        >
          <Main
            progressReport={progressReport}
            index={effectiveIndex}
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
