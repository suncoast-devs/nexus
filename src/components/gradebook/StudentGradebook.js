import React from 'react'

import { Cohort, Assignment } from '../models'
import useModelData from '../../hooks/useModelData'
import LoadingIndicator from '../utils/LoadingIndicator'

const StudentGradebook = ({ profile, showTitle }) => {
  const { loading: loadingAssignments, data: assignments } = useModelData(() =>
    Assignment.where({ person_id: profile.id })
      .includes({ homework: 'cohort' })
      .all()
  )

  const { loading: loadingCohort, data: cohorts } = useModelData(() =>
    Cohort.where({ id: assignments.map(assignment => assignment.homework.cohort_id) }).all()
  )

  if (loadingCohort || loadingAssignments) {
    return <LoadingIndicator />
  }

  return (
    <section className="section">
      <div className="container">
        {showTitle && <h1 className="title">Grades for: {profile.fullName}</h1>}
        {cohorts.map(cohort => {
          const cohortAssignments = assignments.filter(
            assignment => assignment.homework && assignment.homework.cohort.id === cohort.id
          )

          return (
            <React.Fragment key={cohort.id}>
              <h1 className="title">{cohort.name}</h1>

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
          )
        })}
      </div>
    </section>
  )
}

export default StudentGradebook
