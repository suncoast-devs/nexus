import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { Person, ProgressReport, StudentProgressReport } from '@/components/models'
import { PersonComponent } from '@/components/person/PersonComponent'

export function SidebarLink({
  progressReport,
  progressReportBaseURL,
  index,
  person,
  sidebarIndex,
}: {
  progressReport: ProgressReport
  progressReportBaseURL: string
  index: number
  person: Person
  sidebarIndex: number
}) {
  const studentProgressReport =
    progressReport.studentProgressReports.find(report => parseInt(report.person.key()) === parseInt(person.key())) ||
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
