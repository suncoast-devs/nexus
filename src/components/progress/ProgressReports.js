import React from 'react'
import { Link } from 'react-router-dom'
import { Cohort } from '@/components/models'
import useModelData from '@/hooks/useModelData'
import { LeftRight } from '@/components/utils/LeftRight'
import LoadingIndicator from '@/components/utils/LoadingIndicator'

const ProgressReports = ({ cohort_id, allowNew }) => {
  const { loading, data: cohort } = useModelData(() =>
    Cohort.includes({ progress_reports: ['homeworks', 'people'] }).find(cohort_id)
  )

  if (loading) {
    return <LoadingIndicator />
  }

  return (
    <section className="section">
      <div className="content">
        <LeftRight
          left={<h1 className="title">Progress Reports for {cohort.name}</h1>}
          right={
            allowNew && (
              <Link to={`/cohorts/${cohort_id}/progress-reports/new`} className="button is-link">
                New
              </Link>
            )
          }
        />
        <nav className="panel">
          {cohort.progressReports.map(report => (
            <Link key={report.id} className="panel-block is-block" to={`/progress-reports/${report.id}`}>
              <LeftRight
                left={
                  <h2 className="title">
                    {report.startDate} to {report.endDate}
                  </h2>
                }
                right={<span>{report.completed && <i className="fas fa-check has-text-success" />}</span>}
              />
              <div className="tags">
                {report.homeworks.map(homework => (
                  <span key={homework.id} className="tag is-info">
                    {homework.title}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  )
}

export default ProgressReports
