import React from 'react'

import { Assignment } from '@/components/models'
import useModelData from '@/hooks/useModelData'
import LoadingIndicator from '@/components/utils/LoadingIndicator'
import {
  homeworkCompletedPercentage,
  completedAssignmentCount,
  neededHomeworksToExceedPercentage,
} from './gradebookUtils'
import Person from '@/components/models/Person'

const StudentGradebook = ({ profile, showTitle }) => {
  const { loading: loadingPerson, data: person } = useModelData(() =>
    Person.includes(['assignments', { cohorts: 'homeworks' }]).find(profile.id)
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
          const cohortAssignments = cohort.assignmentsForThisCohort(assignments)
          const { homeworks } = cohort

          const completedCount = completedAssignmentCount({ assignments: cohortAssignments })
          const neededCount = neededHomeworksToExceedPercentage({ homeworks, assignments: cohortAssignments })
          const percentage = homeworkCompletedPercentage({ homeworks, assignments: cohortAssignments })

          return cohortAssignments.length >= 0 ? (
            <React.Fragment key={cohort.id}>
              <h1 className="title">{cohort.name}</h1>

              <div className="notification is-primary">
                You have completed <strong>{completedCount}</strong> assignments for a completion rate of{' '}
                <strong>{percentage.toFixed(1)}%</strong>. You need <strong>{neededCount ? neededCount : 'N/A'}</strong>{' '}
                more assignments to reach <strong>80%</strong>
              </div>

              <table className="table is-fullwidth is-hoverable">
                <thead>
                  <tr>
                    <th>Assignment</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {cohortAssignments.map(assignment => {
                    return (
                      <tr key={assignment.id}>
                        <td>
                          <span className="icon">
                            <i className="fas fa-code-branch" />
                          </span>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://github.com/${profile.github}/${profile.assignmentsRepo}/issues/${
                              assignment.issue
                            }`}
                          >
                            {assignment.homework.title}
                          </a>
                        </td>
                        <td>{Assignment.scoreInfo(assignment.score).title}</td>
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
