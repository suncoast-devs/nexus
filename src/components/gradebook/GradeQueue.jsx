import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import useModelData from '/src//hooks/useModelData'
import { PersonComponent } from '/src//components/person/PersonComponent'
import { LoadingIndicator } from '/src//components/utils/LoadingIndicator'
import { Cohort, Assignment } from '/src//components/models'

export function GradeQueue({ cohort_id }) {
  const { loading, data: cohort, reload } = useModelData(() =>
    Cohort.includes(['student_enrollments', { homeworks: { assignments: ['homework', 'person'] } }]).find(cohort_id)
  )

  const [sortOrder, setSortOrder] = useState('student')

  if (loading) {
    return <LoadingIndicator />
  }

  const enrolledPeopleIds = cohort.studentEnrollments
    .filter(enrollment => enrollment.showGrade)
    .map(enrollment => enrollment.personId)
    .flat()

  const ungradedAssignments = cohort.homeworks
    .filter(homework => homework.countsTowardsCompletion)
    .map(homework => homework.assignments.filter(assignment => assignment.score < Assignment.minimumAcceptableScore))
    .flat()
    .filter(assignment => enrolledPeopleIds.includes(assignment.personId))
    .filter(assignment => assignment.turnedIn)

  if (ungradedAssignments.length === 0) {
    return <div className="notification is-success">No assignments to grade for {cohort.name} -- Good job!</div>
  }

  const sortFunction = (a, b) => {
    switch (sortOrder) {
      case 'student':
        return a.person.id - b.person.id

      case 'assignment':
        return a.id - b.id

      default:
        return a.id - b.id
    }
  }

  const sortedAssignments = ungradedAssignments.sort((a, b) => sortFunction(a, b))

  return (
    <>
      <h1 className="title">
        {sortedAssignments.length} assignments to grade for {cohort.name}
        <button className="button is-link is-normal is-inverted" onClick={reload}>
          Reload
        </button>
      </h1>

      <table className="table is-hoverable">
        <thead>
          <tr>
            <th className="has-cursor-pointer" onClick={() => setSortOrder('student')}>
              Student
            </th>
            <th className="has-cursor-pointer" onClick={() => setSortOrder('assignment')}>
              Assignment
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedAssignments.map(assignment => (
            <tr>
              <td>
                <PersonComponent person={assignment.person} />
              </td>
              <td>
                <Link to={`/assignment/${assignment.id}`}>{assignment.homework.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
