import React from 'react'
import { Link } from 'react-router-dom'
import { Assignment, Homework } from '../models'

export function HomeworkTableData({ assignment, homework }: { assignment: Assignment; homework: Homework }) {
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
