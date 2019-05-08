import React, { useState } from 'react'
import cx from 'classnames'

import { Homework, Cohort, Person, Assignment } from '../models'
import useModelData from '../../hooks/useModelData'
import PersonComponent from '../Person'
import LoadingButton from '../LoadingButton'

const Gradebook = ({ cohort_id, profile }) => {
  const { loadingCohort, data: cohort } = useModelData(() => Cohort.includes('people').find(cohort_id), { people: [] })

  const [selectedAssignment, setSelectedAssignment] = useState(0)
  const { loading: loadingPeople, data: people, reload: reloadPeople } = useModelData(() =>
    Person.selectExtra(['issues'])
      .where({ id: cohort.people.map(person => person.id) })
      .all()
  )

  const { loading: loadingHomework, data: homeworks, reload: reloadHomeworks } = useModelData(() =>
    Homework.includes('assignments')
      .where({ cohort_id: cohort.id })
      .all()
  )

  if (loadingCohort || loadingPeople || loadingHomework) {
    return <></>
  }

  const sortedPeople = people.sort((a, b) => a.fullName.localeCompare(b.fullName))
  const sortedHomework = homeworks.sort((a, b) => a.id - b.id)

  const notAssigned = homework => (
    <td className="tooltip" style={{ color: '#CCC' }} data-tooltip={`${homework.title} - Not Yet Assigned`}>
      <i className="far fa-circle" />
    </td>
  )

  const HomeworkTableData = ({ homework, assignment, person }) => {
    if (!assignment) {
      return notAssigned(homework)
    }

    const issue = person.issues.find(issue => issue.number === assignment.issue)

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
        reloadHomeworks()
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
              {Assignment.scoreInfo.map((info, index) => {
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
      return
    }

    const promises = people.map(person => {
      const assignment = new Assignment()
      assignment.person_id = person.id
      assignment.homework_id = homework.id

      return assignment.save()
    })

    const finish = () => {
      reloadHomeworks()
      reloadPeople()
      stopLoading()
    }

    Promise.all(promises)
      .then(finish)
      .catch(finish)
  }

  return (
    <section className="section">
      <div className="container">
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
                {homeworks.map(homework => {
                  const assignment = homework.assignments.find(assignment => (assignment.person_id = person.id))
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
