import React from 'react'
import cx from 'classnames'

import { Cohort } from '@/components/models'
import useModelData from '@/hooks/useModelData'
import { LoadingIndicator } from '@/components/utils/LoadingIndicator'
import { EnrollmentRows } from '@/components/gradebook/EnrollmentRows'

export function GradebookPage({ cohort_id }) {
  const { loading: loadingCohort, data: cohort } = useModelData(
    () =>
      Cohort.includes([{ student_enrollments: { person: 'assignments' }, homeworks: { assignments: 'person' } }])
        .selectExtra({
          student_enrollments: ['completed_homework_count', 'completion_percentage', 'needed_to_complete_count'],
        })
        .find(cohort_id),
    { people: [] }
  )

  if (loadingCohort) {
    return <LoadingIndicator />
  }

  const activeEnrollments = cohort.studentEnrollments
    .filter(enrollment => enrollment.showGrade)
    .sort((a, b) => a.person.fullName.localeCompare(b.person.fullName))

  const inactiveEnrollments = cohort.studentEnrollments
    .filter(enrollment => !enrollment.showGrade)
    .sort((a, b) => a.person.fullName.localeCompare(b.person.fullName))

  const sortedHomework = cohort.homeworks.sort((a, b) => b.id - a.id)

  // Homework needed for completion are those that are assigned and marked as counted
  const homeworksNeededForCompletion = cohort.homeworks.filter(
    homework => homework.countsTowardsCompletion && homework.assigned
  )
  const countOfHomeworksNeededForCompletion = homeworksNeededForCompletion.length

  return (
    <section className="gradebook section">
      <h1 className="title">Gradebook for {cohort.name}</h1>
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
            enrollments={activeEnrollments}
            cohort={cohort}
            countOfHomeworksNeededForCompletion={countOfHomeworksNeededForCompletion}
          />
          <EnrollmentRows
            enrollments={inactiveEnrollments}
            cohort={cohort}
            countOfHomeworksNeededForCompletion={countOfHomeworksNeededForCompletion}
          />
        </tbody>
      </table>
    </section>
  )
}
