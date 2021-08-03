import React from 'react'
import { Link } from 'react-router-dom'
import { Person } from '../models'

export function PersonButtons({ person }: { person: Person }) {
  return (
    <span className="buttons">
      <Link to={`/people/${person.id}/gradebook`} className="button is-small">
        Gradebook
      </Link>
      <Link to={`/people/${person.id}/attendance`} className="button is-small">
        Attendance
      </Link>
      <Link to={`/people/${person.id}/progress-reports`} className="button is-small">
        Progress Reports
      </Link>
      <Link to={`/impersonate/${person.token}`} className="button is-small">
        Impersonate
      </Link>
    </span>
  )
}
