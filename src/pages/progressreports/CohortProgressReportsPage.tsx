import React from 'react'
import { Link } from 'react-router-dom'
import { Cohort } from '@/components/models'
import { LeftRight } from '@/components/utils/LeftRight'

export function CohortProgressReportsPage({ cohort, allowNew }: { cohort: Cohort; allowNew: boolean }) {
  return (
    <div className="content">
      <LeftRight
        left={<></>}
        right={
          allowNew && (
            <Link to={`/cohorts/${cohort.id}/progress-reports/new`} className="button is-primary is-inverted">
              <span className="icon">
                <i className="fas fa-plus" />
              </span>
              <span>New</span>
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
  )
}
