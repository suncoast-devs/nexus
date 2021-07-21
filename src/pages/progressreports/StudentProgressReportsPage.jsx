import React from 'react'

import { StudentProgressReport } from '/src//components/models'
import useModelData from '/src//hooks/useModelData'
import { LoadingIndicator } from '/src//components/utils/LoadingIndicator'

export function StudentProgressReportsPage({ profile, showTitle }) {
  const { loading: loadingStudentProgressReports, data: reports } = useModelData(() => StudentProgressReport.all())

  if (loadingStudentProgressReports) {
    return <LoadingIndicator />
  }

  return (
    <section className="section">
      <div className="container">
        {showTitle && <h1 className="title">Progress Reports for: {profile.fullName}</h1>}
        {reports.map(report => (
          <div key={report.id} className="container">
            <img alt="progress-report" src={report.reportImageUrl} />
          </div>
        ))}
      </div>
    </section>
  )
}
