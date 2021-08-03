import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { SidebarLink } from './SidebarLink'
import { Person, ProgressReport } from '../models'

export function Sidebar({
  progressReportBaseURL,
  progressReport,
  index,
  isOnCompletePage,
}: {
  progressReportBaseURL: string
  progressReport: ProgressReport
  index: number
  isOnCompletePage: boolean
}) {
  const peopleOrderedByIndex = progressReport
    .sortedIdsOfPeople()
    .map(personId => progressReport.people.find(person => parseInt(person.key()) === personId))
    .filter((item): item is Person => !!item)

  return (
    <nav className="panel">
      <p className="panel-heading has-background-info has-text-white">People</p>
      {peopleOrderedByIndex.map((person, sidebarIndex) => (
        <SidebarLink key={person.id} {...{ progressReport, progressReportBaseURL, index, person, sidebarIndex }} />
      ))}

      {!progressReport.completed && (
        <Link to={`${progressReportBaseURL}/complete`}>
          <div
            className={cx('panel-block is-block', {
              'has-background-grey-light': isOnCompletePage,
              'has-text-white': isOnCompletePage,
            })}
          >
            Done
          </div>
        </Link>
      )}
    </nav>
  )
}
