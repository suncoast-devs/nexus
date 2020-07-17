import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'

import { Cohort } from '@/components/models'
import useModelData from '@/hooks/useModelData'
import PersonComponent from '@/components/Person'
import InactivePerson from '@/components/InactivePerson'
import LoadingIndicator from '@/components/utils/LoadingIndicator'

const HomeworkTableData = ({ assignment, homework }) => {
  if (!assignment) {
    return (
      <td className="tooltip" style={{ color: '#CCC' }} data-tooltip={`${homework.title} - Not Yet Assigned`}>
        <i className="far fa-circle" />
      </td>
    )
  }

  const scoreInfo = assignment.scoreInfo()
  const style = { color: scoreInfo.style.iconColor }
  const tooltip = `${homework.title} - ${scoreInfo.title}`
  const icon = assignment.turnedIn ? <i className="fas fa-circle" /> : <i className="far fa-circle" />

  return (
    <td className="tooltip" data-tooltip={tooltip}>
      <Link to={`/assignment/${assignment.id}`}>
        <span className="icon is-medium" style={style}>
          {icon}
        </span>
      </Link>
    </td>
  )
}

const EnrollmentRows = ({ enrollments, cohort, countedHomeworks }) =>
  enrollments.map(enrollment => {
    const person = enrollment.person

    const completedPercentageForPerson = enrollment.completionPercentage
    const completedAssignmentCountForPerson = enrollment.completedHomeworkCount
    const countedHomeworksForPerson = countedHomeworks
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
        {countedHomeworks > 0 && showGrade ? (
          <>
            <td className={passFailStyling}>
              {completedPercentageForPerson ? completedPercentageForPerson.toFixed(1) : 'N/A'} %
            </td>
            <td className={passFailStyling}>
              ({completedAssignmentCountForPerson} / {countedHomeworksForPerson})
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

const Gradebook = ({ cohort_id }) => {
  const { loading: loadingCohort, data: cohort, reload: reloadCohort } = useModelData(
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

  const homeworksNeededForCompletion = cohort.homeworks.filter(homework => homework.countsTowardsCompletion)
  const countedHomeworks = homeworksNeededForCompletion.length

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
          <EnrollmentRows enrollments={activeEnrollments} cohort={cohort} countedHomeworks={countedHomeworks} />
          <EnrollmentRows enrollments={inactiveEnrollments} cohort={cohort} countedHomeworks={countedHomeworks} />
        </tbody>
      </table>
    </section>
  )
}

export default Gradebook
