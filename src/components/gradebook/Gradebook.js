import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'

import { Cohort, Assignment } from '@/components/models'
import useModelData from '@/hooks/useModelData'
import PersonComponent from '@/components/Person'
import InactivePerson from '@/components/InactivePerson'
import LoadingIndicator from '@/components/utils/LoadingIndicator'
import LoadingButton from '@/components/utils/LoadingButton'
import {
  assignedHomeworksForCompletionCount,
  homeworkCompletedPercentage,
  completedAssignmentsCount,
  countOfHomeworksNeededToExceedPercentage,
} from './gradebookUtils'

const AssignmentModal = ({ person, assignment, homework, issue, reloadCohort, onClose }) => {
  const assignScore = (score, stopLoading) => {
    assignment.score = score

    assignment.save().then(() => {
      reloadCohort()
      stopLoading()
      onClose()
    })
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card" style={{ minWidth: '60vw' }}>
        <header className="modal-card-head">
          <p className="modal-card-title">
            {homework.title} - {person.fullName}
          </p>
          <button className="delete" aria-label="close" onClick={onClose} />
        </header>
        <section className="modal-card-body">
          <table className="table">
            <thead />
            <tbody>
              <tr>
                <th>State</th>
                <th>{issue.state}</th>
              </tr>
              <tr>
                <td>
                  <i className="fas fa-code-branch" />
                </td>
                <td>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://github.com/${person.github}/${person.assignmentsRepo}/issues/${issue.number}`}
                  >
                    #{issue.number}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="buttons">
            {Assignment.scoreInfos.map((info, index) => {
              return (
                <LoadingButton
                  key={index}
                  className={cx({
                    'is-active': index === assignment.score,
                  })}
                  style={{ backgroundColor: info.style.buttonColor, color: info.style.textColor }}
                  onClick={stopLoading => assignScore(index, stopLoading)}
                >
                  {info.title}
                </LoadingButton>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

const HomeworkTableData = ({
  person,
  personCanBeAssignedHomework,
  assignment,
  homework,
  reloadCohort,
  selectedAssignment,
  setSelectedAssignment,
}) => {
  const createAssignment = (homework, person) => {
    const shouldAssign = window.confirm(`Assign this homework?`)

    if (!shouldAssign) {
      return
    }

    const assignment = new Assignment()
    assignment.personId = person.id
    assignment.homeworkId = homework.id

    return assignment.save().then(response => {
      reloadCohort()
    })
  }

  const notAssigned = (homework, person) => (
    <td
      className="tooltip"
      style={{ color: '#CCC' }}
      data-tooltip={`${homework.title} - Not Yet Assigned`}
      onClick={() => personCanBeAssignedHomework && createAssignment(homework, person)}
    >
      <i className="far fa-circle" />
    </td>
  )

  if (!assignment) {
    return notAssigned(homework, person)
  }

  const issue = person.issues.find(issue => issue.number === assignment.issue)

  if (!issue) {
    return notAssigned(homework, person)
  }

  const scoreInfo = assignment.scoreInfo()
  const style = { color: scoreInfo.style.iconColor }
  const tooltip = `${homework.title} - ${scoreInfo.title}`
  const icon = issue.state === 'closed' ? <i className="fas fa-circle" /> : <i className="far fa-circle" />
  const modal = selectedAssignment === assignment.id && (
    <td>
      <AssignmentModal
        person={person}
        assignment={assignment}
        homework={homework}
        issue={issue}
        setSelectedAssignment={setSelectedAssignment}
        reloadCohort={reloadCohort}
        onClose={() => setSelectedAssignment(0)}
      />
    </td>
  )

  return (
    <>
      <td className="tooltip" data-tooltip={tooltip} onClick={() => setSelectedAssignment(assignment.id)}>
        <span className="icon is-medium" style={style}>
          {icon}
        </span>
      </td>
      {modal}
    </>
  )
}

const Gradebook = ({ cohort_id }) => {
  const { loading: loadingCohort, data: cohort, reload: reloadCohort } = useModelData(
    () =>
      Cohort.includes([{ student_enrollments: { person: 'assignments' }, homeworks: { assignments: 'person' } }])
        .selectExtra({ people: 'issues' })
        .find(cohort_id),
    { people: [] }
  )

  const [selectedAssignment, setSelectedAssignment] = useState(0)

  if (loadingCohort) {
    return <LoadingIndicator />
  }

  const activeEnrollments = cohort.studentEnrollments
    .filter(enrollment => enrollment.showGrade)
    .sort((a, b) => a.person.fullName.localeCompare(b.person.fullName))

  const inactiveEnrollments = cohort.studentEnrollments
    .filter(enrollment => !enrollment.showGrade)
    .sort((a, b) => a.person.fullName.localeCompare(b.person.fullName))

  const sortedHomework = cohort.homeworks.sort((a, b) => a.id - b.id)

  const createAssignments = (homework, stopLoading) => {
    const shouldAssign = window.confirm(`Assign this homework?`)

    if (!shouldAssign) {
      stopLoading()
      return
    }

    const promises = activeEnrollments.map(enrollment => {
      const assignment = new Assignment()
      assignment.personId = enrollment.person.id
      assignment.homeworkId = homework.id

      return assignment.save()
    })

    const finish = () => {
      reloadCohort()
      stopLoading()
    }

    Promise.all(promises)
      .then(finish)
      .catch(finish)
  }

  const countedHomeworks = cohort.homeworks.filter(homework => homework.countsTowardsCompletion).length

  const enrollmentRows = enrollments =>
    enrollments.map(enrollment => {
      const person = enrollment.person

      const completedPercentageForPerson = homeworkCompletedPercentage({
        homeworks: cohort.homeworks,
        assignments: person.assignments,
      })

      const countedHomeworksForPerson = assignedHomeworksForCompletionCount({
        homeworks: cohort.homeworks,
        assignments: person.assignments,
      })

      const completedAssignmentCountForPerson = completedAssignmentsCount({
        assignments: person.assignments,
      })

      const neededHomeworks = countOfHomeworksNeededToExceedPercentage({
        homeworks: cohort.homeworks,
        assignments: person.assignments,
      })

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
            return (
              <HomeworkTableData
                key={homework.id}
                person={person}
                personCanBeAssignedHomework={enrollment.assignHomework}
                assignment={assignment}
                homework={homework}
                reloadCohort={reloadCohort}
                selectedAssignment={selectedAssignment}
                setSelectedAssignment={setSelectedAssignment}
              />
            )
          })}
        </tr>
      )
    })

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
                <LoadingButton onClick={stopLoading => createAssignments(homework, stopLoading)}>
                  <span className="icon is-medium">
                    <i className="fas fa-share" />
                  </span>
                </LoadingButton>
              </th>
            ))}
          </tr>
          <tr>
            <th colSpan={4}>{countedHomeworks} Homeworks Count Towards Completion</th>
            {sortedHomework.map(homework =>
              homework.countsTowardsCompletion ? (
                <th key={homework.id}>
                  <i className="fa fa-check has-text-success" />
                </th>
              ) : (
                <th />
              )
            )}
          </tr>
        </thead>
        <tbody>
          {enrollmentRows(activeEnrollments)}
          {enrollmentRows(inactiveEnrollments)}
        </tbody>
      </table>
    </section>
  )
}

export default Gradebook
