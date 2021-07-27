import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'

import { Assignment } from '/src/components/models'
import useModelData from '/src/hooks/useModelData'
import { LoadingIndicator } from '/src/components/utils/LoadingIndicator'
import { Gradebook } from '/src/components/models/Gradebook'
import { StudentEnrollment } from '/src/components/models'

function StudentGradebook({ studentEnrollment }) {
  const assignments = studentEnrollment.assignments.sort((a, b) => b.id - a.id)

  const homeworksNeededForCompletion = assignments.filter(assignment => assignment.homework.countsTowardsCompletion)

  if (assignments.length === 0) {
    return <></>
  }

  return (
    <React.Fragment>
      <h1 className="title">{studentEnrollment.cohort.name}</h1>

      {homeworksNeededForCompletion.length > 16 && (
        <div className="notification is-primary">
          You have completed <strong>{studentEnrollment.completedAssignmentsCount}</strong> assignments out of{' '}
          <strong>{homeworksNeededForCompletion.length}</strong>
        </div>
      )}

      <table className="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th>Assignment</th>
            <th>Grade</th>
            <th>Turned In</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(assignment => {
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
  )
}

export function StudentGradebookPage({ profile, showTitle }) {
  const { loading: loadingStudentEnrollments, data: studentEnrollments } = useModelData(() =>
    StudentEnrollment.includes(['cohort', { assignments: 'homework' }])
      .order({ cohort_id: 'desc' })
      .where({ person_id: profile.id })
      .all()
  )

  if (loadingStudentEnrollments) {
    return <LoadingIndicator />
  }

  return (
    <section className="section">
      <div className="container">
        {showTitle && <h1 className="title">Grades for: {profile.fullName}</h1>}
        {studentEnrollments.map(studentEnrollment => (
          <StudentGradebook key={studentEnrollment.id} studentEnrollment={studentEnrollment} />
        ))}
      </div>
    </section>
  )
}
