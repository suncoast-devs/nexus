import React, { useState } from 'react'
import cx from 'classnames'

import { Cohort, Assignment } from '../models'
import useModelData from '../../hooks/useModelData'
import PersonComponent from '../Person'
import LoadingIndicator from '../utils/LoadingIndicator'
import LoadingButton from '../utils/LoadingButton'

const Gradebook = ({ cohort_id }) => {
  const { loading: loadingCohort, data: cohort, reload: reloadCohort } = useModelData(
    () =>
      Cohort.includes(['people', { homeworks: 'assignments' }])
        .selectExtra({ people: 'issues' })
        .find(cohort_id),
    { people: [] }
  )

  const [selectedAssignment, setSelectedAssignment] = useState(0)

  if (loadingCohort) {
    return <LoadingIndicator />
  }

  console.log(cohort)

  const sortedPeople = cohort.people.sort((a, b) => a.fullName.localeCompare(b.fullName))
  const sortedHomework = cohort.homeworks.sort((a, b) => a.id - b.id)

  const notAssigned = homework => (
    <td className="tooltip" style={{ color: '#CCC' }} data-tooltip={`${homework.title} - Not Yet Assigned`}>
      <i className="far fa-circle" />
    </td>
  )

  const HomeworkTableData = ({ homework, assignment, person }) => {
    if (!assignment) {
      console.log({ 'assignment.issue': assignment.issue, 'person.issues': person.issues, person })
      return notAssigned(homework)
    }

    const issue = person.issues.find(issue => issue.number === assignment.issue)

    console.log({ 'assignment.issue': assignment.issue, 'person.issues': person.issues, issue, person })

    if (!issue) {
      return notAssigned(homework)
    }

    const scoreInfo = assignment.scoreInfo()
    const style = { color: scoreInfo.style.iconColor }
    const tooltip = `${homework.title} - ${scoreInfo.title}`
    const icon = issue.state === 'closed' ? <i className="fas fa-circle" /> : <i className="far fa-circle" />
    const modal = selectedAssignment === assignment.id && (
      <td>
        <AssignmentModal
          person={person}
          homework={homework}
          assignment={assignment}
          issue={issue}
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

  const AssignmentModal = ({ person, issue, assignment, homework, onClose }) => {
    const assignScore = (score, stopLoading) => {
      assignment.score = score

      assignment.save().then(() => {
        setSelectedAssignment(0)
        reloadCohort()
        stopLoading()
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
                      'is-active': index === assignment.score
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

  const createAssignments = (homework, stopLoading) => {
    const shouldAssign = window.confirm(`Assign this homework?`)

    if (!shouldAssign) {
      stopLoading()
      return
    }

    const promises = cohort.people.map(person => {
      const assignment = new Assignment()
      assignment.person_id = person.id
      assignment.homework_id = homework.id

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

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Gradebook for {cohort.name}</h1>
        <table className="table assignment-table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Student</th>
              <th>
                <i className="fab fa-github-alt" />
              </th>
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
          </thead>
          <tbody>
            {sortedPeople.map(person => (
              <tr key={person.id}>
                <td>
                  <PersonComponent person={person} />
                </td>
                <td>
                  <a target="_blank" rel="noopener noreferrer" href={`https://github.com/${person.github}`}>
                    @{person.github}
                  </a>
                </td>
                {cohort.homeworks.map(homework => {
                  const assignment = homework.assignments.find(assignment => (assignment.person_id = person.id))
                  console.log(homework, assignment)
                  return (
                    <HomeworkTableData key={homework.id} person={person} assignment={assignment} homework={homework} />
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Gradebook
