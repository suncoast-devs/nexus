import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import { PersonComponent } from '@/components/person/PersonComponent'
import { InactivePerson } from '@/components/person/InactivePerson'
import { HomeworkTableData } from './HomeworkTableData'
import { Assignment, Homework, StudentEnrollment } from '../models'

function EnrollmentRow({
  enrollment,
  assignmentLookup,
  homeworks,
  countOfHomeworksNeededForCompletion,
}: {
  enrollment: StudentEnrollment
  assignmentLookup: Record<string, Assignment>
  homeworks: Homework[]
  countOfHomeworksNeededForCompletion: number
}) {
  const person = enrollment.person

  const completedPercentageForPerson = enrollment.completionPercentage
  const completedAssignmentCountForPerson = enrollment.completedAssignmentsCount
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
      {homeworks.map(homework => (
        <HomeworkTableData
          key={homework.id}
          assignment={assignmentLookup[`${enrollment.id}-${homework.id}`]}
          homework={homework}
        />
      ))}
    </tr>
  )
}

export function EnrollmentRows({
  enrollments,
  assignmentLookup,
  homeworks,
  countOfHomeworksNeededForCompletion,
}: {
  enrollments: StudentEnrollment[]
  assignmentLookup: Record<string, Assignment>
  homeworks: Homework[]
  countOfHomeworksNeededForCompletion: number
}) {
  return (
    <>
      {enrollments.map(enrollment => (
        <EnrollmentRow
          key={enrollment.id}
          enrollment={enrollment}
          assignmentLookup={assignmentLookup}
          homeworks={homeworks}
          countOfHomeworksNeededForCompletion={countOfHomeworksNeededForCompletion}
        />
      ))}
    </>
  )
}
