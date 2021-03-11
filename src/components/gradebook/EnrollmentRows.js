import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { PersonComponent } from '@/components/person/PersonComponent'
import { InactivePerson } from '@/components/person/InactivePerson'
import { HomeworkTableData } from './HomeworkTableData'

export function EnrollmentRows({ enrollments, cohort, countOfHomeworksNeededForCompletion }) {
  return enrollments.map(enrollment => {
    const person = enrollment.person

    const completedPercentageForPerson = enrollment.completionPercentage
    const completedAssignmentCountForPerson = enrollment.completedHomeworkCount
    const neededHomeworks = enrollment.neededToCompleteCount

    const { active, showGrade } = enrollment
    const isPassing = completedPercentageForPerson && completedPercentageForPerson >= 80.0
    const passFailStyling = cx({
      'has-text-danger': showGrade && !isPassing,
      'has-text-success': showGrade && isPassing,
    })

    return (
      <tr key={person.id}>
        <td className={passFailStyling}>
          {active ? (
            <Link to={`/people/${person.id}/gradebook`}>
              <PersonComponent person={person} />
            </Link>
          ) : (
            <InactivePerson person={person} />
          )}
        </td>
        <td className={passFailStyling}>
          <a target="_blank" rel="noopener noreferrer" href={`https://github.com/${person.github}`}>
            @{person.github}
          </a>
        </td>
        {countOfHomeworksNeededForCompletion > 0 && showGrade ? (
          <>
            <td className={passFailStyling}>
              {completedPercentageForPerson ? completedPercentageForPerson.toFixed(1) : 'N/A'} %
            </td>
            <td className={passFailStyling}>
              ({completedAssignmentCountForPerson} / {countOfHomeworksNeededForCompletion})
              {isPassing ? '' : ` - Needs: ${neededHomeworks}`}
            </td>
          </>
        ) : (
          <>
            <td />
            <td />
          </>
        )}
        {cohort.homeworks.map(homework => {
          const assignment = homework.assignments.find(assignment => assignment.person.id === person.id)
          return <HomeworkTableData key={homework.id} assignment={assignment} homework={homework} />
        })}
      </tr>
    )
  })
}
