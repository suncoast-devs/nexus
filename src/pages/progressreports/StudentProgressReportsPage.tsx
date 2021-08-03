import React from 'react'

import { StudentProgressReport, UnProxyCollection } from '@/components/models'
import { LoadingIndicator } from '@/components/utils/LoadingIndicator'
import useProfile from '@/hooks/useProfile'
import { useQuery } from 'react-query'

export function StudentProgressReportsPage({ showTitle }: { showTitle: boolean }) {
  const { profile } = useProfile()

  const { isLoading, data: reports = [] } = useQuery('student-progress-reports', () =>
    StudentProgressReport.all().then(UnProxyCollection)
  )

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <section className="section">
      <div className="container">
        {showTitle && <h1 className="title">Progress Reports for: {profile.fullName}</h1>}
        {reports.length === 0 ? <h1 className="title">No progress reports yet...</h1> : <></>}
        {reports.map(report => (
          <div key={report.id} className="container">
            <img alt="progress-report" src={report.reportImageUrl} />
          </div>
        ))}
      </div>
    </section>
  )
}
