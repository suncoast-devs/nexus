import React from 'react'

import { StudentProgressReport } from '../models'
import useModelData from '../../hooks/useModelData'
import LoadingIndicator from '../utils/LoadingIndicator'

const StudentProgressReports = ({ profile, showTitle }) => {
  const { loading: loadingStudentProgressReports, data: reports } = useModelData(() =>
    StudentProgressReport.where({ person_id: profile.id }).all()
  )

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

export default StudentProgressReports