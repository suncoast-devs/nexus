import React, { useEffect } from 'react'
import history from '@/history'
import { ProgressReport, UnProxyRecord } from '@/components/models'
import { LoadingIndicator } from '@/components/utils/LoadingIndicator'
import { Main } from '@/components/progressreports/Main'
import { Sidebar } from '@/components/progressreports/Sidebar'
import { useParams } from 'react-router'
import { useQuery } from 'react-query'

export function EditProgressReportPage() {
  const { progress_report_id: id, index = 'none' } = useParams<{ progress_report_id: string; index: string }>()

  const progressReportBaseURL = `/progress-reports/${id}`

  const { isLoading, refetch, data: progressReport = new ProgressReport() } = useQuery(['progress-report', id], () =>
    ProgressReport.includes([
      'homeworks',
      { student_progress_reports: 'person' },
      { people: { assignments: 'homework' } },
    ])
      .find(id)
      .then(UnProxyRecord)
  )

  // Reload the progress report when the page changes
  useEffect(
    function () {
      refetch()
    },
    [index]
  )

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (index === 'none') {
    history.push(`${progressReportBaseURL}/0`)
    return <></>
  }

  const isOnCompletePage = 'complete' === index

  // Otherwise make the effectiveIndex an integer (for easier comparison)
  let effectiveIndex = parseInt(index)

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
        refetch()
      }
    })
  }

  function onSaveStudentReport(success: boolean) {
    if (success) {
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
            isOnCompletePage={isOnCompletePage}
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
