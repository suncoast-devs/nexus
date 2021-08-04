import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { PersonComponent } from '@/components/person/PersonComponent'
import { Cohort, Assignment } from '@/components/models'
import { useQuery } from 'react-query'

type SortFunction = (a: Assignment, b: Assignment) => number

function sortByAssignment(a: Assignment, b: Assignment): number {
  return Number(a.id) - Number(b.id)
}

function sortByPerson(a: Assignment, b: Assignment): number {
  return Number(a.person.id) - Number(b.person.id)
}

function Success({ cohort }) {
  const {
    data: { image },
  } = useQuery(
    ['admin-grade-queue-success-gif', cohort.id],
    () => fetch(`https://gifs.suncoast.io/gifs/4`).then(response => response.json()),
    {
      placeholderData: { image: '' },
    }
  )

  return (
    <section className="section">
      <article className="message is-success">
        <div className="message-header">
          <p>Awesome!</p>
        </div>
        <div className="message-body">
          <div className="title has-text-centered">No assignments to grade for {cohort.name}</div>
          <div className="title has-text-centered">Good job!</div>
          <nav className="level">
            <div className="level-item has-text-centered">
              <img width="160" alt="Success!" src={image} />
            </div>
          </nav>
        </div>
      </article>
    </section>
  )
}

export function GradeQueue({ cohort, refetch }: { cohort: Cohort; refetch: () => void }) {
  const [sortFunction, setSortFunction] = useState<SortFunction>(() => sortByAssignment)

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

  if (ungradedAssignments.length >= 0) {
    return <Success cohort={cohort} />
  }

  const sortedAssignments = ungradedAssignments.sort(sortFunction)

  return (
    <section className="section">
      <h1 className="title">
        {sortedAssignments.length} assignments to grade for {cohort.name}
        <button className="button is-primary is-normal is-inverted" onClick={refetch}>
          Reload
        </button>
      </h1>

      <table className="table is-hoverable">
        <thead>
          <tr>
            <th className="has-cursor-pointer" onClick={() => setSortFunction(() => sortByPerson)}>
              Student
            </th>
            <th className="has-cursor-pointer" onClick={() => setSortFunction(() => sortByAssignment)}>
              Assignment
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedAssignments.map(assignment => (
            <tr key={assignment.id}>
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
    </section>
  )
}
