import React from 'react'
import cx from 'classnames'

import { LoadingIndicator } from '@/components/utils/LoadingIndicator'
import { EnrollmentRows } from '@/components/gradebook/EnrollmentRows'
import { Gradebook } from '@/components/models/Gradebook'
import { Assignment, UnProxyCollection } from '@/components/models'
import { useQuery } from 'react-query'

export function GradebookPage({ cohort_id }: { cohort_id: string }) {
  const { isLoading, data: gradebooks = [] } = useQuery(
    ['gradebook', cohort_id],
    () =>
      Gradebook.includes(['cohort', 'homeworks', { student_enrollments: 'person' }, 'assignments'])
        .where({ cohort_id })
        .all()
        .then(UnProxyCollection),
    {}
  )

  if (isLoading) {
    return <LoadingIndicator />
  }

  const gradebook = gradebooks[0]

  const { cohort, studentEnrollments, homeworks, assignments } = gradebook

  const activeEnrollments = studentEnrollments
    .filter(enrollment => enrollment.showGrade)
    .sort((a, b) => a.person.fullName.localeCompare(b.person.fullName))

  const inactiveEnrollments = studentEnrollments
    .filter(enrollment => !enrollment.showGrade)
    .sort((a, b) => a.person.fullName.localeCompare(b.person.fullName))

  const sortedHomework = homeworks.sort((a, b) => Number(b.id) - Number(a.id))

  const assignmentLookup = assignments.reduce((assignmentLookup, assignment) => {
    assignmentLookup[`${assignment.studentEnrollmentId}-${assignment.homeworkId}`] = assignment
    return assignmentLookup
  }, {} as Record<string, Assignment>)

  return (
    <section className="gradebook" style={{ overflowX: 'auto' }}>
      <table className="table assignment-table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th>Student</th>
            <th>
              <i className="fab fa-github-alt" />
            </th>
            <th>%</th>
            <th>Counts</th>
            {sortedHomework.map(homework => (
              <th key={homework.id} className="tooltip" data-tooltip={homework.title}>
                <span className={cx('icon is-medium', { 'has-text-success': homework.countsTowardsCompletion })}>
                  <i className="fas fa-book" />
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <EnrollmentRows
            assignmentLookup={assignmentLookup}
            enrollments={activeEnrollments}
            homeworks={sortedHomework}
            countOfHomeworksNeededForCompletion={cohort.assignedHomeworkMarkedForCompletionCount}
          />
          <EnrollmentRows
            assignmentLookup={assignmentLookup}
            enrollments={inactiveEnrollments}
            homeworks={sortedHomework}
            countOfHomeworksNeededForCompletion={cohort.assignedHomeworkMarkedForCompletionCount}
          />
        </tbody>
      </table>
    </section>
  )
}
