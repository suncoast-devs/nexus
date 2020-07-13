import React from 'react'
import useModelData from '@/hooks/useModelData'

import PersonComponent from '@/components/Person'
import LoadingIndicator from '@/components/utils/LoadingIndicator'
import { Cohort, Assignment } from '@/components/models'

const GradeQueue = ({ cohort_id }) => {
  const { loading: loadingCohort, data: cohort, reload: reloadCohort } = useModelData(
    () =>
      Cohort.includes([{ student_enrollments: 'person' }, { homeworks: { assignments: 'person' } }])
        .selectExtra({ people: 'issues' })
        .find(cohort_id),
    { people: [] }
  )

  if (loadingCohort) {
    return <LoadingIndicator />
  }

  const enrolledPeopleIds = cohort.studentEnrollments
    .filter(enrollment => enrollment.showGrade)
    .map(enrollment => enrollment.person.id)
    .flat()

  const enrolled = person => enrolledPeopleIds.includes(person.id)

  const homeworksNeededForCompletion = cohort.homeworks.filter(homework => homework.countsTowardsCompletion)

  const ungradedAssignments = homeworksNeededForCompletion
    .map(homework => homework.assignments.filter(assignment => Assignment.needsGrade(assignment.score)))
    .flat()
    .filter(assignment => enrolled(assignment.person))

  return (
    <section className="section">
      <h1 className="title">Grading Queue - {ungradedAssignments.length} to grade</h1>

      <table className="table is-hoverable">
        <thead>
          <tr>
            <th>Student</th>
            <th>Assignment</th>
          </tr>
        </thead>
        <tbody>
          {ungradedAssignments.map(assignment => {
            const person = assignment.person
            const issue = person.issues.find(issue => issue.number === assignment.issue) || {}

            return (
              <tr>
                <td>
                  <PersonComponent person={person} />
                </td>
                <td>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://github.com/${person.github}/${person.assignmentsRepo}/issues/${issue.number}`}
                  >
                    {assignment.homework.title}
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}

export default GradeQueue
