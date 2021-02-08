import React from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'

import { Cohort, Assignment } from '@/components/models'
import useModelData from '@/hooks/useModelData'
import LoadingIndicator from '@/components/utils/LoadingIndicator'

const StudentGradebook = ({ profile, showTitle }) => {
  const { loading: loadingCohorts, data: cohorts } = useModelData(() =>
    Cohort.includes(['homeworks', { student_enrollments: { person: { assignments: 'homework' } } }])
      .where({ student_enrollments: { person_id: profile.id } })
      .order({ start_date: 'desc' })
      .selectExtra({
        student_enrollments: ['completed_homework_count', 'completion_percentage', 'needed_to_complete_count'],
      })
      .all()
  )

  if (loadingCohorts) {
    return <LoadingIndicator />
  }

  return (
    <section className="section">
      <div className="container">
        {showTitle && <h1 className="title">Grades for: {profile.fullName}</h1>}
        {cohorts.map(cohort => {
          const studentEnrollment = cohort.studentEnrollments.find(
            enrollment => parseInt(enrollment.personId) === parseInt(profile.id)
          )

          const homeworksNeededForCompletion = cohort.homeworks.filter(homework => homework.countsTowardsCompletion)
          const cohortAssignments =
            (studentEnrollment &&
              studentEnrollment.person &&
              studentEnrollment.person.assignments
                .sort((a, b) => b.id - a.id)
                .filter(assignment => parseInt(assignment.homework.cohortId) === parseInt(cohort.id))) ||
            []

          return cohortAssignments.length > 0 ? (
            <React.Fragment key={cohort.id}>
              <h1 className="title">{cohort.name}</h1>

              {homeworksNeededForCompletion.length > 16 && (
                <div className="notification is-primary">
                  You have completed <strong>{studentEnrollment.completedHomeworkCount}</strong> assignments.
                  {studentEnrollment.incompleteHomeworkCount > 0 && (
                    <span>
                      You have <strong>{studentEnrollment.incompleteHomeworkCount}</strong> incomplete assignments
                    </span>
                  )}
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
