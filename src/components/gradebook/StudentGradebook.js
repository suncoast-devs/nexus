import React from 'react'

import { Assignment } from '@/components/models'
import useModelData from '@/hooks/useModelData'
import LoadingIndicator from '@/components/utils/LoadingIndicator'
import {
  homeworkCompletedPercentage,
  completedAssignmentsCount,
  countOfHomeworksNeededToExceedPercentage,
} from './gradebookUtils'
import Person from '@/components/models/Person'
import cx from 'classnames'
import { Link } from 'react-router-dom'

const StudentGradebook = ({ profile, showTitle }) => {
  const { loading: loadingPerson, data: person } = useModelData(() =>
    Person.includes([{ assignments: { homework: 'cohort' }, cohorts: 'homeworks' }]).find(profile.id)
  )

  if (loadingPerson) {
    return <LoadingIndicator />
  }

  const { assignments, cohorts } = person
  return (
    <section className="section">
      <div className="container">
        {showTitle && <h1 className="title">Grades for: {profile.fullName}</h1>}
        {cohorts.map(cohort => {
          const cohortAssignments = cohort.assignmentsForThisCohort(assignments).sort((a, b) => b.id - a.id)
          const { homeworks } = cohort

          const completedCount = completedAssignmentsCount({ assignments: cohortAssignments })
          const neededCount = countOfHomeworksNeededToExceedPercentage({ homeworks, assignments: cohortAssignments })
          const percentage = homeworkCompletedPercentage({ homeworks, assignments: cohortAssignments })

          return cohortAssignments.length >= 0 ? (
            <React.Fragment key={cohort.id}>
              <h1 className="title">{cohort.name}</h1>

              <div className="notification is-primary">
                You have completed <strong>{completedCount}</strong> assignments for a completion rate of{' '}
                <strong>{percentage ? percentage.toFixed(1) : 'N/A'}%</strong>. You need{' '}
                <strong>{neededCount ? neededCount : 'N/A'}</strong> more assignments to reach <strong>80%</strong>
              </div>

              <table className="table is-fullwidth is-hoverable">
                <thead>
                  <tr>
                    <th>Assignment</th>
                    <th>Grade</th>
                    <th>Turned In</th>
                  </tr>
                </thead>
                <tbody>
                  {cohortAssignments.map(assignment => {
                    return (
                      <tr key={assignment.id}>
                        <td>
                          <Link to={`/assignment/${assignment.id}`}>{assignment.homework.title}</Link>
                        </td>
                        <td>{assignment.turnedIn && Assignment.scoreInfo(assignment.score).title}</td>
                        <td className={cx({ 'has-text-danger': !assignment.turnedIn && assignment.overdue })}>
                          {assignment.turnedIn ? 'Yes' : assignment.overdue ? 'Overdue' : 'No'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </React.Fragment>
          ) : (
            <React.Fragment key={cohort.id} />
          )
        })}
      </div>
    </section>
  )
}

export default StudentGradebook
