import React from 'react'

import { Cohort, Assignment } from '../models'
import useModelData from '../../hooks/useModelData'

const StudentGradebook = ({ profile }) => {
  const { data: assignments } = useModelData(() => Assignment.includes({ homework: 'cohort' }).all())

  const { data: cohorts } = useModelData(() =>
    Cohort.where({ id: assignments.map(assignment => assignment.homework.cohort_id) }).all()
  )

  return (
    <section className="section">
      <div className="container">
        {cohorts.map(cohort => {
          const cohortAssignments = assignments.filter(
            assignment => assignment.homework && assignment.homework.cohort.id === cohort.id
          )

          if (cohortAssignments.length === 0) {
            return <></>
          }

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
                      <tr>
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
