import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'

import { Assignment, UnProxyCollection } from '@/components/models'
import { LoadingIndicator } from '@/components/utils/LoadingIndicator'
import { StudentEnrollment } from '@/components/models'
import useProfile from '@/hooks/useProfile'
import { useQuery } from 'react-query'

function StudentGradebook({ studentEnrollment }: { studentEnrollment: StudentEnrollment }) {
  const assignments = studentEnrollment.assignments.sort((a, b) => Number(b.id) - Number(a.id))

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

export function StudentGradebookPage({ showTitle = false }: { showTitle?: boolean }) {
  const { profile } = useProfile()

  const { isLoading, data: studentEnrollments = [] } = useQuery(['student-enrollments', profile.id], () =>
    StudentEnrollment.includes(['cohort', { assignments: 'homework' }])
      .order({ cohort_id: 'desc' })
      .where({ person_id: profile.id })
      .all()
      .then(UnProxyCollection)
  )

  if (isLoading) {
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
