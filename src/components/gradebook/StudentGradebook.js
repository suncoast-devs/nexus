import React from 'react'

import { Cohort, Assignment } from '@/components/models'
import useModelData from '@/hooks/useModelData'
import LoadingIndicator from '@/components/utils/LoadingIndicator'
import { homeworkCompletedPercentage, completedHomeworks, neededHomeworksToExceedPercentage } from './gradebookUtils'
import Person from '@/components/models/Person'

const StudentGradebook = ({ profile, showTitle }) => {
  const { loading: loadingAssignments, data: assignments } = useModelData(() =>
    Assignment.includes({ homework: 'cohort' })
      .where({ person_id: profile.id })
      .all()
  )

  const { loading: loadingPerson, data: person } = useModelData(() =>
    Person.includes({ cohorts: 'homeworks' }).find(profile.id)
  )

  if (loadingPerson || loadingAssignments) {
    return <LoadingIndicator />
  }

  const cohorts = person.cohorts

  return (
    <section className="section">
      <div className="container">
        {showTitle && <h1 className="title">Grades for: {profile.fullName}</h1>}
        {cohorts.map(cohort => {
          const cohortAssignments = cohort.assignmentsForThisCohort(assignments)

          const completed = completedHomeworks({ homeworks: cohort.homeworks, person: profile })
          const needed = neededHomeworksToExceedPercentage({ homeworks: cohort.homeworks, person: profile })
          const percentage = homeworkCompletedPercentage({ homeworks: cohort.homeworks, person: profile })

          return cohortAssignments.length >= 0 ? (
            <React.Fragment key={cohort.id}>
              <h1 className="title">{cohort.name}</h1>

              <div className="notification is-primary">
                You have completed <strong>{completed ? completed.length : 0}</strong> assignments for a completion rate
                of <strong>{percentage.toFixed(1)}%</strong>. You need <strong>{needed ? needed : 'N/A'}</strong> more
                assignments to reach <strong>80%</strong>
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
